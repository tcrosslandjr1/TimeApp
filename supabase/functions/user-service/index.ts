// ============================================================
// UserService — Profile CRUD, taste profiles, preferences, subscriptions
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
      // ── Profile ──────────────────────────────────────────
      case "get-profile": {
        const { data, error } = await sb
          .from("profiles")
          .select("*, user_preferences(*)")
          .eq("id", user.id)
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "update-profile": {
        const updates = await req.json();
        const allowed = ["full_name", "avatar_url", "username"];
        const filtered: Record<string, any> = {};
        for (const key of allowed) {
          if (key in updates) filtered[key] = updates[key];
        }
        filtered.updated_at = new Date().toISOString();

        const { data, error } = await sb
          .from("profiles")
          .update(filtered)
          .eq("id", user.id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Taste Profile ────────────────────────────────────
      case "get-taste-profile": {
        const { data, error } = await sb
          .from("taste_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (error && error.code !== "PGRST116") return errorResponse(error.message);
        return jsonResponse(data || { cuisine_scores: {}, vibe_scores: {}, neighborhood_scores: {}, price_preference: {} });
      }

      case "update-taste-profile": {
        const body = await req.json();
        const { data, error } = await sb
          .from("taste_profiles")
          .upsert({
            user_id: user.id,
            cuisine_scores: body.cuisine_scores,
            vibe_scores: body.vibe_scores,
            neighborhood_scores: body.neighborhood_scores,
            price_affinity: body.price_affinity,
            updated_at: new Date().toISOString(),
          }, { onConflict: "user_id" })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Preferences ──────────────────────────────────────
      case "update-preferences": {
        const prefs = await req.json();
        const { data, error } = await sb
          .from("user_preferences")
          .upsert({ user_id: user.id, ...prefs }, { onConflict: "user_id" })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Subscription ─────────────────────────────────────
      case "get-subscription": {
        const { data, error } = await sb
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        if (error) return errorResponse(error.message);
        return jsonResponse(data || { tier: "free", confetti_balance: 0 });
      }

      case "upgrade-subscription": {
        const { tier } = await req.json();
        if (!["black_monthly", "black_annual"].includes(tier)) {
          return errorResponse("Invalid tier");
        }
        const { data, error } = await sb
          .from("user_subscriptions")
          .upsert({
            user_id: user.id,
            tier,
            plan_limit: tier === "black_annual" ? 999 : 20,
          }, { onConflict: "user_id" })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Behavior Events ──────────────────────────────────
      case "log-event": {
        const event = await req.json();
        const { data, error } = await sb
          .from("user_behavior_events")
          .insert({
            user_id: user.id,
            event_type: event.event_type,
            venue_id: event.venue_id || null,
            metadata: event.metadata || {},
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Social Links ─────────────────────────────────────
      case "get-social-links": {
        const { data, error } = await sb
          .from("profile_social_links")
          .select("*")
          .eq("user_id", user.id);
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      default:
        return errorResponse("Unknown action", 404);
    }
  } catch (err) {
    return errorResponse(err.message, 500);
  }
});
