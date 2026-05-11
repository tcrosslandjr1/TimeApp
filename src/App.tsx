import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Battery,
  BatteryCharging,
  Bell,
  CalendarCheck,
  Car,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Compass,
  Copy,
  Eye,
  Flame,
  GlassWater,
  Grip,
  Heart,
  Home as HomeIcon,
  IceCream,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Moon,
  Mountain,
  Navigation,
  Palette,
  PartyPopper,
  Plane,
  PlaneTakeoff,
  Plus,
  RefreshCw,
  Route,
  Search,
  Send,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sofa,
  Sparkles,
  Star,
  Sunrise,
  TreePine,
  TrendingUp,
  Trophy,
  UserRound,
  Users,
  Utensils,
  WandSparkles,
  Wine,
  X,
  Zap,
  Radio,
  CircleCheck,
  Timer,
  Phone,
  ChevronUp,
  Wallet,
  Smartphone,
  Download,
  ExternalLink
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, Route as RouterRoute, Routes, useLocation, useNavigate } from "react-router-dom";

const venues = [
  {
    id: "luma",
    name: "Luma Rooftop",
    type: "Rooftop Izakaya",
    image:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=900&q=80",
    match: 94,
    price: "$$$",
    area: "14th Street",
    tags: ["Skyline", "Date Night", "Craft Sake", "DJ after 9"],
    rating: 4.8,
    category: "nightlife"
  },
  {
    id: "atelier",
    name: "Atelier Sol",
    type: "Modern Coastal",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    match: 91,
    price: "$$$$",
    area: "Georgetown",
    tags: ["Chef Table", "Warm", "Anniversary", "Wine"],
    rating: 4.9,
    category: "dining"
  },
  {
    id: "neon",
    name: "Neon Library",
    type: "Listening Lounge",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80",
    match: 88,
    price: "$$",
    area: "Shaw",
    tags: ["Vinyl", "Cocktails", "Crew Night", "Late"],
    rating: 4.7,
    category: "nightlife"
  },
  {
    id: "smash-stack",
    name: "Smash Stack",
    type: "Viral Smash Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    match: 96,
    price: "$$",
    area: "Union Market",
    tags: ["TikTok Viral", "Ugly Delicious", "Loaded", "Late Night"],
    rating: 4.9,
    category: "trending-food"
  },
  {
    id: "wonderland-bar",
    name: "The Looking Glass",
    type: "Immersive Speakeasy",
    image:
      "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=900&q=80",
    match: 93,
    price: "$$$",
    area: "Dupont Circle",
    tags: ["Hidden Entry", "Cocktail Puzzles", "Speakeasy", "Instagrammable"],
    rating: 4.8,
    category: "hidden-gems"
  },
  {
    id: "dino-dig",
    name: "Discovery Zone",
    type: "Interactive Kids Museum",
    image:
      "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=900&q=80",
    match: 97,
    price: "$$",
    area: "National Mall",
    tags: ["Kids", "Gem Digging", "Hands-On", "All Ages"],
    rating: 4.9,
    category: "kids"
  },
  {
    id: "sunset-trail",
    name: "Golden Hour Trail",
    type: "Scenic Sunset Hike",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    match: 91,
    price: "Free",
    area: "Great Falls",
    tags: ["Sunset", "Nature", "TikTok Trail", "Photo Op"],
    rating: 4.7,
    category: "outdoor"
  },
  {
    id: "crispy-rice",
    name: "Kome Crispy Bar",
    type: "TikTok-Famous Crispy Rice",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
    match: 95,
    price: "$$",
    area: "H Street",
    tags: ["Crispy Rice", "Viral", "Date Spot", "Shareable"],
    rating: 4.8,
    category: "trending-food"
  },
  {
    id: "paint-pour",
    name: "Pour & Paint Lounge",
    type: "Creative Date Night",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
    match: 89,
    price: "$$",
    area: "Adams Morgan",
    tags: ["Paint & Sip", "Couples", "Creative", "BYOB"],
    rating: 4.6,
    category: "date-night"
  },
  {
    id: "splash-park",
    name: "Splash Adventure Park",
    type: "Family Water Play",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80",
    match: 98,
    price: "$",
    area: "Yards Park",
    tags: ["Toddler Safe", "Free Play", "Picnic Area", "Summer Hit"],
    rating: 4.8,
    category: "kids"
  },
  {
    id: "birria-bus",
    name: "Birria Boss Truck",
    type: "Viral Birria Tacos",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    match: 94,
    price: "$",
    area: "Columbia Heights",
    tags: ["Birria Everything", "Street Food", "TikTok Famous", "Cash Only"],
    rating: 4.9,
    category: "trending-food"
  },
  {
    id: "blanket-fort",
    name: "Fort Nite Cinema",
    type: "Blanket Fort Movie Night",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    match: 90,
    price: "$$",
    area: "Petworth",
    tags: ["Cozy", "Couples", "Snack Bar", "Retro Films"],
    rating: 4.7,
    category: "date-night"
  }
];

const trendingCategories = [
  { id: "viral-eats", label: "Viral Eats", emoji: "🔥", icon: Flame, color: "rose", description: "TikTok-famous food spots near you" },
  { id: "hidden-gems", label: "Hidden Gems", emoji: "🗝️", icon: Eye, color: "purple", description: "Secret speakeasies & underground spots" },
  { id: "kids-day", label: "Kids Day Out", emoji: "🎨", icon: Baby, color: "orange", description: "Family adventures the whole crew loves" },
  { id: "outdoor-vibes", label: "Outdoor Vibes", emoji: "🌅", icon: Mountain, color: "teal", description: "Sunset hikes, picnics & nature walks" },
  { id: "date-inspo", label: "Date Inspo", emoji: "💕", icon: Heart, color: "rose", description: "Creative dates beyond dinner & a movie" },
  { id: "late-night", label: "Late Night", emoji: "🌙", icon: Moon, color: "blue", description: "Where the night owls go after 10 PM" }
];

const moods = [
  ["Date Night", "rose", "Planning a velvet-booth date night..."],
  ["Rooftop", "blue", "Craving rooftop vibes..."],
  ["Crew", "purple", "Need a spot for the crew..."],
  ["Family", "orange", "Keeping it warm and easy..."],
  ["Hidden Gems", "teal", "Find me a secret speakeasy..."],
  ["Viral Eats", "rose", "What's blowing up on TikTok..."],
  ["Kids Fun", "orange", "Something the kids will love..."],
  ["Outdoor", "teal", "Sunset hike or picnic vibes..."]
];

const wizardCuisines = ["Japanese", "Modern American", "Thai", "Mediterranean", "Mexican", "Coastal", "Birria & Street Food", "Smash Burgers", "Crispy Rice Bars", "Vegan", "Korean Fusion", "Steakhouse"];
const wizardActivities = ["Rooftops", "Live music", "Chef table", "Hidden speakeasies", "Immersive art", "Family adventures", "Sunset hikes", "Paint & sip", "Food truck crawls", "Gem digging", "Splash parks", "Blanket fort cinema"];

const hoodCodes: Record<string, string> = {
  "Georgetown": "GTN",
  "Capitol Hill": "CPH",
  "14th Street": "14S",
  "Shaw": "SHW",
  "Union Market": "UMK",
  "Dupont Circle": "DPC",
  "National Mall": "NML",
  "Great Falls": "GRF",
  "H Street": "HST",
  "Adams Morgan": "ADM",
  "Yards Park": "YPK",
  "Columbia Heights": "CLH",
  "Petworth": "PTW"
};

const occasions = [
  { id: "date-night", label: "Date Night", emoji: "🌹", color: "rose" },
  { id: "mothers-day", label: "Mother's Day", emoji: "💐", color: "pink" },
  { id: "birthday", label: "Birthday", emoji: "🎂", color: "gold" },
  { id: "anniversary", label: "Anniversary", emoji: "💍", color: "purple" },
  { id: "crew-night", label: "Crew Night", emoji: "🔥", color: "orange" },
  { id: "family-day", label: "Family Day", emoji: "👨‍👩‍👧‍👦", color: "teal" },
  { id: "solo-adventure", label: "Solo Adventure", emoji: "🧭", color: "blue" },
  { id: "celebration", label: "Celebration", emoji: "🎉", color: "gold" },
  { id: "just-because", label: "Just Because", emoji: "✨", color: "purple" }
];

const seatingOptions = [
  { id: "patio", label: "Patio", emoji: "🌿" },
  { id: "booth", label: "Booth", emoji: "🛋️" },
  { id: "bar", label: "Bar Seating", emoji: "🍸" },
  { id: "window", label: "Window", emoji: "🪟" },
  { id: "rooftop", label: "Rooftop", emoji: "🌇" },
  { id: "private", label: "Private Room", emoji: "🚪" },
  { id: "no-pref", label: "No Preference", emoji: "👍" }
];

const preOrderMenus: Record<string, Array<{ item: string; price: number; tag: string }>> = {
  "Atelier Sol": [
    { item: "Yuzu Tuna Crudo", price: 22, tag: "🔥 spicy" },
    { item: "Miso Glazed Short Rib", price: 36, tag: "chef pick" },
    { item: "Coastal Wine Flight", price: 28, tag: "🍷 pairing" },
    { item: "Sparkling Rosé", price: 16, tag: "celebration" },
    { item: "Matcha Pavlova", price: 14, tag: "🌱 light" }
  ],
  "Luma Rooftop": [
    { item: "Craft Sake Flight", price: 24, tag: "🍶 signature" },
    { item: "Skyline Spritz", price: 18, tag: "🌅 sunset" },
    { item: "Wagyu Sliders", price: 28, tag: "🔥 popular" },
    { item: "Edamame Truffle", price: 14, tag: "🌱 starter" },
    { item: "Yuzu Cheesecake", price: 16, tag: "sweet" }
  ],
  "Neon Library": [
    { item: "Vinyl Old Fashioned", price: 19, tag: "🥃 classic" },
    { item: "Neon Espresso Martini", price: 20, tag: "☕ signature" },
    { item: "Small Plates Board", price: 24, tag: "sharing" },
    { item: "Midnight Negroni", price: 18, tag: "🌙 nightcap" }
  ]
};

