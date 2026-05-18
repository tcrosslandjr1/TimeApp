// ============================================================
// places-photo — Server-side proxy for Google Places photo media
// Usage: GET /places-photo?path=places/.../photos/...&w=600
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/supabase-client.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });

  const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
  if (!apiKey) return new Response("missing key", { status: 500, headers: corsHeaders() });

  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  const width = url.searchParams.get("w") ?? "600";

  if (!path || !/^places\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_-]+$/.test(path)) {
    return new Response("bad path", { status: 400, headers: corsHeaders() });
  }

  const upstream = await fetch(
    `https://places.googleapis.com/v1/${path}/media?key=${apiKey}&maxWidthPx=${width}`,
    { redirect: "follow" }
  );

  if (!upstream.ok) {
    return new Response("upstream error", { status: upstream.status, headers: corsHeaders() });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      ...corsHeaders(),
      "Content-Type": upstream.headers.get("Content-Type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
});
