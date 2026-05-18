// ============================================================
// TRIGGER: On User Requests Plan
// Fired when a new chat message with role="user" is inserted
// Kicks off the AI pipeline and stores the result
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabaseAdmin, corsHeaders, jsonResponse, errorResponse } from "../_shared/supabase-client.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });

  try {
    const payload = await req.json();

    // Validate webhook payload
    const record = payload.record || payload;
    if (!record.user_id || !record.body) {
      return errorResponse("Invalid payload");
    }

    // Only trigger on user messages (not assistant replies)
    if (record.role !== "user") {
      return jsonResponse({ skipped: true, reason: "not a user message" });
    }

    // Call the AI pipeline internally
    const pipelineUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/ai-pipeline`;
    const response = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        "x-user-id": record.user_id, // Pass user context
      },
      body: JSON.stringify({
        query: record.body,
        user_id: record.user_id,
        chat_message_id: record.id,
      }),
    });

    const result = await response.json();

    // Store assistant response as chat message
    if (result.plan?.narrative) {
      await supabaseAdmin.from("chat_messages").insert({
        user_id: record.user_id,
        role: "assistant",
        body: result.plan.narrative,
        metadata: {
          plan: result.plan,
          boarding_pass: result.plan.boarding_pass,
          run_id: result.meta?.run_id,
        },
      });
    }

    return jsonResponse({ triggered: true, run_id: result.meta?.run_id });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
});