const loopStops = [
  {
    time: "6:30 PM",
    name: "Atelier Sol",
    detail: "Coastal tasting menu",
    area: "Georgetown",
    driveTravel: "12 min drive",
    rideTravel: "16 min Uber",
    parking: "Canal Garage · 4 min walk · $18",
    pickup: "Front awning on M Street",
    dress: "Elevated casual",
    match: 91,
    evCharger: "ChargePoint · Canal Garage L2 · 2 spots",
    role: "departure"
  },
  {
    time: "8:45 PM",
    name: "Luma Rooftop",
    detail: "Skyline cocktails",
    area: "14th Street",
    driveTravel: "8 min drive",
    rideTravel: "9 min Uber",
    parking: "14th & U garage · 3 min walk · $12",
    pickup: "South curb near valet stand",
    dress: "Statement jacket",
    match: 94,
    evCharger: null,
    role: "layover"
  },
  {
    time: "10:30 PM",
    name: "Neon Library",
    detail: "Vinyl lounge nightcap",
    area: "Shaw",
    driveTravel: "Walkable",
    rideTravel: "Walkable",
    parking: "Keep car parked, 6 min walk",
    pickup: "Corner of 9th and T",
    dress: "Nightlife polish",
    match: 88,
    evCharger: null,
    role: "destination"
  }
];

const chatMessages = [
  { from: "user", text: "What's trending near me? Kids are with us tonight." },
  {
    from: "ai",
    text:
      "Fam-friendly vibes! Start with birria tacos at Birria Boss (TikTok-viral), then hit Discovery Zone for gem digging, and end at Splash Adventure Park before sunset. Total: ~$85 for 4."
  }
];

const tabs = [
  { path: "/home", label: "Home", icon: HomeIcon },
  { path: "/quick-idea", label: "Idea", icon: Sparkles },
  { path: "/create-loop", label: "Loop", icon: Route },
  { path: "/passport", label: "Passport", icon: Trophy },
  { path: "/chat", label: "Chat", icon: MessageCircle }
];

const pageVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -30, scale: 0.98 }
};

function App() {
  const location = useLocation();
  const [installReady, setInstallReady] = useState(false);

  useEffect(() => {
    const visits = Number(localStorage.getItem("concierge-visits") ?? "0") + 1;
    localStorage.setItem("concierge-visits", String(visits));
    setInstallReady(visits > 1 && !matchMedia("(display-mode: standalone)").matches);
  }, []);

  const showNav = !["/", "/onboarding", "/confirmation"].includes(location.pathname);

  return (
    <main className="app-canvas">
      <div className="phone-shell">
        <Aurora />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <RouterRoute path="/" element={<Navigate to="/onboarding" replace />} />
            <RouterRoute path="/onboarding" element={<Onboarding />} />
            <RouterRoute path="/home" element={<Home />} />
            <RouterRoute path="/quick-idea" element={<QuickIdea />} />
            <RouterRoute path="/create-loop" element={<CreateLoop />} />
            <RouterRoute path="/boarding-pass" element={<BoardingPass />} />
            <RouterRoute path="/venue/:id" element={<VenueDetail />} />
            <RouterRoute path="/active-loop" element={<ActiveLoop />} />
            <RouterRoute path="/confirmation" element={<Confirmation />} />
            <RouterRoute path="/passport" element={<Passport />} />
            <RouterRoute path="/chat" element={<Chat />} />
            <RouterRoute path="/profile" element={<Profile />} />
            <RouterRoute path="/bookings" element={<Bookings />} />
            <RouterRoute path="/favorites" element={<Favorites />} />
            <RouterRoute path="/notifications" element={<Notifications />} />
            <RouterRoute path="/discover" element={<Discover />} />
          </Routes>
        </AnimatePresence>
        {installReady ? <InstallPrompt onClose={() => setInstallReady(false)} /> : null}
        {showNav ? <TabBar /> : null}
      </div>
    </main>
  );
}

function Page({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className={`screen ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ScrollReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, type: "spring", stiffness: 190, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora-band band-one" />
      <span className="aurora-band band-two" />
      <span className="aurora-band band-three" />
    </div>
  );
}

function Header({ title, eyebrow, actions }: { title: string; eyebrow?: string; actions?: ReactNode }) {
  return (
    <header className="top-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
      </div>
      <div className="header-actions">{actions}</div>
    </header>
  );
}

function IconButton({ children, label, to }: { children: ReactNode; label: string; to?: string }) {
  const content = (
    <motion.button whileTap={{ scale: 0.9 }} className="icon-btn" aria-label={label} title={label}>
      {children}
    </motion.button>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

function GradientButton({ children, to, wide = false }: { children: ReactNode; to?: string; wide?: boolean }) {
  const button = (
    <motion.button whileTap={{ scale: 0.95 }} className={`gradient-btn ${wide ? "wide" : ""}`}>
      <span>{children}</span>
    </motion.button>
  );
  return to ? <Link to={to}>{button}</Link> : button;
}

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [budget, setBudget] = useState(180);
  const [selected, setSelected] = useState(new Set(["Japanese", "Mediterranean", "Rooftops", "Live music"]));
  const progress = step < 0 ? 0 : ((step + 1) / 3) * 100;
  const choices = step === 0 ? wizardCuisines : wizardActivities;

  const toggle = (value: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  if (step === -1) {
    return (
      <Page className="splash">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="splash-lockup"
        >
          <div className="app-mark">
            <Route />
          </div>
          <h1>Loop</h1>
          <p>Curated city experiences. Every outing is an adventure.</p>
        </motion.div>
        <div className="splash-actions">
          <GradientButton wide>
            <span onClick={() => setStep(0)}>Get Started</span>
          </GradientButton>
          <button className="link-btn" onClick={() => navigate("/home")}>
            Skip to Demo Mode
          </button>
        </div>
      </Page>
    );
  }

  return (
    <Page className="onboarding">
      <div className="progress-track">
        <motion.span animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 170, damping: 22 }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 210, damping: 24 }}
          className="wizard-card"
        >
          <p className="eyebrow">Step {step + 1} of 3</p>
          <h1>{step === 0 ? "What tastes like a good night?" : step === 1 ? "What kind of energy are we chasing?" : "Set the spend comfort zone."}</h1>
          {step < 2 ? (
            <div className="chip-grid">
              {choices.map((choice, index) => (
                <motion.button
                  key={choice}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileTap={{ scale: 0.92 }}
                  className={`choice-chip ${selected.has(choice) ? "selected" : ""}`}
                  onClick={() => toggle(choice)}
                >
                  {choice}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="budget-card">
              <div className="budget-value">${budget}</div>
              <input value={budget} min={60} max={420} type="range" onChange={(event) => setBudget(Number(event.target.value))} />
              <div className="range-labels">
                <span>Easy</span>
                <span>Premium</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="wizard-actions">
        <button className="ghost-btn" onClick={() => (step === 0 ? setStep(-1) : setStep(step - 1))}>
          Back
        </button>
        <GradientButton>
          <span onClick={() => (step === 2 ? navigate("/home") : setStep(step + 1))}>{step === 2 ? "Enter Loop" : "Continue"}</span>
        </GradientButton>
      </div>
    </Page>
  );
}

function Home() {
  const [placeholder, setPlaceholder] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => setPlaceholder((value) => (value + 1) % moods.length), 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Page className="home-screen">
      <Header
        eyebrow="Friday, 6:42 PM"
        title="Good evening, Tyrone"
        actions={
          <>
            <IconButton label="Notifications" to="/notifications">
              <Bell />
            </IconButton>
            <IconButton label="Profile" to="/profile">
              <UserRound />
            </IconButton>
          </>
        }
      />
      <ScrollReveal className="hero-prompt">
        <Sparkles className="hero-spark" />
        <h2>What experience are you craving?</h2>
        <div className="prompt-box">
          <Search />
          <AnimatePresence mode="wait">
            <motion.span
              key={placeholder}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {moods[placeholder][2]}
            </motion.span>
          </AnimatePresence>
          <VoiceButton />
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/quick-idea")} className="send-btn" aria-label="Send">
            <Send />
          </motion.button>
        </div>
      </ScrollReveal>
      <ScrollReveal className="mood-strip" delay={0.08}>
        {moods.map(([label, color], index) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate("/quick-idea")}
            className={`mood-chip ${color}`}
          >
            <span>{index === 0 ? "🌹" : index === 1 ? "🌇" : index === 2 ? "🔥" : index === 3 ? "☀️" : "✨"}</span>
            {label}
          </motion.button>
        ))}
      </ScrollReveal>
      <ScrollReveal className="trending-section" delay={0.12}>
        <div className="section-header">
          <h3><TrendingUp /> Trending Near You</h3>
          <Link to="/discover" className="see-all">See all <ChevronRight /></Link>
        </div>
        <div className="trending-scroll">
          {trendingCategories.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/discover")}
              className={`trending-card ${cat.color}`}
            >
              <span className="trending-emoji">{cat.emoji}</span>
              <b>{cat.label}</b>
              <small>{cat.description}</small>
            </motion.button>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="viral-spotlight" delay={0.16}>
        <div className="section-header">
          <h3><Flame /> Viral Right Now</h3>
        </div>
        <div className="viral-scroll">
          {venues.filter(v => v.category === "trending-food").map((venue, index) => (
            <motion.article
              key={venue.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/venue/${venue.id}`)}
              className="viral-card"
            >
              <img src={venue.image} alt="" />
              <div className="viral-badge">TikTok Viral</div>
              <div className="viral-info">
                <b>{venue.name}</b>
                <span>{venue.type} · {venue.price}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </ScrollReveal>
      <div className="home-grid">
        <ScrollReveal className="glass-card featured-plan">
          <div className="card-topline">
            <span>AI plan ready</span>
            <span>94% vibe</span>
          </div>
          <h3>Birria crawl into speakeasy nightcap</h3>
          <p>Three stops: viral street tacos, immersive cocktail puzzles at The Looking Glass, then rooftop views at Luma.</p>
          <GradientButton to="/create-loop">Build Itinerary</GradientButton>
        </ScrollReveal>
        <ScrollReveal className="glass-card featured-plan family-plan" delay={0.06}>
          <div className="card-topline">
            <span><Baby /> Kid-Friendly</span>
            <span>98% match</span>
          </div>
          <h3>Family adventure day: dig, splash, eat</h3>
          <p>Gem digging at Discovery Zone, splash park at the Yards, birria tacos for the win. Budget: ~$65.</p>
          <GradientButton to="/create-loop">Plan Family Day</GradientButton>
        </ScrollReveal>
        <ScrollReveal className="mini-actions" delay={0.1}>
          <Link to="/bookings" className="mini-action">
            <CalendarCheck />
            My Bookings
          </Link>
          <Link to="/favorites" className="mini-action">
            <Heart />
            Favorites
          </Link>
          <Link to="/discover" className="mini-action">
            <Flame />
            Discover
          </Link>
        </ScrollReveal>
      </div>
    </Page>
  );
}

