// ============================================================
// CorporateService — Company onboarding, teams, policies, bookings
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
      // ── Company ──────────────────────────────────────────
      case "create-company": {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_companies")
          .insert({
            name: body.name,
            domain: body.domain,
            logo_url: body.logo_url,
            primary_city: body.city,
            industry: body.industry,
            employee_count: body.employee_count,
            billing_plan: "starter",
            monthly_credit_allowance: 500,
            onboarding_step: 1,
            owner_user_id: user.id,
            policies: body.policies || {
              max_per_person_budget: 75,
              require_approval_above: 500,
              allowed_categories: [],
              blocked_categories: [],
              alcohol_policy: "allowed",
              max_party_size: 25,
              advance_booking_days: 3,
              allowed_days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            },
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "get-company": {
        const { company_id } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_companies")
          .select("*")
          .eq("id", company_id)
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "update-company": {
        const { company_id, ...updates } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_companies")
          .update(updates)
          .eq("id", company_id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "update-policies": {
        const { company_id, policies } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_companies")
          .update({ policies })
          .eq("id", company_id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "advance-onboarding": {
        const { company_id } = await req.json();
        const { data: company } = await supabaseAdmin
          .from("corporate_companies")
          .select("onboarding_step")
          .eq("id", company_id)
          .single();

        if (!company) return errorResponse("Company not found");

        const nextStep = Math.min((company.onboarding_step || 1) + 1, 8);
        const { data, error } = await supabaseAdmin
          .from("corporate_companies")
          .update({ onboarding_step: nextStep })
          .eq("id", company_id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      // ── Teams ────────────────────────────────────────────
      case "create-team": {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_teams")
          .insert({
            company_id: body.company_id,
            name: body.name,
            budget_per_person: body.budget_per_person || 75,
            approval_required: body.approval_required ?? true,
            approver_user_id: body.approver_id || user.id,
            preferred_vibes: body.preferred_vibes || [],
            preferred_cuisines: body.preferred_cuisines || [],
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);

        // Auto-add creator as admin
        await supabaseAdmin.from("corporate_team_members").insert({
          team_id: data.id,
          user_id: user.id,
          role: "admin",
        });

        return jsonResponse(data);
      }

      case "list-teams": {
        const { company_id } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_teams")
          .select("*, corporate_team_members(user_id, role, profiles(full_name, avatar_url))")
          .eq("company_id", company_id);
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "add-team-member": {
        const { team_id, user_id: member_id, role } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_team_members")
          .insert({
            team_id,
            user_id: member_id,
            role: role || "member",
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "remove-team-member": {
        const { team_id, user_id: member_id } = await req.json();
        const { error } = await supabaseAdmin
          .from("corporate_team_members")
          .delete()
          .eq("team_id", team_id)
          .eq("user_id", member_id);
        if (error) return errorResponse(error.message);
        return jsonResponse({ removed: true });
      }

      // ── Corporate Bookings ───────────────────────────────
      case "request-booking": {
        const body = await req.json();

        // Run policy check
        const { data: policyCheck } = await supabaseAdmin.rpc("check_corporate_booking_policy", {
          p_company_id: body.company_id,
          p_team_id: body.team_id,
          p_estimated_cost: body.estimated_cost,
          p_party_size: body.party_size,
          p_scheduled_date: body.scheduled_date,
        });

        const { data, error } = await supabaseAdmin
          .from("corporate_bookings")
          .insert({
            company_id: body.company_id,
            team_id: body.team_id,
            plan_id: body.plan_id,
            venue_id: body.venue_id,
            requested_by: user.id,
            status: policyCheck?.requires_approval ? "pending" : "approved",
            scheduled_date: body.scheduled_date,
            scheduled_time: body.scheduled_time,
            party_size: body.party_size,
            cost_per_person: body.cost_per_person,
            estimated_cost: body.estimated_cost,
            policy_check: policyCheck,
          })
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "approve-booking": {
        const { booking_id } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_bookings")
          .update({
            status: "approved",
            approved_by: user.id,
          })
          .eq("id", booking_id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "reject-booking": {
        const { booking_id, reason } = await req.json();
        const { data, error } = await supabaseAdmin
          .from("corporate_bookings")
          .update({
            status: "rejected",
            approved_by: user.id,
            rejection_reason: reason,
          })
          .eq("id", booking_id)
          .select()
          .single();
        if (error) return errorResponse(error.message);
        return jsonResponse(data);
      }

      case "list-bookings": {
        const { company_id, team_id, status } = await req.json();
        let query = supabaseAdmin
          .from("corporate_bookings")
          .select("*, venues(id, name, neighborhood), profiles!requested_by(full_name)")
          .eq("company_id", company_id)
          .order("created_at", { ascending: false });

        if (team_id) query = query.eq("team_id", team_id);
        if (status) query = query.eq("status", status);

        const { data, error } = await query;
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
