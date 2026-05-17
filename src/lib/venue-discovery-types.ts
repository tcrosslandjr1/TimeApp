/**
 * Confetti — Venue Discovery Card data model
 *
 * This is the expanded data model for the enhanced venue cards.
 * Maps to both the Supabase `venues` table and any future
 * sponsored/ad inventory system.
 */

/** Social reel embedded in the community drawer */
export interface SocialReel {
  platform: "tiktok" | "instagram";
  thumbnailUrl: string;
  url: string;
  caption?: string;
  viewCount?: string;       // formatted, e.g. "24K"
  /** Promoted reels get an amber ring + "Promoted" badge */
  isPromoted?: boolean;
}

/** Sponsored CTA strip shown below the social row */
export interface SponsoredCta {
  headline: string;         // e.g. "New summer aperitivo menu — reserve tonight"
  label: string;            // button text, e.g. "Book now"
  url: string;              // deep-link or reservation URL
}

/** Full venue card payload */
export interface VenueCard {
  id: string;
  name: string;
  neighborhood: string;
  address?: string;
  description?: string;

  /* --- Images --- */
  heroImageUrl: string;
  galleryImageUrls?: string[];

  /* --- Ratings & price --- */
  rating?: number;          // 1.0 – 5.0
  priceBand?: string;       // "$" | "$$" | "$$$" | "$$$$"

  /* --- Categorization --- */
  tags: string[];           // ["Cocktails", "Live music", "Date night"]
  category?: string;        // "Dining" | "Nightlife" | "Rooftops" | etc.
  aiPick?: boolean;         // flagged by recommendation agent

  /* --- Social links --- */
  websiteUrl?: string;
  googlePlaceId?: string;
  googleMapsUrl?: string;
  tiktokUrl?: string;       // venue's own TikTok profile
  instagramUrl?: string;    // venue's own Instagram profile
  youtubeUrl?: string;
  facebookUrl?: string;

  /* --- Community content --- */
  communityReels?: SocialReel[];

  /* --- Sponsorship / ads --- */
  isSponsored?: boolean;
  sponsoredCta?: SponsoredCta;

  /* --- Map positioning (% of DC map container) --- */
  coords?: { x: number; y: number };
}

/**
 * Maps a Supabase `venues` row + sample data into VenueCard format.
 * Use this as the adapter between your DB schema and the card component.
 */
export function toVenueCard(row: {
  id: string;
  name: string;
  neighborhood?: string | null;
  address?: string | null;
  photo?: string | null;
  rating?: number | null;
  price?: string;
  tags?: string[];
  category?: string;
  aiPick?: boolean;
  gradient?: string;
  description?: string;
  website?: string | null;
  coords?: { x: number; y: number };
}): VenueCard {
  return {
    id: row.id,
    name: row.name,
    neighborhood: row.neighborhood ?? "DC",
    address: row.address ?? undefined,
    description: row.description,
    heroImageUrl: row.photo ?? `https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80`,
    rating: row.rating ?? undefined,
    priceBand: row.price,
    tags: row.tags ?? [],
    category: row.category,
    aiPick: row.aiPick,
    websiteUrl: row.website ?? undefined,
    coords: row.coords,
    communityReels: [],       // populated later from social API
    isSponsored: false,       // populated from ad inventory
  };
}