function VoiceButton() {
  return (
    <button className="voice-btn" aria-label="Voice input">
      <span />
      <span />
      <Mic />
    </button>
  );
}

function QuickIdea() {
  const navigate = useNavigate();
  const venue = venues[0];
  const [saved, setSaved] = useState(false);
  const [particles, setParticles] = useState(false);

  const save = () => {
    setSaved(true);
    setParticles(true);
    window.setTimeout(() => setParticles(false), 900);
  };

  return (
    <Page className="quick-screen">
      <Header
        eyebrow="AI Venue Flashcard"
        title="Tonight's best pull"
        actions={
          <IconButton label="Refresh">
            <RefreshCw />
          </IconButton>
        }
      />
      <TiltVenueCard venue={venue} onOpen={() => navigate(`/venue/${venue.id}`)} />
      <div className="action-row flash-actions">
        <motion.button whileTap={{ scale: 0.88 }} className="circle-action skip">
          <X />
        </motion.button>
        <GradientButton to="/create-loop">
          <CalendarCheck />
          Build Itinerary
        </GradientButton>
        <motion.button whileTap={{ scale: 0.88 }} onClick={save} className={`circle-action save ${saved ? "active" : ""}`}>
          <Heart fill={saved ? "currentColor" : "none"} />
          {particles ? <ParticleBurst /> : null}
        </motion.button>
      </div>
    </Page>
  );
}

