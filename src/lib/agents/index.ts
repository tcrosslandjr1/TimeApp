/**
 * Confetti Agent System — Barrel Export
 * Unified entry point for all agent capabilities.
 */

// ─── AI Provider Engine ────────────────────────────────────────
export { chat, getAIConfig, getAvailableProviders } from "./ai-provider";
export type { AIMessage, AIResponse, AIProviderConfig } from "./ai-provider";

// ─── Venue Discovery Agent ────────────────────────────────────
export {
  discoverVenues,
  discoverVenuesMock,
  discoverTripCorridorVenues,
  getUserLocation,
  geocodeCity,
} from "./venue-discovery";
export type {
  DiscoveredVenue,
  GeoLocation,
  VenueSearchParams,
  TripCorridorParams,
} from "./venue-discovery";

// ─── User Intelligence Agent ──────────────────────────────────
export {
  trackBehavior,
  trackBehaviorLocal,
  getTasteProfile,
  getTasteProfileLocal,
  getUserContext,
  getUserContextLocal,
  recomputeTasteProfile,
  applyOnboardingPreferences,
  generateProfilePrompt,
} from "./user-intelligence";
export type {
  BehaviorEvent,
  BehaviorEventType,
  TasteProfile,
  UserContext,
} from "./user-intelligence";

// ─── Chat Agent ───────────────────────────────────────────────
export {
  sendMessage,
  sendMessageLocal,
  getChatStatus,
} from "./chat-agent";
export type {
  ChatIntent,
  ChatSession,
  ChatMessage,
  ChatContext,
  ChatResponse,
} from "./chat-agent";

// ─── Trip Planner Agent ───────────────────────────────────────
export {
  planTrip,
  planTripMock,
  getUserTrips,
} from "./trip-planner";
export type {
  TripRequest,
  TripStop,
  TripPlan,
  StopType,
} from "./trip-planner";

// ─── Group Collaboration Agent ───────────────────────────────
export {
  createGroup,
  createGroupLocal,
  inviteMember,
  joinGroupByCode,
  submitCategories,
  getGroupCategories,
  getAvailableCategories,
  mergeGroupProfiles,
  generateGroupPlan,
  generateGroupPlanLocal,
  voteOnStop,
  refinePlan,
  getGroup,
  getUserGroups,
  getGroupPlans,
  getPlan,
  approvePlan,
  seedDemoGroup,
} from "./group-collab";
export type {
  GroupType,
  MemberRole,
  MemberStatus,
  PlanStatus,
  VoteValue,
  Group,
  GroupSettings,
  GroupMember,
  GroupPlan,
  GroupPlanStop,
  StopVote,
  CategoryPick,
} from "./group-collab";

// ─── Boost Credits Agent ────────────────────────────────────
export {
  // Constants
  BUSINESS_TIERS,
  USER_TIER_CONFIG,
  // Business
  registerBusiness,
  updateBusinessTier,
  purchaseCredits,
  getBusiness,
  getBusinessesByCity,
  // Campaigns & Coupons
  createCampaign,
  createCoupon,
  getVenueCampaigns,
  getCampaignCoupon,
  getBusinessCampaigns,
  // Boost engine
  applyBoosts,
  recordClickThrough,
  // Check-in & Redemption
  checkIn,
  redeemCoupon,
  // User subscription
  getUserSubscription,
  upgradeToBlack,
  canCreateConfetti,
  consumeConfetti,
  useOutingCredit,
  bookPrimeReservation,
  resetMonthlyBlackPerks,
  getUserCoupons,
  getUserCheckins,
  // Analytics
  getCampaignAnalytics,
  getBusinessAnalytics,
  // Demo
  seedBoostDemo,
} from "./boost-credits";
export type {
  BusinessTier,
  UserTier,
  CampaignStatus,
  CheckInMethod,
  CouponType,
  RedemptionStatus,
  BusinessAccount,
  BusinessTierConfig,
  BoostCampaign,
  Coupon,
  UserCheckin,
  CouponRedemption,
  UserSubscription,
  BoostAnalytics,
  BoostedVenue,
} from "./boost-credits";

// ─── Wallet Pass Agent ─────────────────────────────────────
export {
  // Confetti Fund
  depositFund,
  getFund,
  disburseFund,
  getFundDashboard,
  // Wallet Passes
  createWalletPasses,
  getUserPasses,
  getAllPasses,
  getPassStats,
  updatePassBalance,
  redeemViaBarcode,
  revokePasses,
  // Demo
  seedWalletDemo,
} from "./wallet-pass";
export type {
  PassPlatform,
  PassStatus,
  FundTransactionType,
  WalletPass,
  ConfettiFund,
  FundTransaction,
  FundDashboard,
} from "./wallet-pass";

// ─── Community Agent ─────────────────────────────────────────
export {
  sharePlan,
  remixPlan,
  savePlanToCollection,
  submitReview,
  autoTrackVisit,
  getCommunityFeed,
  getSharedPlan,
  getPlanReviews,
  getUserSharedPlans,
  getUserReputation,
  getReputationTierInfo,
  getAllTiers,
  getAIInsights,
  getCommunityStats,
  seedCommunityDemo,
} from "./community";
export type {
  SharedPlan,
  SharedPlanStop,
  ExperienceReview,
  StopRating,
  UserReputation,
  CommunityBadge,
  CommunityFeedQuery,
  AIInsight,
  PlanOrigin,
  ReviewType,
  ReputationTier,
} from "./community";
