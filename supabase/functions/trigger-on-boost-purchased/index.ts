// ============================================================
// TRIGGER: On Venue Boost Purchased
// Fires when a boost_campaign is inserted with status="active"
// Validates budget, sets up campaign tracking, updates venue tier
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabaseAdmin, corsHeaders, jsonResponse, errorResponse } from "../_shared/supabase-client.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });

  try {
    const payload = await req.json();
    const campaign = payload.record || payload;

    if (!campaign.venue_id || !campaign.business_id) {
      return errorResponse("Invalid campaign payload");
    }

    // 1. Fetch business account and validate budget
    const { data: biz } = await supabaseAdmin
      .from("business_accounts")
      .select("*")
      .eq("id", campaign.business_id)
      .single();

    if (!biz) return errorResponse("Business account not found");

    const campaignCost = campaign.daily_credit_budget * 30;

    if (biz.credit_balance < campaignCost) {
      // Pause campaign — insufficient budget
      await supabaseAdmin
        .from("boost_campaigns")
        .update({ status: "paused" })
        .eq("id", campaign.id);

      return jsonResponse({
        action: "paused",
        reason: "Insufficient budget",
        required: campaignCost,
        available: biz.credit_balance,
      });
    }

    // 2. Deduct from business budget
    await supabaseAdmin
      .from("business_accounts")
      .update({
        credit_balance: biz.credit_balance - campaignCost,
      })
      .eq("id", biz.id);

    // 3. Update venue subscription tier if boost is significant
    if (campaign.boost_strength >= 8) {
      await supabaseAdmin
        .from("venues")
        .update({ subscription_tier: "boost" })
        .eq("id", campaign.venue_id)
        .in("subscription_tier", ["free", "spotlight"]);
    }

    // 4. Initialize campaign metrics
    await supabaseAdmin
      .from("boost_campaigns")
      .update({
        impressions: 0,
        click_throughs: 0,
        total_credits_spent: 0,
      })
      .eq("id", campaign.id);

    // 5. Log the event
    await supabaseAdmin.from("user_behavior_events").insert({
      user_id: biz.owner_user_id,
      event_type: "boost_purchased",
      venue_id: campaign.venue_id,
      metadata: {
        campaign_id: campaign.id,
        boost_strength: campaign.boost_strength,
        total_budget: campaignCost,
        daily_credit_budget: campaign.daily_credit_budget,
      },
    });

    return jsonResponse({
      action: "activated",
      campaign_id: campaign.id,
      budget_deducted: campaignCost,
      remaining_budget: biz.credit_balance - campaignCost,
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
});