function TiltVenueCard({ venue, onOpen }: { venue: (typeof venues)[number]; onOpen: () => void }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);

  return (
    <motion.article
      drag="x"
      dragConstraints={{ left: -110, right: 110 }}
      style={{ rotateX, rotateY, x }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
        rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="venue-flashcard"
    >
      <img src={venue.image} alt="" />
      <div className="image-fade" />
      <div className="flash-content">
        <div className="match-ring" style={{ "--score": venue.match } as React.CSSProperties}>
          <span>{venue.match}%</span>
          <small>Vibe</small>
        </div>
        <div>
          <p className="eyebrow">{venue.type}</p>
          <h2>{venue.name}</h2>
          <p>
            {venue.area} · {venue.price}
          </p>
        </div>
        <div className="tag-row">
          {venue.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CreateLoop() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState("date-night");
  const [vibe, setVibe] = useState<string[]>(["Romantic"]);
  const [partySize, setPartySize] = useState(2);
  const [arrivalMode, setArrivalMode] = useState<"rideshare" | "drive">("drive");
  const [evCharge, setEvCharge] = useState(true);
  const [stopCount, setStopCount] = useState(3);
  const [seating, setSeating] = useState("booth");
  const [preOrders, setPreOrders] = useState<Record<string, string[]>>({});
  const isDriving = arrivalMode === "drive";

  const vibeOptions = ["Romantic", "Celebration", "Foodie", "Adventurous", "Chill", "Upscale", "Trendy", "Cozy"];

  const toggleVibe = (v: string) => {
    setVibe(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  };

  const togglePreOrder = (venue: string, item: string) => {
    setPreOrders(prev => {
      const current = prev[venue] || [];
      return { ...prev, [venue]: current.includes(item) ? current.filter(x => x !== item) : [...current, item] };
    });
  };

  const totalSteps = 4;

  return (
    <Page className="itinerary-screen">
      <Header eyebrow="Create Your Loop" title={step === 0 ? "Set the vibe" : step === 1 ? "How are you rolling?" : step === 2 ? "Pre-order food & drinks" : "Pick your seats"} />
      <div className="progress-track" style={{ marginBottom: 16 }}>
        <motion.span animate={{ width: `${((step + 1) / totalSteps) * 100}%` }} transition={{ type: "spring", stiffness: 170, damping: 22 }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 210, damping: 24 }}>
            <ScrollReveal className="loop-section">
              <p className="eyebrow" style={{ marginBottom: 8 }}>What's the occasion?</p>
              <div className="chip-grid">
                {occasions.map((occ) => (
                  <motion.button whileTap={{ scale: 0.92 }} key={occ.id} className={`choice-chip ${occasion === occ.id ? "selected" : ""}`} onClick={() => setOccasion(occ.id)}>
                    {occ.emoji} {occ.label}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className="loop-section" delay={0.06}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>What's the vibe?</p>
              <div className="chip-grid">
                {vibeOptions.map((v) => (
                  <motion.button whileTap={{ scale: 0.92 }} key={v} className={`choice-chip ${vibe.includes(v) ? "selected" : ""}`} onClick={() => toggleVibe(v)}>
                    {v}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className="loop-section" delay={0.1}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Party size</p>
              <div className="stop-selector">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <motion.button whileTap={{ scale: 0.92 }} key={n} className={partySize === n ? "active" : ""} onClick={() => setPartySize(n)}>
                    <Users style={{ width: 14, height: 14 }} /> {n}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className="loop-section" delay={0.14}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>How many stops?</p>
              <div className="stop-selector">
                {[2, 3, 4].map((n) => (
                  <motion.button whileTap={{ scale: 0.92 }} key={n} className={stopCount === n ? "active" : ""} onClick={() => setStopCount(n)}>
                    {n} stops
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 210, damping: 24 }}>
            <ScrollReveal className="loop-section">
              <p className="eyebrow" style={{ marginBottom: 8 }}>Arrival mode</p>
              <div className="arrival-mode">
                <button className={!isDriving ? "active" : ""} onClick={() => setArrivalMode("rideshare")}>
                  <Navigation /> Rideshare
                </button>
                <button className={isDriving ? "active" : ""} onClick={() => setArrivalMode("drive")}>
                  <Car /> Driving
                </button>
              </div>
            </ScrollReveal>
            {isDriving && (
              <ScrollReveal className="loop-section" delay={0.06}>
                <motion.button whileTap={{ scale: 0.96 }} className={`glass-card ev-toggle ${evCharge ? "ev-active" : ""}`} onClick={() => setEvCharge(!evCharge)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", width: "100%", textAlign: "left", background: evCharge ? "rgba(6,214,160,0.12)" : undefined, border: evCharge ? "1px solid rgba(6,214,160,0.4)" : undefined }}>
                  <BatteryCharging style={{ color: evCharge ? "var(--teal)" : "inherit", flexShrink: 0 }} />
                  <div>
                    <b style={{ display: "block", fontSize: 14 }}>Weave in EV charging</b>
                    <small style={{ opacity: 0.7 }}>We'll find chargers near your stops so your car charges while you enjoy</small>
                  </div>
                  <div style={{ marginLeft: "auto", width: 40, height: 22, borderRadius: 11, background: evCharge ? "var(--teal)" : "rgba(255,255,255,0.15)", position: "relative", flexShrink: 0 }}>
                    <motion.div animate={{ x: evCharge ? 18 : 0 }} style={{ width: 18, height: 18, borderRadius: 9, background: "#fff", position: "absolute", top: 2, left: 2 }} />
                  </div>
                </motion.button>
              </ScrollReveal>
            )}
            <ScrollReveal className="arrival-summary" delay={0.08}>
              {isDriving ? (
                <>
                  <b>Parking-aware route{evCharge ? " + EV charging" : ""}</b>
                  <span>{evCharge ? "Charger at Georgetown stop · $30 est. parking" : "$30 estimated parking · keep the car parked after stop 2"}</span>
                </>
              ) : (
                <>
                  <b>Rideshare-ready plan</b>
                  <span>Shareable route, pickup notes, and leave-by timing for Uber</span>
                </>
              )}
            </ScrollReveal>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 210, damping: 24 }}>
            <ScrollReveal className="loop-section">
              <p className="eyebrow" style={{ marginBottom: 4 }}>Pre-order food & drinks ahead</p>
              <small style={{ opacity: 0.6, display: "block", marginBottom: 14 }}>Your order will be ready when you arrive — skip the wait</small>
            </ScrollReveal>
            {loopStops.slice(0, stopCount).map((stop, si) => {
              const menuItems = preOrderMenus[stop.name] || [];
              if (menuItems.length === 0) return null;
              const selected = preOrders[stop.name] || [];
              return (
                <ScrollReveal key={stop.name} className="glass-card" delay={si * 0.08} >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 13, background: "linear-gradient(135deg, var(--coral), var(--pink))", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>{si + 1}</div>
                    <div>
                      <b style={{ fontSize: 14 }}>{stop.name}</b>
                      <small style={{ display: "block", opacity: 0.6, fontSize: 12 }}>{stop.detail} · {stop.time}</small>
                    </div>
                  </div>
                  <div className="menu-scroll" style={{ gap: 8 }}>
                    {menuItems.map((mi) => (
                      <motion.button whileTap={{ scale: 0.94 }} key={mi.item} className={`menu-card ${selected.includes(mi.item) ? "selected-menu" : ""}`} onClick={() => togglePreOrder(stop.name, mi.item)} style={{ minWidth: 140, textAlign: "left", border: selected.includes(mi.item) ? "1px solid var(--teal)" : "1px solid rgba(255,255,255,0.08)", background: selected.includes(mi.item) ? "rgba(6,214,160,0.1)" : undefined }}>
                        <b style={{ fontSize: 13 }}>{mi.item}</b>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                          <small style={{ opacity: 0.6 }}>${mi.price}</small>
                          <small style={{ fontSize: 11 }}>{mi.tag}</small>
                        </div>
                        {selected.includes(mi.item) && <Check style={{ position: "absolute", top: 6, right: 6, width: 14, height: 14, color: "var(--teal)" }} />}
                      </motion.button>
                    ))}
                  </div>
                </ScrollReveal>
              );
            })}
            {Object.values(preOrders).flat().length > 0 && (
              <ScrollReveal className="arrival-summary" delay={0.1}>
                <b>Pre-order total: ${Object.entries(preOrders).reduce((sum, [venue, items]) => {
                  const menu = preOrderMenus[venue] || [];
                  return sum + items.reduce((s, item) => s + (menu.find(m => m.item === item)?.price || 0), 0);
                }, 0)}</b>
                <span>{Object.values(preOrders).flat().length} items across {Object.keys(preOrders).filter(k => preOrders[k].length > 0).length} stops</span>
              </ScrollReveal>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 210, damping: 24 }}>
            <ScrollReveal className="loop-section">
              <p className="eyebrow" style={{ marginBottom: 4 }}>Desired seating area</p>
              <small style={{ opacity: 0.6, display: "block", marginBottom: 14 }}>We'll request your preference at each restaurant</small>
              <div className="chip-grid">
                {seatingOptions.map((opt) => (
                  <motion.button whileTap={{ scale: 0.92 }} key={opt.id} className={`choice-chip ${seating === opt.id ? "selected" : ""}`} onClick={() => setSeating(opt.id)} style={{ fontSize: 14 }}>
                    {opt.emoji} {opt.label}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className="glass-card" delay={0.08} >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Sofa style={{ color: "var(--gold)", flexShrink: 0 }} />
                <div>
                  <b style={{ fontSize: 14, display: "block" }}>Seating request: {seatingOptions.find(s => s.id === seating)?.label}</b>
                  <small style={{ opacity: 0.6 }}>Applied to all dining stops · restaurants will do their best to accommodate</small>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal className="glass-card" delay={0.14} >
              <h3 style={{ fontSize: 15, marginBottom: 10 }}>Your Loop Summary</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
                <div style={{ opacity: 0.7 }}>Occasion</div><div><b>{occasions.find(o => o.id === occasion)?.emoji} {occasions.find(o => o.id === occasion)?.label}</b></div>
                <div style={{ opacity: 0.7 }}>Vibe</div><div><b>{vibe.join(", ")}</b></div>
                <div style={{ opacity: 0.7 }}>Party</div><div><b>{partySize} {partySize === 1 ? "person" : "people"}</b></div>
                <div style={{ opacity: 0.7 }}>Stops</div><div><b>{stopCount} stops</b></div>
                <div style={{ opacity: 0.7 }}>Arrival</div><div><b>{isDriving ? "Driving" : "Rideshare"}{isDriving && evCharge ? " + EV" : ""}</b></div>
                <div style={{ opacity: 0.7 }}>Seating</div><div><b>{seatingOptions.find(s => s.id === seating)?.emoji} {seatingOptions.find(s => s.id === seating)?.label}</b></div>
                <div style={{ opacity: 0.7 }}>Pre-orders</div><div><b>{Object.values(preOrders).flat().length} items</b></div>
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="wizard-actions" style={{ marginTop: 16 }}>
        <button className="ghost-btn" onClick={() => step > 0 ? setStep(step - 1) : navigate("/home")}>
          Back
        </button>
        <GradientButton>
          <span onClick={() => step < totalSteps - 1 ? setStep(step + 1) : navigate("/boarding-pass")}>
            {step === totalSteps - 1 ? "Generate Boarding Pass" : "Continue"}
          </span>
        </GradientButton>
      </div>
    </Page>
  );
}

function BoardingPass() {
  const navigate = useNavigate();
  const [arrivalMode] = useState<"rideshare" | "drive">("drive");
  const isDriving = arrivalMode === "drive";
  const vibeTheme = "nightlife";
  const activeOccasion = occasions.find(o => o.id === "date-night")!;
  const loopCode = "LOOP-DATE-0510";
  const departureStop = loopStops[0];
  const destinationStop = loopStops[loopStops.length - 1];
  const departureCode = hoodCodes[departureStop.area] || "???";
  const destinationCode = hoodCodes[destinationStop.area] || "???";

  const themeColors: Record<string, { from: string; to: string; accent: string }> = {
    "date-night": { from: "#ff6b6b", to: "#ee5a9d", accent: "var(--gold)" },
    "nightlife": { from: "#8b5cf6", to: "#4cc9f0", accent: "var(--cyan)" },
    "family": { from: "#ff8a5b", to: "#ffd166", accent: "var(--orange)" },
    "solo": { from: "#06d6a0", to: "#4cc9f0", accent: "var(--teal)" },
    "celebration": { from: "#ffd166", to: "#ff6b6b", accent: "var(--gold)" }
  };
  const theme = themeColors[vibeTheme] || themeColors["date-night"];

  return (
    <Page className="itinerary-screen">
      <Header eyebrow="Your Loop is ready" title="Boarding Pass" actions={<IconButton label="Share"><Share2 /></IconButton>} />

      <ScrollReveal>
        <motion.div
          className="glass-card"
          style={{
            background: `linear-gradient(145deg, ${theme.from}18, ${theme.to}10)`,
            border: `1px solid ${theme.from}40`,
            borderRadius: 20,
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Header band */}
          <div style={{
            background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Route style={{ width: 20, height: 20 }} />
              <b style={{ fontSize: 16, letterSpacing: 1 }}>LOOP</b>
            </div>
            <span style={{ fontSize: 12, opacity: 0.9, fontFamily: "monospace", letterSpacing: 2 }}>{loopCode}</span>
          </div>

          {/* Route summary */}
          <div style={{ padding: "18px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              <b style={{ fontSize: 28, fontFamily: "monospace", letterSpacing: 2 }}>{departureCode}</b>
              <p style={{ fontSize: 11, opacity: 0.6, margin: 0 }}>{departureStop.area}</p>
              <small style={{ fontSize: 10, opacity: 0.5 }}>{departureStop.time}</small>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "0 12px" }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: theme.from }} />
              <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${theme.from}, ${theme.to})`, opacity: 0.5 }} />
              {loopStops.length > 2 && <span style={{ fontSize: 10, opacity: 0.5, padding: "0 4px" }}>{loopStops.length - 2} layover{loopStops.length - 2 > 1 ? "s" : ""}</span>}
              <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${theme.from}, ${theme.to})`, opacity: 0.5 }} />
              <PlaneTakeoff style={{ width: 16, height: 16, color: theme.to }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <b style={{ fontSize: 28, fontFamily: "monospace", letterSpacing: 2 }}>{destinationCode}</b>
              <p style={{ fontSize: 11, opacity: 0.6, margin: 0 }}>{destinationStop.area}</p>
              <small style={{ fontSize: 10, opacity: 0.5 }}>{destinationStop.time}</small>
            </div>
          </div>

          {/* Vibe tags */}
          <div style={{ padding: "12px 18px 0", display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${theme.from}20`, border: `1px solid ${theme.from}30` }}>{activeOccasion.emoji} {activeOccasion.label}</span>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${theme.from}20`, border: `1px solid ${theme.from}30` }}>Romantic</span>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${theme.from}20`, border: `1px solid ${theme.from}30` }}>Upscale</span>
          </div>

          {/* Dashed separator */}
          <div style={{ margin: "16px 0", borderTop: "2px dashed rgba(255,255,255,0.12)", position: "relative" }}>
            <div style={{ position: "absolute", left: -12, top: -12, width: 24, height: 24, borderRadius: 12, background: "var(--plum)" }} />
            <div style={{ position: "absolute", right: -12, top: -12, width: 24, height: 24, borderRadius: 12, background: "var(--plum)" }} />
          </div>

          {/* Stops detail */}
          <div style={{ padding: "0 18px" }}>
            {loopStops.map((stop, index) => (
              <motion.div key={stop.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} style={{ display: "flex", gap: 12, marginBottom: 16, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 30, flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 14,
                    background: stop.role === "departure" ? `linear-gradient(135deg, ${theme.from}, ${theme.to})` : stop.role === "destination" ? theme.accent : "rgba(255,255,255,0.1)",
                    display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700
                  }}>
                    {stop.role === "departure" ? "D" : stop.role === "destination" ? "A" : "L"}
                  </div>
                  {index < loopStops.length - 1 && <div style={{ flex: 1, width: 1, background: "rgba(255,255,255,0.1)", marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <b style={{ fontSize: 14 }}>{stop.name}</b>
                    <span style={{ fontFamily: "monospace", fontSize: 12, opacity: 0.5 }}>{hoodCodes[stop.area]}</span>
                  </div>
                  <small style={{ display: "block", opacity: 0.6, fontSize: 12 }}>{stop.detail} · {stop.time}</small>
                  <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                      {isDriving ? `🅿️ ${stop.parking.split("·")[0]}` : `📍 ${stop.pickup}`}
                    </span>
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                      👔 {stop.dress}
                    </span>
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                      ✨ {stop.match}% vibe
                    </span>
                  </div>
                  {stop.evCharger && (
                    <div style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.25)", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, color: "var(--teal)" }}>
                      <BatteryCharging style={{ width: 12, height: 12 }} /> {stop.evCharger}
                    </div>
                  )}
                  {index < loopStops.length - 1 && (
                    <div style={{ fontSize: 10, opacity: 0.4, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      {isDriving ? <Car style={{ width: 11, height: 11 }} /> : <Navigation style={{ width: 11, height: 11 }} />}
                      {isDriving ? stop.driveTravel : stop.rideTravel} to next stop
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pre-orders section */}
          <div style={{ padding: "0 18px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Utensils style={{ width: 14, height: 14, color: theme.accent }} />
              <b style={{ fontSize: 13 }}>Pre-ordered</b>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>🍷 Coastal Wine Flight</span>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>🍶 Craft Sake Flight</span>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>🥃 Vinyl Old Fashioned</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <Sofa style={{ width: 14, height: 14, color: theme.accent }} />
              <span style={{ fontSize: 12, opacity: 0.7 }}>Seating: 🛋️ Booth requested at all stops</span>
            </div>
          </div>

          {/* Bottom stats */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 18px", display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.6 }}>
            <span>{loopStops.length} stops</span>
            <span>{new Set(loopStops.map(s => s.area)).size} hoods</span>
            <span>~4 hrs</span>
            {isDriving && <span style={{ color: "var(--teal)" }}>⚡ EV charged</span>}
          </div>

          {/* Confetti reward */}
          <div style={{
            background: `linear-gradient(135deg, ${theme.from}15, ${theme.to}10)`,
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PartyPopper style={{ width: 16, height: 16, color: "var(--gold)" }} />
              <span style={{ fontSize: 12 }}>Complete this Loop to earn <b style={{ color: "var(--gold)" }}>+120 Confetti</b></span>
            </div>
          </div>

          {/* Barcode */}
          <div style={{ padding: "12px 18px 16px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 6 }}>
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} style={{ width: i % 3 === 0 ? 3 : 2, height: 36, background: `rgba(255,255,255,${0.15 + Math.random() * 0.2})`, borderRadius: 1 }} />
              ))}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 10, opacity: 0.4, letterSpacing: 3 }}>{loopCode}</span>
          </div>
        </motion.div>
      </ScrollReveal>

      {/* Add to Wallet — quick access */}
      <ScrollReveal>
        <motion.div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 8
          }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "11px 0",
              borderRadius: 14,
              border: "none",
              background: "#000",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple Wallet
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "11px 0",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Wallet
          </motion.button>
        </motion.div>
      </ScrollReveal>

      <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="floating-bookbar">
        <div>
          <b>$370</b>
          <span>incl. parking + pre-orders</span>
        </div>
        <GradientButton to="/confirmation">Confirm Loop</GradientButton>
      </motion.div>
    </Page>
  );
}

/* ── Active Loop — GPS Check-In ─────────────────────────────── */

type CheckInStatus = "upcoming" | "en-route" | "nearby" | "arrived" | "checked-in";

interface StopCheckin {
  status: CheckInStatus;
  arrivedAt?: string;
  notifiedBusiness: boolean;
}

function ActiveLoop() {
  const navigate = useNavigate();
  const [checkins, setCheckins] = useState<StopCheckin[]>(
    loopStops.map((_, i) => ({
      status: i === 0 ? "en-route" : "upcoming",
      notifiedBusiness: false
    }))
  );
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [gpsActive, setGpsActive] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyingStop, setNotifyingStop] = useState(0);
  const [expandedStop, setExpandedStop] = useState<number | null>(0);
  const [pulseAnim, setPulseAnim] = useState(true);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  const vibeTheme = "nightlife";
  const themeColors: Record<string, { from: string; to: string; accent: string }> = {
    "date-night": { from: "#ff6b6b", to: "#ee5a9d", accent: "var(--gold)" },
    "nightlife": { from: "#8b5cf6", to: "#4cc9f0", accent: "var(--cyan)" },
    "family": { from: "#ff8a5b", to: "#ffd166", accent: "var(--orange)" },
    "solo": { from: "#06d6a0", to: "#4cc9f0", accent: "var(--teal)" },
    "celebration": { from: "#ffd166", to: "#ff6b6b", accent: "var(--gold)" }
  };
  const theme = themeColors[vibeTheme] || themeColors["date-night"];
  const loopCode = "LOOP-DATE-0510";

  // Simulate GPS tracking with elapsed timer
  useEffect(() => {
    if (!gpsActive) return;
    const interval = setInterval(() => setElapsedMinutes(m => m + 1), 60000);
    return () => clearInterval(interval);
  }, [gpsActive]);

  const startGps = useCallback(() => {
    setGpsActive(true);
    // Simulate "nearby" after brief delay for first stop
    setTimeout(() => {
      setCheckins(prev => {
        const copy = [...prev];
        if (copy[0].status === "en-route") copy[0] = { ...copy[0], status: "nearby" };
        return copy;
      });
    }, 2000);
  }, []);

  const handleImHere = (stopIndex: number) => {
    setCheckins(prev => {
      const copy = [...prev];
      copy[stopIndex] = {
        ...copy[stopIndex],
        status: "arrived",
        arrivedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      return copy;
    });
    // Show notify business modal
    setNotifyingStop(stopIndex);
    setShowNotifyModal(true);
  };

  const notifyBusiness = (stopIndex: number) => {
    setCheckins(prev => {
      const copy = [...prev];
      copy[stopIndex] = { ...copy[stopIndex], status: "checked-in", notifiedBusiness: true };
      return copy;
    });
    setShowNotifyModal(false);
    // Advance to next stop after check-in
    if (stopIndex < loopStops.length - 1) {
      setTimeout(() => {
        setActiveStopIndex(stopIndex + 1);
        setExpandedStop(stopIndex + 1);
        setCheckins(prev => {
          const copy = [...prev];
          copy[stopIndex + 1] = { ...copy[stopIndex + 1], status: "en-route" };
          return copy;
        });
        // Simulate approach to next stop
        setTimeout(() => {
          setCheckins(prev => {
            const copy = [...prev];
            if (copy[stopIndex + 1].status === "en-route") copy[stopIndex + 1] = { ...copy[stopIndex + 1], status: "nearby" };
            return copy;
          });
        }, 3000);
      }, 1500);
    }
  };

  const skipNotify = () => {
    const stopIndex = notifyingStop;
    setCheckins(prev => {
      const copy = [...prev];
      copy[stopIndex] = { ...copy[stopIndex], status: "checked-in", notifiedBusiness: false };
      return copy;
    });
    setShowNotifyModal(false);
    if (stopIndex < loopStops.length - 1) {
      setTimeout(() => {
        setActiveStopIndex(stopIndex + 1);
        setExpandedStop(stopIndex + 1);
        setCheckins(prev => {
          const copy = [...prev];
          copy[stopIndex + 1] = { ...copy[stopIndex + 1], status: "en-route" };
          return copy;
        });
      }, 1000);
    }
  };

  const allComplete = checkins.every(c => c.status === "checked-in");
  const completedCount = checkins.filter(c => c.status === "checked-in").length;

  const statusConfig: Record<CheckInStatus, { label: string; color: string; bg: string }> = {
    "upcoming": { label: "Upcoming", color: "rgba(255,255,255,0.4)", bg: "rgba(255,255,255,0.06)" },
    "en-route": { label: "En Route", color: "var(--cyan)", bg: "rgba(76,201,240,0.12)" },
    "nearby": { label: "Nearby", color: "var(--gold)", bg: "rgba(255,209,102,0.15)" },
    "arrived": { label: "Arrived", color: "#06d6a0", bg: "rgba(6,214,160,0.15)" },
    "checked-in": { label: "Checked In", color: "#06d6a0", bg: "rgba(6,214,160,0.1)" }
  };

  return (
    <Page className="itinerary-screen">
      <Header eyebrow="Loop in progress" title="Active Loop" actions={<IconButton label="Share"><Share2 /></IconButton>} />

      {/* GPS status bar */}
      <ScrollReveal>
        <motion.div style={{
          background: gpsActive ? "rgba(6,214,160,0.1)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${gpsActive ? "rgba(6,214,160,0.3)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 16, padding: "12px 16px", marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {gpsActive ? (
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Radio style={{ width: 20, height: 20, color: "var(--teal)" }} />
              </motion.div>
            ) : (
              <MapPin style={{ width: 20, height: 20, opacity: 0.5 }} />
            )}
            <div>
              <b style={{ fontSize: 13, display: "block" }}>{gpsActive ? "GPS Active — Tracking your Loop" : "GPS Tracking Off"}</b>
              <small style={{ fontSize: 11, opacity: 0.6 }}>
                {gpsActive
                  ? `${completedCount}/${loopStops.length} stops checked in`
                  : "Enable to auto-detect arrivals"}
              </small>
            </div>
          </div>
          {!gpsActive ? (
            <motion.button whileTap={{ scale: 0.95 }} onClick={startGps} style={{
              background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
              border: "none", borderRadius: 20, padding: "8px 16px",
              color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer"
            }}>
              Go Live
            </motion.button>
          ) : (
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--teal)" }}>{loopCode}</span>
          )}
        </motion.div>
      </ScrollReveal>

      {/* Progress rail */}
      <div style={{ padding: "0 4px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, position: "relative" }}>
          {loopStops.map((stop, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < loopStops.length - 1 ? 1 : "none" }}>
              <motion.div
                animate={{
                  scale: i === activeStopIndex && gpsActive ? [1, 1.15, 1] : 1,
                  boxShadow: checkins[i].status === "checked-in"
                    ? "0 0 12px rgba(6,214,160,0.4)"
                    : checkins[i].status === "nearby"
                    ? "0 0 12px rgba(255,209,102,0.4)"
                    : "none"
                }}
                transition={{ repeat: i === activeStopIndex && gpsActive ? Infinity : 0, duration: 2 }}
                style={{
                  width: 32, height: 32, borderRadius: 16, flexShrink: 0,
                  display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700,
                  background: checkins[i].status === "checked-in"
                    ? "linear-gradient(135deg, #06d6a0, #4cc9f0)"
                    : checkins[i].status === "nearby" || checkins[i].status === "arrived"
                    ? `linear-gradient(135deg, ${theme.from}, ${theme.to})`
                    : i === activeStopIndex
                    ? `linear-gradient(135deg, ${theme.from}80, ${theme.to}80)`
                    : "rgba(255,255,255,0.1)",
                  border: i === activeStopIndex && gpsActive ? `2px solid ${theme.from}` : "2px solid transparent"
                }}
              >
                {checkins[i].status === "checked-in" ? (
                  <Check style={{ width: 16, height: 16 }} />
                ) : (
                  <span>{i + 1}</span>
                )}
              </motion.div>
              {i < loopStops.length - 1 && (
                <div style={{
                  flex: 1, height: 3, marginLeft: -1, marginRight: -1,
                  background: checkins[i].status === "checked-in"
                    ? "linear-gradient(90deg, #06d6a0, #4cc9f0)"
                    : "rgba(255,255,255,0.08)",
                  borderRadius: 2
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {loopStops.map((stop, i) => (
            <span key={i} style={{
              fontSize: 9, opacity: i === activeStopIndex ? 1 : 0.5,
              color: checkins[i].status === "checked-in" ? "var(--teal)" : "inherit",
              width: 32, textAlign: "center", fontWeight: i === activeStopIndex ? 700 : 400
            }}>
              {hoodCodes[stop.area]}
            </span>
          ))}
        </div>
      </div>

      {/* Stop cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {loopStops.map((stop, index) => {
          const ci = checkins[index];
          const sc = statusConfig[ci.status];
          const isExpanded = expandedStop === index;
          const isActive = index === activeStopIndex;

          return (
            <ScrollReveal key={stop.name}>
              <motion.div
                layout
                onClick={() => setExpandedStop(isExpanded ? null : index)}
                style={{
                  background: isActive ? `linear-gradient(145deg, ${theme.from}12, ${theme.to}08)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? `${theme.from}40` : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 16, overflow: "hidden", cursor: "pointer",
                  opacity: ci.status === "checked-in" && !isExpanded ? 0.65 : 1
                }}
              >
                {/* Card header */}
                <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: sc.bg, display: "grid", placeItems: "center", flexShrink: 0
                  }}>
                    {ci.status === "checked-in" ? (
                      <CircleCheck style={{ width: 20, height: 20, color: sc.color }} />
                    ) : ci.status === "nearby" || ci.status === "arrived" ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <MapPin style={{ width: 20, height: 20, color: sc.color }} />
                      </motion.div>
                    ) : ci.status === "en-route" ? (
                      <Navigation style={{ width: 20, height: 20, color: sc.color }} />
                    ) : (
                      <Clock style={{ width: 20, height: 20, color: sc.color }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <b style={{ fontSize: 14 }}>{stop.name}</b>
                      <span style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 10,
                        background: sc.bg, color: sc.color, fontWeight: 600
                      }}>
                        {sc.label}
                      </span>
                    </div>
                    <small style={{ fontSize: 12, opacity: 0.6 }}>{stop.detail} · {stop.time}</small>
                    {ci.arrivedAt && (
                      <small style={{ display: "block", fontSize: 11, color: "var(--teal)", marginTop: 2 }}>
                        Arrived at {ci.arrivedAt} {ci.notifiedBusiness && "· Business notified"}
                      </small>
                    )}
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown style={{ width: 16, height: 16, opacity: 0.4 }} />
                  </motion.div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        {/* Info row */}
                        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                            📍 {stop.area} · {hoodCodes[stop.area]}
                          </span>
                          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                            🅿️ {stop.parking.split("·")[0].trim()}
                          </span>
                          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                            👔 {stop.dress}
                          </span>
                          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                            ✨ {stop.match}% vibe
                          </span>
                        </div>
                        {stop.evCharger && (
                          <div style={{
                            fontSize: 10, padding: "4px 8px", borderRadius: 10,
                            background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.25)",
                            display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, color: "var(--teal)"
                          }}>
                            <BatteryCharging style={{ width: 12, height: 12 }} /> {stop.evCharger}
                          </div>
                        )}

                        {/* I'm Here button */}
                        {(ci.status === "nearby" || ci.status === "en-route") && gpsActive && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); handleImHere(index); }}
                            style={{
                              width: "100%", marginTop: 14, padding: "14px 0",
                              background: ci.status === "nearby"
                                ? `linear-gradient(135deg, ${theme.from}, ${theme.to})`
                                : "rgba(255,255,255,0.08)",
                              border: ci.status === "nearby" ? "none" : `1px solid ${theme.from}40`,
                              borderRadius: 14, color: "#fff", fontWeight: 700, fontSize: 14,
                              cursor: "pointer", display: "flex", alignItems: "center",
                              justifyContent: "center", gap: 8
                            }}
                          >
                            <MapPin style={{ width: 18, height: 18 }} />
                            {ci.status === "nearby" ? "I'm Here — Check In" : "I'm Here (override)"}
                          </motion.button>
                        )}

                        {ci.status === "arrived" && (
                          <div style={{
                            width: "100%", marginTop: 14, padding: "12px 0",
                            background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.2)",
                            borderRadius: 14, textAlign: "center", fontSize: 13, color: "var(--teal)"
                          }}>
                            <Timer style={{ width: 14, height: 14, display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                            Processing check-in…
                          </div>
                        )}

                        {ci.status === "checked-in" && (
                          <div style={{
                            width: "100%", marginTop: 14, padding: "12px 0",
                            background: "rgba(6,214,160,0.1)", borderRadius: 14,
                            textAlign: "center", fontSize: 13, color: "var(--teal)",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                          }}>
                            <CircleCheck style={{ width: 16, height: 16 }} />
                            Checked in{ci.notifiedBusiness ? " · Business notified" : ""}
                          </div>
                        )}

                        {/* Travel to next */}
                        {index < loopStops.length - 1 && ci.status === "checked-in" && (
                          <div style={{ marginTop: 10, fontSize: 11, opacity: 0.5, display: "flex", alignItems: "center", gap: 4 }}>
                            <Car style={{ width: 12, height: 12 }} />
                            {stop.driveTravel} to {loopStops[index + 1].name}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Completion card */}
      <AnimatePresence>
        {allComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={{
              marginTop: 20, padding: 20, textAlign: "center",
              background: `linear-gradient(145deg, ${theme.from}15, ${theme.to}10)`,
              border: `1px solid ${theme.from}30`, borderRadius: 20
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              style={{ fontSize: 48, marginBottom: 8 }}
            >
              🎉
            </motion.div>
            <b style={{ fontSize: 18, display: "block" }}>Loop Complete!</b>
            <p style={{ fontSize: 13, opacity: 0.7, margin: "8px 0 16px" }}>
              All stops checked in. You earned <b style={{ color: "var(--gold)" }}>+120 Confetti!</b>
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/boarding-pass")}
                style={{
                  flex: 1, padding: "12px", background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                  color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer"
                }}
              >
                View Keepsake
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/passport")}
                style={{
                  flex: 1, padding: "12px",
                  background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                  border: "none", borderRadius: 12,
                  color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer"
                }}
              >
                Claim Confetti
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notify business modal */}
      <AnimatePresence>
        {showNotifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNotifyModal(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
              display: "grid", placeItems: "center", zIndex: 100,
              padding: 24
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "var(--plum)", borderRadius: 24, padding: 24,
                maxWidth: 360, width: "100%",
                border: `1px solid ${theme.from}30`
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                    display: "grid", placeItems: "center", margin: "0 auto 12px"
                  }}
                >
                  <Bell style={{ width: 28, height: 28 }} />
                </motion.div>
                <b style={{ fontSize: 18, display: "block" }}>You've arrived!</b>
                <p style={{ fontSize: 13, opacity: 0.7, margin: "8px 0 0" }}>
                  Notify <b>{loopStops[notifyingStop].name}</b> that you're here?
                </p>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 14, marginBottom: 16
              }}>
                <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>This will send your:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                  <span style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <Check style={{ width: 14, height: 14, color: "var(--teal)" }} /> Reservation name &amp; party size
                  </span>
                  <span style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <Check style={{ width: 14, height: 14, color: "var(--teal)" }} /> Pre-order details
                  </span>
                  <span style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <Check style={{ width: 14, height: 14, color: "var(--teal)" }} /> Seating preference
                  </span>
                  <span style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <Check style={{ width: 14, height: 14, color: "var(--teal)" }} /> ETA: Now
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => notifyBusiness(notifyingStop)}
                style={{
                  width: "100%", padding: "14px 0",
                  background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                  border: "none", borderRadius: 14, color: "#fff",
                  fontWeight: 700, fontSize: 15, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  marginBottom: 10
                }}
              >
                <Bell style={{ width: 18, height: 18 }} />
                Notify {loopStops[notifyingStop].name}
              </motion.button>

              <button
                onClick={skipNotify}
                style={{
                  width: "100%", padding: "12px 0",
                  background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14, color: "rgba(255,255,255,0.6)",
                  fontSize: 13, cursor: "pointer"
                }}
              >
                Skip — just check in
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA when GPS not started */}
      {!gpsActive && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="floating-bookbar">
          <div>
            <b>3 stops</b>
            <span>Ready to go live</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={startGps}
            className="btn-gradient"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "12px 24px", borderRadius: 20, border: "none",
              background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
              color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer"
            }}
          >
            <Radio style={{ width: 16, height: 16 }} />
            Start GPS
          </motion.button>
        </motion.div>
      )}
    </Page>
  );
}

