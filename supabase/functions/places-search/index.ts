// ============================================================
// places-search — Server-side proxy for Google Places API v1
// Keeps GOOGLE_PLACES_API_KEY off the client bundle.
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders, jsonResponse, errorResponse } from "../_shared/supabase-client.ts";

interface SearchBody {
  textQuery: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  maxResultCount?: number;
  openNow?: boolean;
}

const FIELD_MASK = [
  "places.id", "places.displayName", "places.formattedAddress",
  "places.location", "places.rating", "places.userRatingCount",
  "places.priceLevel", "places.types", "places.primaryType",
  "places.websiteUri", "places.nationalPhoneNumber",
  "places.regularOpeningHours", "places.photos",
].join(",");

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });

  const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
  if (!apiKey) return errorResponse("GOOGLE_PLACES_API_KEY not configured", 500);

  let body: SearchBody;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  if (!body.textQuery || typeof body.lat !== "number" || typeof body.lng !== "number") {
    return errorResponse("textQuery, lat, lng required");
  }

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery: body.textQuery,
      locationBias: {
        circle: {
          center: { latitude: body.lat, longitude: body.lng },
          radius: body.radiusMeters,
        },
      },
      maxResultCount: body.maxResultCount ?? 20,
      ...(body.openNow ? { openNow: true } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return errorResponse(`Google Places ${res.status}: ${text.slice(0, 500)}`, res.status);
  }

  const data = await res.json();

  // Rewrite photo references so the client doesn't need the key.
  // photo.name looks like: places/ChIJ.../photos/AeJbbz...
  // We expose a proxy URL that the places-photo function will sign.
  const places = (data.places ?? []).map((p: Record<string, unknown>) => {
    const photos = p.photos as Array<{ name: string }> | undefined;
    return {
      ...p,
      photoProxyPaths: photos?.slice(0, 4).map((ph) => ph.name) ?? [],
    };
  });

  return jsonResponse({ places });
});
