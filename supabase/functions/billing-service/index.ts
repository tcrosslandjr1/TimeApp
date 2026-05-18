// ============================================================
// BillingService — Boost campaigns, coupons, business accounts,
//                  Confetti Fund, subscription billing
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabaseAdmin, supabaseForUser, corsHeaders, jsonResponse, errorResponse } from "../_shared/supabase-client.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });

  const url = new URL(req.url);
  const action = url.pathname.split("/").pop();
  const authHeader = req.headers.get("Authorization")!;
  const sb = supabaseForUser(authHeader);
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return errorResponse("Unauthorized", 401);

  try {
    switch (action) {
      // ── Business Account ─────────────────────────────────
      case "get-business": {
        const { data, error } = await sb
          .from("business_accounts")
          .select("*")
          .eq("owner_user_id", user.id)
          .maybeSingle();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "create-business": {
        const body = await req.json();
        const { data, error } = await sb
          .from("business_accounts")
          .insert({
            owner_user_id: user.id,
            business_name: body.business_name,
            contact_name: body.contact_name || "",
            contact_email: body.contact_email || user.email || "",
            tier: body.tier || "spotlight",
            credit_balance: body.credit_balance || 0,
            venue_ids: body.venue_ids || [],
            city: body.city || "",
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Boost Campaigns ──────────────────────────────────
      case "create-boost": {
        const body = await req.json();

        // Verify business ownership
        const { data: biz } = await sb
          .from("business_accounts")
          .select("id, credit_balance")
          .eq("owner_user_id", user.id)
          .single();

        if (!biz) return errorResponse("No business account found", 403);
        if (biz.credit_balance < body.daily_credit_budget * 30) {
          return errorResponse("Insufficient credit balance");
        }

        const { data, error } = await supabaseAdmin
          .from("boost_campaigns")
          .insert({
            venue_id: body.venue_id,
            business_id: biz.id,
            name: body.name || "Boost Campaign",
            boost_strength: body.boost_strength || 5,
            daily_credit_budget: body.daily_credit_budget,
            total_credits_spent: 0,
            start_date: body.start_date,
            end_date: body.end_date,
            status: "active",
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "list-boosts": {
        const { venue_id } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("boost_campaigns")
          .select("*")
          .eq("venue_id", venue_id)
          .order("created_at", { ascending: false });
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "pause-boost": {
        const { campaign_id } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("boost_campaigns")
          .update({ status: "paused" })
          .eq("id", campaign_id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Coupons ──────────────────────────────────────────
      case "create-coupon": {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
          .from("coupons")
          .insert({
            venue_id: body.venue_id,
            title: body.title,
            type: body.type, // "percentage" | "fixed" | "bogo" | "freebie"
            value: body.value,
            min_spend: body.min_spend || 0,
            max_redemptions: body.max_redemptions,
            current_redemptions: 0,
            terms: body.terms,
            expires_at: body.expires_at,
            is_active: true,
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "redeem-coupon": {
        const { coupon_id } = await req.json();

        // Check coupon validity
        const { data: coupon } = await supabaseAdmin
          .from("coupons")
          .select("*")
          .eq("id", coupon_id)
          .eq("is_active", true)
          .single();

        if (!coupon) return errorResponse("Coupon not found or inactive");
        if (coupon.max_redemptions && coupon.current_redemptions >= coupon.max_redemptions) {
          return errorResponse("Coupon fully redeemed");
        }
        if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
          return errorResponse("Coupon expired");
        }

        // Check if user already redeemed
        const { data: existing } = await sb
          .from("coupon_redemptions")
          .select("id")
          .eq("coupon_id", coupon_id)
          .eq("user_id", user.id)
          .maybeSingle();

        if (existing) return errorResponse("Already redeemed");

        // Create redemption
        const { data: redemption, error } = await sb
          .from("coupon_redemptions")
          .insert({
            coupon_id,
            user_id: user.id,
            venue_id: coupon.venue_id,
            status: "claimed",
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);

        // Increment counter
        await supabaseAdmin
          .from("coupons")
          .update({ current_redemptions: coupon.current_redemptions + 1 })
          .eq("id", coupon_id);

        return jsonResponse(redemption);
      }

      // ── Confetti Fund ────────────────────────────────────
      case "fund-balance": {
        const { data, error } = await supabaseAdmin
          .from("confetti_fund")
          .select("*")
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "disburse-credit": {
        const body = await req.json();
        const { data: fund } = await supabaseAdmin
          .from("confetti_fund")
          .select("*")
          .single();

        if (!fund || fund.balance < body.amount) {
          return errorResponse("Insufficient fund balance");
        }

        const newBalance = fund.balance - body.amount;

        // Create transaction
        const { data: txn, error } = await supabaseAdmin
          .from("fund_transactions")
          .insert({
            fund_id: fund.id,
            type: "disbursement",
            amount: body.amount,
            user_id: body.recipient_id,
            description: body.description || `Disbursement: ${body.reference_type || "manual"}`,
            balance_after: newBalance,
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);

        // Update fund balance
        await supabaseAdmin
          .from("confetti_fund")
          .update({ balance: newBalance })
          .eq("id", fund.id);

        return jsonResponse(txn);
      }

      default:
        return errorResponse("Unknown action", 404);
    }
  } catch (err) {
    return errorResponse(err.message, 500);
  }
});