function VenueDetail() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const venue = venues[0];
  const [arrivalMode, setArrivalMode] = useState<"rideshare" | "drive">("rideshare");
  const isDriving = arrivalMode === "drive";

  return (
    <Page className="detail-screen">
      <div ref={ref} className="detail-scroll">
        <motion.div style={{ y: imageY }} className="detail-hero">
          <img src={venue.image} alt="" />
          <div className="image-fade" />
          <div className="detail-buttons">
            <IconButton label="Back">
              <ArrowLeft onClick={() => navigate(-1)} />
            </IconButton>
            <IconButton label="Share">
              <Share2 />
            </IconButton>
          </div>
          <div className="detail-hero-copy">
            <p className="eyebrow">Venue Intelligence</p>
            <h1>{venue.name}</h1>
          </div>
        </motion.div>
        <div className="detail-sheet">
          <ScrollReveal className="detail-header">
            <div>
              <h2>{venue.name}</h2>
              <p>{venue.type} · {venue.area}</p>
            </div>
            <AnimatedStars value={venue.rating} />
          </ScrollReveal>
          <ScrollReveal className="tag-cloud">
            {venue.tags.concat(["Low wait", "Reservation smart", "Group friendly"]).map((tag, index) => (
              <span key={tag} className={`cloud-${index % 4}`}>
                {tag}
              </span>
            ))}
          </ScrollReveal>
          <ScrollReveal className="arrival-mode detail-arrival">
            <button className={!isDriving ? "active" : ""} onClick={() => setArrivalMode("rideshare")}>
              <Navigation />
              Uber
            </button>
            <button className={isDriving ? "active" : ""} onClick={() => setArrivalMode("drive")}>
              <Car />
              Drive
            </button>
          </ScrollReveal>
          <InfoSection title={isDriving ? "Driving & Parking" : "Rideshare Intel"} icon={isDriving ? <Car /> : <Navigation />}>
            {isDriving ? (
              <>
                <AccordionLine title="Best garage" value="4 min walk · $18 after 6 PM" />
                <AccordionLine title="Street odds" value="Medium before 7 PM, low after" />
              </>
            ) : (
              <>
                <AccordionLine title="Best drop-off" value="South curb by the valet stand" />
                <AccordionLine title="Smart pickup" value="Walk 2 min to avoid surge traffic" />
              </>
            )}
            <div className="map-placeholder">
              {isDriving ? <MapPin /> : <Navigation />}
              {isDriving ? "Smart parking map" : "Share route with Uber"}
            </div>
          </InfoSection>
          <InfoSection title="Menu Highlights" icon={<Utensils />}>
            <div className="menu-scroll">
              {["Yuzu tuna crudo $22", "Miso short rib $36", "Matcha pavlova $14"].map((item, index) => (
                <motion.div whileTap={{ scale: 0.96 }} className="menu-card" key={item}>
                  <b>{item}</b>
                  <span>{index === 0 ? "🔥 spicy" : index === 1 ? "chef pick" : "🌱 light"}</span>
                </motion.div>
              ))}
            </div>
          </InfoSection>
          <InfoSection title="Community Reviews" icon={<ShieldCheck />}>
            <Review name="Maya" tag="🌹 Date Night" text="The upstairs table at golden hour felt like a private event." />
            <Review name="Jules" tag="🔥 Crew Night" text="Fast service, no awkward dead zone between dinner and music." />
          </InfoSection>
        </div>
      </div>
      <div className="sticky-cta">
        <motion.button whileTap={{ scale: 0.9 }} className="heart-cta">
          <Heart />
        </motion.button>
        <GradientButton to="/confirmation" wide>Book Now</GradientButton>
      </div>
    </Page>
  );
}

