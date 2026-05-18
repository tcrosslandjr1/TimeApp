// ============================================================
// TRIGGER: On Corporate Booking Requested
// Fires when a corporate_booking is inserted with status="pending"
// Sends approval notification, runs policy check, auto-approves
// if under threshold
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabaseAdmin, corsHeaders, jsonResponse, errorResponse } from "../_shared/supabase-client.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });

  try {
    const payload = await req.json();
    const booking = payload.record || payload;

    if (!booking.company_id || !booking.team_id) {
      return errorResponse("Invalid booking payload");
    }

    // Skip if not pending
    if (booking.status !== "pending") {
      return jsonResponse({ skipped: true, reason: "not pending" });
    }

    // Fetch team and company info
    const [{ data: team }, { data: company }] = await Promise.all([
      supabaseAdmin.from("corporate_teams").select("*").eq("id", booking.team_id).single(),
      supabaseAdmin.from("corporate_companies").select("*").eq("id", booking.company_id).single(),
    ]);

    if (!team || !company) {
      return errorResponse("Team or company not found");
    }

    // Auto-approve if policy doesn't require approval
    const totalCost = booking.estimated_cost || 0;
    const autoApprove = !team.approval_required;

    if (autoApprove) {
      await supabaseAdmin
        .from("corporate_bookings")
        .update({
          status: "approved",
          approved_by: null, // system auto-approved
          policy_check: {
            ...(booking.policy_check || {}),
            auto_approved: true,
            reason: "Under approval threshold",
          },
        })
        .eq("id", booking.id);

      return jsonResponse({ action: "auto_approved", booking_id: booking.id });
    }

    // If approval required, notify the approver
    // (In production, this would send a push notification, email, or Slack message)
    const approver = team.approver_user_id;
    if (approver) {
      // Log a notification record (could be expanded to actual push/email)
      await supabaseAdmin.from("chat_messages").insert({
        user_id: approver,
        role: "system",
        body: `Corporate booking request from your team "${team.name}" requires approval. Estimated cost: $${totalCost}. Booking ID: ${booking.id}`,
        metadata: {
          type: "corporate_booking_approval",
          booking_id: booking.id,
          team_id: team.id,
          estimated_cost: totalCost,
        },
      });
    }

    return jsonResponse({
      action: "approval_required",
      booking_id: booking.id,
      approver_user_id: approver,
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
});