function InfoSection({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <ScrollReveal className="detail-section">
      <h3>
        {icon}
        {title}
      </h3>
      {children}
    </ScrollReveal>
  );
}

function AccordionLine({ title, value }: { title: string; value: string }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} className="accordion-line">
      <span>{title}</span>
      <b>{value}</b>
      <ChevronRight />
    </motion.div>
  );
}

function Review({ name, tag, text }: { name: string; tag: string; text: string }) {
  return (
    <div className="review">
      <div className="avatar">{name[0]}</div>
      <div>
        <div className="review-head">
          <b>{name}</b>
          <span>{tag}</span>
        </div>
        <AnimatedStars value={4.8} compact />
        <p>{text}</p>
      </div>
    </div>
  );
}

function AnimatedStars({ value, compact = false }: { value: number; compact?: boolean }) {
  return (
    <div className={`stars ${compact ? "compact" : ""}`} aria-label={`${value} stars`}>
      {[0, 1, 2, 3, 4].map((star) => (
        <motion.span key={star} initial={{ scale: 0, color: "#fff" }} animate={{ scale: 1, color: "#FFD166" }} transition={{ delay: star * 0.08 }}>
          <Star fill="currentColor" />
        </motion.span>
      ))}
      {!compact ? <b>{value}</b> : null}
    </div>
  );
}

function Confirmation() {
  const [walletAdded, setWalletAdded] = useState<"none" | "apple" | "google">("none");
  const [walletLoading, setWalletLoading] = useState(false);

  const handleAddToWallet = async (type: "apple" | "google") => {
    setWalletLoading(true);
    // Simulate wallet pass generation — replace with real Supabase edge function call
    await new Promise(r => setTimeout(r, 1500));
    setWalletAdded(type);
    setWalletLoading(false);
  };

  return (
    <Page className="confirmation-screen">
      <Confetti />
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 150, damping: 16 }} className="success-mark">
        <Check />
      </motion.div>
      <h1>Loop locked. The night is yours.</h1>
      <p>Your Loop is confirmed — routes, reservations, pre-orders, and departure timing are set.</p>
      <ScrollReveal className="glass-card code-card">
        <span>Loop code</span>
        <b>LOOP-MOM-0510</b>
        <button>
          <Copy />
        </button>
      </ScrollReveal>
      <ScrollReveal className="departure-card">
        <Clock />
        <div>
          <b>Leave by 7:15 PM</b>
          <span>22 min drive · traffic is light green</span>
        </div>
      </ScrollReveal>

      {/* Wallet Pass Section */}
      <ScrollReveal>
        <div style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: "16px 18px",
          marginBottom: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Wallet style={{ width: 18, height: 18, color: "var(--gold)" }} />
            <b style={{ fontSize: 14 }}>Save to Wallet</b>
          </div>
          <p style={{ fontSize: 12, opacity: 0.6, margin: "0 0 14px", lineHeight: 1.5 }}>
            Keep your boarding pass on your lock screen. Get live updates as you move through your Loop.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {/* Apple Wallet Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAddToWallet("apple")}
              disabled={walletLoading || walletAdded === "apple"}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 0",
                borderRadius: 14,
                border: "none",
                background: walletAdded === "apple"
                  ? "linear-gradient(135deg, rgba(6,214,160,0.2), rgba(6,214,160,0.1))"
                  : "#000",
                color: walletAdded === "apple" ? "var(--teal)" : "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: walletLoading ? "wait" : "pointer",
                opacity: walletLoading && walletAdded !== "apple" ? 0.6 : 1,
                transition: "all 0.3s"
              }}
            >
              {walletAdded === "apple" ? (
                <>
                  <CircleCheck style={{ width: 16, height: 16 }} />
                  Added
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Add to Wallet
                </>
              )}
            </motion.button>

            {/* Google Wallet Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAddToWallet("google")}
              disabled={walletLoading || walletAdded === "google"}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 0",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.15)",
                background: walletAdded === "google"
                  ? "linear-gradient(135deg, rgba(6,214,160,0.2), rgba(6,214,160,0.1))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                color: walletAdded === "google" ? "var(--teal)" : "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: walletLoading ? "wait" : "pointer",
                opacity: walletLoading && walletAdded !== "google" ? 0.6 : 1,
                transition: "all 0.3s"
              }}
            >
              {walletAdded === "google" ? (
                <>
                  <CircleCheck style={{ width: 16, height: 16 }} />
                  Added
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google Wallet
                </>
              )}
            </motion.button>
          </div>
          {walletAdded !== "none" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 11, opacity: 0.5, textAlign: "center", marginTop: 10, marginBottom: 0 }}
            >
              Your boarding pass will update live as you check in at each stop
            </motion.p>
          )}
        </div>
      </ScrollReveal>

      <div className="dual-actions">
        <button className="outline-gradient">Add to Calendar</button>
        <GradientButton>Share with Group</GradientButton>
      </div>
      <GradientButton to="/active-loop" wide>Start Loop — Go Live</GradientButton>
      <Link to="/home" className="countdown-link">
        <span />
        Back to Home
      </Link>
    </Page>
  );
}

function Passport() {
  const [tab, setTab] = useState("Stamps");
  const stamps = ["Viral Eats", "Hidden Gem", "Kids Day", "Outdoor", "Date Night", "Nightlife", "Rooftop", "Street Food"];
  return (
    <Page className="passport-screen">
      <Header eyebrow="Gamification hub" title="Your Passport" actions={<IconButton label="Profile" to="/profile"><UserRound /></IconButton>} />
      <div className="segmented-tabs">
        {["Stamps", "Badges", "Stats"].map((item) => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      {tab === "Stamps" ? (
        <motion.div className="stamp-grid" variants={{ animate: { transition: { staggerChildren: 0.08 } } }} initial="initial" animate="animate">
          {stamps.map((stamp, index) => (
            <motion.button variants={{ initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } }} whileTap={{ scale: 0.92 }} key={stamp} className={`stamp stamp-${index % 4}`}>
              <span>{stamp[0]}</span>
              <b>{stamp}</b>
            </motion.button>
          ))}
        </motion.div>
      ) : tab === "Badges" ? (
        <div className="badge-list">
          {["TikTok Foodie", "Speakeasy Finder", "Family Explorer", "Sunset Chaser", "Night Owl", "Trail Blazer"].map((badge, index) => (
            <ScrollReveal key={badge} delay={index * 0.06} className={`glass-card badge-card ${index >= 4 ? "locked" : ""}`}>
              <div className="badge-emoji">{index >= 4 ? <Lock /> : ["🔥", "🗝️", "👨‍👩‍👧‍👦", "🌅"][index]}</div>
              <div>
                <h3>{badge}</h3>
                <p>{index >= 4 ? "Keep exploring to unlock this badge." : ["Try 5 viral food spots.", "Find 3 hidden bars.", "Complete 3 family adventures.", "Catch 3 sunset experiences."][index]}</p>
                <span className="progress-line"><i style={{ width: `${72 - index * 13}%` }} /></span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="kpi-grid">
          {[
            ["48", "Experiences"],
            ["31", "Venues"],
            ["126", "Hours explored"],
            ["92", "Avg vibe match"]
          ].map(([value, label], index) => (
            <ScrollReveal key={label} delay={index * 0.06}>
              <Kpi value={Number(value)} label={label} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </Page>
  );
}

function Kpi({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 38;
    const tick = () => {
      frame += 1;
      setCount(Math.round((value * frame) / total));
      if (frame < total) requestAnimationFrame(tick);
    };
    tick();
  }, [value]);

  return (
    <article className="glass-card kpi-card">
      <div className="kpi-icon">
        <Sparkles />
      </div>
      <b>{count}</b>
      <span>{label}</span>
      <svg viewBox="0 0 120 30" aria-hidden="true">
        <path d="M2 24 C 18 10, 28 14, 42 18 S 70 4, 88 12 S 106 27, 118 8" />
      </svg>
    </article>
  );
}

function Chat() {
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setTyping(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Page className="chat-screen">
      <Header eyebrow="AI Chat Agent" title="Loop AI" />
      <div className="quick-actions">
        {["Viral eats near me 🔥", "Kids day out 🎨", "Hidden speakeasies 🗝️", "Sunset hike 🌅", "Date night inspo 💕", "Surprise me 🎲"].map((chip) => (
          <motion.button whileTap={{ scale: 0.94 }} key={chip}>{chip}</motion.button>
        ))}
      </div>
      <div className="chat-log">
        {chatMessages.map((message, index) => (
          <motion.div
            key={message.text}
            initial={{ opacity: 0, x: message.from === "user" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.18 }}
            className={`chat-bubble ${message.from}`}
          >
            {message.from === "ai" ? <Typewriter text={message.text} /> : message.text}
          </motion.div>
        ))}
        {typing ? <TypingDots /> : <InlineVenueCard />}
      </div>
      <div className="chat-input">
        <VoiceButton />
        <span>Ask for a vibe, budget, neighborhood...</span>
        <button>
          <Send />
        </button>
      </div>
    </Page>
  );
}

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setShown(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [text]);
  return <>{shown}</>;
}

function TypingDots() {
  return (
    <div className="typing-dots">
      <span />
      <span />
      <span />
    </div>
  );
}

function InlineVenueCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="inline-card">
      <img src={venues[0].image} alt="" />
      <div>
        <b>Luma Rooftop</b>
        <span>94% vibe · 7:15 PM open</span>
      </div>
      <Link to="/venue/luma">
        <ChevronRight />
      </Link>
    </motion.div>
  );
}

function Profile() {
  const [tab, setTab] = useState("Preferences");
  return (
    <Page className="profile-screen">
      <section className="profile-hero">
        <div className="profile-avatar">TC</div>
        <h1>Tyrone Crossland</h1>
        <p>tyrone@example.com</p>
        <span>Premium ✨</span>
      </section>
      <div className="profile-links">
        <Link to="/bookings">Bookings</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/notifications">Alerts</Link>
      </div>
      <div className="segmented-tabs">
        {["Preferences", "History", "Settings"].map((item) => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      {tab === "Preferences" ? (
        <div className="chip-grid compact">
          {wizardCuisines.concat(wizardActivities.slice(0, 4)).map((item) => (
            <button className="choice-chip selected" key={item}>{item}</button>
          ))}
          <div className="glass-card budget-mini">Budget comfort: $180-$320</div>
        </div>
      ) : tab === "History" ? (
        <BookingList />
      ) : (
        <div className="settings-list">
          {["Google connected", "Apple connected", "Notification preferences", "Privacy and data", "Sign out"].map((item, index) => (
            <button key={item} className={index === 4 ? "danger" : ""}>
              <span>{index < 2 ? <ShieldCheck /> : index === 4 ? <ArrowLeft /> : <SlidersHorizontal />}</span>
              {item}
              {index < 2 ? <i /> : <ChevronRight />}
            </button>
          ))}
          <small>Loop v0.2.0</small>
        </div>
      )}
    </Page>
  );
}

function Bookings() {
  const [tab, setTab] = useState("Active");
  return (
    <Page className="portal-screen">
      <Header eyebrow="Customer portal" title="My Bookings" actions={<IconButton label="Back" to="/home"><ArrowLeft /></IconButton>} />
      <div className="segmented-tabs">
        {["Active", "Past", "Cancelled"].map((item) => (
          <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>
        ))}
      </div>
      <BookingList modification />
    </Page>
  );
}

function BookingList({ modification = false }: { modification?: boolean }) {
  return (
    <div className="booking-list">
      {venues.map((venue, index) => (
        <ScrollReveal key={venue.name} delay={index * 0.06} className="booking-card">
          <img src={venue.image} alt="" />
          <div>
            <b>{venue.name}</b>
            <span>May {12 + index}, 7:{index}5 PM · Party of {index + 2}</span>
            <small className={index === 2 ? "past" : "active"}>{index === 2 ? "Completed" : "Upcoming"}</small>
          </div>
          {modification ? <button className="modify-chip">Modify</button> : null}
        </ScrollReveal>
      ))}
      {modification ? (
        <ScrollReveal className="mod-sheet-preview">
          <h3>Booking Modifications</h3>
          <div className="form-row">Party size <b>4</b></div>
          <div className="form-row">Time change <b>8:00 PM</b></div>
          <div className="form-row">Special request <b>Window table</b></div>
          <GradientButton wide>Confirm Changes</GradientButton>
        </ScrollReveal>
      ) : null}
    </div>
  );
}

function Favorites() {
  return (
    <Page className="favorites-screen">
      <Header eyebrow="Saved venues" title="Favorites" actions={<IconButton label="Back" to="/home"><ArrowLeft /></IconButton>} />
      <div className="masonry-grid">
        {venues.concat(venues).map((venue, index) => (
          <motion.article whileTap={{ scale: 0.96 }} key={`${venue.name}-${index}`} className="favorite-tile">
            <img src={venue.image} alt="" />
            <Heart fill="currentColor" />
            <b>{venue.name}</b>
          </motion.article>
        ))}
      </div>
    </Page>
  );
}

function Notifications() {
  return (
    <Page className="notifications-screen">
      <Header eyebrow="Notification center" title="Alerts" actions={<IconButton label="Back" to="/home"><ArrowLeft /></IconButton>} />
      {["Luma Rooftop has a 7:15 PM table open.", "Your group voted yes on Neon Library.", "Traffic shifted: leave 8 minutes earlier."].map((item, index) => (
        <motion.article drag="x" dragConstraints={{ left: -80, right: 0 }} whileTap={{ scale: 0.98 }} className={`notification ${index === 0 ? "unread" : ""}`} key={item}>
          <Bell />
          <div>
            <b>{item}</b>
            <span>{index + 2} min ago</span>
          </div>
        </motion.article>
      ))}
    </Page>
  );
}

function Discover() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = [
    { id: "all", label: "All" },
    { id: "trending-food", label: "🔥 Viral Eats" },
    { id: "hidden-gems", label: "🗝️ Hidden Gems" },
    { id: "kids", label: "🎨 Kids" },
    { id: "outdoor", label: "🌅 Outdoor" },
    { id: "date-night", label: "💕 Date Night" },
    { id: "nightlife", label: "🌙 Nightlife" }
  ];
  const filtered = activeFilter === "all" ? venues : venues.filter(v => v.category === activeFilter);

  return (
    <Page className="discover-screen">
      <Header eyebrow="What's trending locally" title="Discover" actions={<IconButton label="Back" to="/home"><ArrowLeft /></IconButton>} />
      <ScrollReveal className="discover-filters">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            whileTap={{ scale: 0.94 }}
            className={`filter-chip ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </motion.button>
        ))}
      </ScrollReveal>
      <ScrollReveal className="glass-card trending-banner" delay={0.04}>
        <div className="banner-content">
          <TrendingUp />
          <div>
            <h3>Trending on TikTok Near You</h3>
            <p>Smash burgers, birria everything, hidden speakeasies, and sunset hikes are blowing up in your area right now.</p>
          </div>
        </div>
      </ScrollReveal>
      <div className="discover-grid">
        {filtered.map((venue, index) => (
          <ScrollReveal key={venue.id} delay={index * 0.05}>
            <motion.article
              whileTap={{ scale: 0.96 }}
              className="discover-card"
              onClick={() => navigate(`/venue/${venue.id}`)}
            >
              <img src={venue.image} alt="" />
              {venue.tags.includes("TikTok Viral") || venue.tags.includes("TikTok Famous") || venue.tags.includes("TikTok Trail") || venue.tags.includes("Viral") ? (
                <div className="viral-badge">Trending</div>
              ) : null}
              {venue.category === "kids" ? (
                <div className="viral-badge kids-badge">Kid Friendly</div>
              ) : null}
              <div className="discover-card-info">
                <b>{venue.name}</b>
                <span>{venue.type}</span>
                <div className="discover-meta">
                  <span><MapPin />{venue.area}</span>
                  <span>{venue.price}</span>
                  <span><Star fill="currentColor" />{venue.rating}</span>
                </div>
                <div className="tag-row">
                  {venue.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal className="glass-card venue-room" delay={0.1}>
        <h3>Live from the Community</h3>
        <p><ShieldCheck /> Verified visitors are sharing live wait times at Smash Stack.</p>
        <div className="vote-row">
          <button>👍 34</button>
          <button>👎 1</button>
          <span><i style={{ width: "96%" }} /></span>
        </div>
      </ScrollReveal>
      <div className="activity-feed">
        {[
          "Maya found a hidden speakeasy entrance",
          "Chris took the kids to Discovery Zone gem dig",
          "Dana posted a sunset trail photo from Great Falls",
          "Jules went viral eating birria at Birria Boss",
          "Kai did paint & sip date night at Pour & Paint"
        ].map((activity, index) => (
          <ScrollReveal key={activity} delay={index * 0.05} className="activity-card">
            <div className="avatar">{activity[0]}</div>
            <div>
              <b>{activity}</b>
              <span>{index + 2} min ago</span>
            </div>
            <img src={venues[(index + 3) % venues.length].image} alt="" />
          </ScrollReveal>
        ))}
      </div>
    </Page>
  );
}

function TabBar() {
  const location = useLocation();
  return (
    <nav className="tab-bar">
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = location.pathname === path;
        return (
          <Link key={path} to={path} className={active ? "active" : ""}>
            <motion.span animate={{ scale: active ? 1.15 : 1 }} whileTap={{ scale: 0.88 }}>
              <Icon />
            </motion.span>
            <small>{label}</small>
            {active ? <motion.i layoutId="tab-dot" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

function InstallPrompt({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="install-prompt">
      <Sparkles />
      <span>Add Loop to your Home Screen</span>
      <button onClick={onClose}>Later</button>
    </motion.div>
  );
}

function ParticleBurst() {
  return (
    <span className="particle-burst">
      {Array.from({ length: 10 }).map((_, index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </span>
  );
}

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 42 }).map((_, index) => (
        <span key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

export default App;
