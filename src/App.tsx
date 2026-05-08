import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  Car,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Copy,
  Flame,
  Heart,
  Home as HomeIcon,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Moon,
  Navigation,
  Plus,
  RefreshCw,
  Route,
  Search,
  Send,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Utensils,
  WandSparkles,
  X
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
    rating: 4.8
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
    rating: 4.9
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
    rating: 4.7
  }
];

const moods = [
  ["Date Night", "rose", "Planning a velvet-booth date night..."],
  ["Rooftop", "blue", "Craving rooftop vibes..."],
  ["Crew", "purple", "Need a spot for the crew..."],
  ["Family", "orange", "Keeping it warm and easy..."],
  ["Surprise", "teal", "Surprise me with something rare..."]
];

const wizardCuisines = ["Japanese", "Modern American", "Thai", "Mediterranean", "Mexican", "Coastal", "Steakhouse", "Vegan"];
const wizardActivities = ["Rooftops", "Live music", "Chef table", "Hidden bars", "Gallery nights", "Family brunch", "Dancing", "Wellness"];

const stops = [
  { time: "6:30 PM", name: "Atelier Sol", detail: "Coastal tasting menu", travel: "12 min drive", dress: "Elevated casual", match: 91 },
  { time: "8:45 PM", name: "Luma Rooftop", detail: "Skyline cocktails", travel: "8 min ride", dress: "Statement jacket", match: 94 },
  { time: "10:30 PM", name: "Neon Library", detail: "Vinyl lounge nightcap", travel: "Walkable", dress: "Nightlife polish", match: 88 }
];

const chatMessages = [
  { from: "user", text: "Find me a bold date night with rooftop energy." },
  {
    from: "ai",
    text:
      "I found a 3-stop plan: coastal dinner at Atelier Sol, golden-hour drinks at Luma Rooftop, then Neon Library for a low-lit vinyl set."
  }
];

const tabs = [
  { path: "/home", label: "Home", icon: HomeIcon },
  { path: "/quick-idea", label: "Idea", icon: Sparkles },
  { path: "/itinerary", label: "Plan", icon: Route },
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
            <RouterRoute path="/itinerary" element={<Itinerary />} />
            <RouterRoute path="/venue/:id" element={<VenueDetail />} />
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
            <Sparkles />
          </div>
          <h1>AI Lifestyle Concierge</h1>
          <p>Dining, nightlife, and city moments tuned to your mood.</p>
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
          <span onClick={() => (step === 2 ? navigate("/home") : setStep(step + 1))}>{step === 2 ? "Enter Concierge" : "Continue"}</span>
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
      <div className="home-grid">
        <ScrollReveal className="glass-card featured-plan">
          <div className="card-topline">
            <span>AI plan ready</span>
            <span>94% vibe</span>
          </div>
          <h3>Rooftop dinner into vinyl lounge</h3>
          <p>Three stops, smooth travel, smart departure, and a table that still has 7:15 PM inventory.</p>
          <GradientButton to="/itinerary">Build Itinerary</GradientButton>
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
        <GradientButton to="/itinerary">
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

function Itinerary() {
  const [count, setCount] = useState(3);
  return (
    <Page className="itinerary-screen">
      <Header eyebrow="Multi-stop timeline" title="Your night, sequenced" />
      <ScrollReveal className="stop-selector">
        {[2, 3, 4].map((value) => (
          <motion.button whileTap={{ scale: 0.92 }} key={value} className={count === value ? "active" : ""} onClick={() => setCount(value)}>
            {value} stops
          </motion.button>
        ))}
      </ScrollReveal>
      <div className="timeline">
        {stops.slice(0, count).map((stop, index) => (
          <ScrollReveal key={stop.name} delay={index * 0.08} className="timeline-item">
            <div className="timeline-dot">{index + 1}</div>
            <motion.article layout whileTap={{ scale: 0.98 }} className="glass-card stop-card">
              <div className="drag-handle">
                <Menu />
              </div>
              <img src={venues[index % venues.length].image} alt="" />
              <div>
                <span>{stop.time}</span>
                <h3>{stop.name}</h3>
                <p>{stop.detail}</p>
                <div className="stop-meta">
                  <span>{stop.dress}</span>
                  <span>{stop.match}%</span>
                </div>
              </div>
              <div className="travel-chip">
                {stop.travel === "Walkable" ? <Navigation /> : <Car />}
                {stop.travel}
              </div>
            </motion.article>
          </ScrollReveal>
        ))}
      </div>
      <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="floating-bookbar">
        <div>
          <b>$340</b>
          <span>3h 45m</span>
        </div>
        <GradientButton to="/confirmation">Confirm & Book All</GradientButton>
      </motion.div>
    </Page>
  );
}

function VenueDetail() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const venue = venues[0];

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
          <InfoSection title="Parking Intel" icon={<Car />}>
            <AccordionLine title="Best garage" value="4 min walk · $18 after 6 PM" />
            <AccordionLine title="Street odds" value="Medium before 7 PM, low after" />
            <div className="map-placeholder">
              <MapPin />
              Smart parking map
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
  return (
    <Page className="confirmation-screen">
      <Confetti />
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 150, damping: 16 }} className="success-mark">
        <Check />
      </motion.div>
      <h1>Booked. The night is yours.</h1>
      <p>Your AI concierge locked the route, reservations, and departure timing.</p>
      <ScrollReveal className="glass-card code-card">
        <span>Confirmation code</span>
        <b>AILC-7X42</b>
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
      <div className="dual-actions">
        <button className="outline-gradient">Add to Calendar</button>
        <GradientButton>Share with Group</GradientButton>
      </div>
      <Link to="/home" className="countdown-link">
        <span />
        Back to Home
      </Link>
    </Page>
  );
}

function Passport() {
  const [tab, setTab] = useState("Stamps");
  const stamps = ["Dining", "Nightlife", "Adventure", "Cultural", "Hidden Gem", "Rooftop"];
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
          {["Night Owl", "Chef's Counter", "Rooftop Regular", "Culture Curator"].map((badge, index) => (
            <ScrollReveal key={badge} delay={index * 0.06} className={`glass-card badge-card ${index === 3 ? "locked" : ""}`}>
              <div className="badge-emoji">{index === 3 ? <Lock /> : "✨"}</div>
              <div>
                <h3>{badge}</h3>
                <p>{index === 3 ? "Visit two gallery nights to unlock." : "Progress toward your next city milestone."}</p>
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
      <Header eyebrow="AI Chat Agent" title="Concierge" />
      <div className="quick-actions">
        {["Date night ideas ✨", "What's trending 🔥", "Surprise me 🎲"].map((chip) => (
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
          <small>AI Lifestyle Concierge v0.1.0</small>
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
  return (
    <Page className="discover-screen">
      <Header eyebrow="Community & social" title="Discover" actions={<IconButton label="Back" to="/home"><ArrowLeft /></IconButton>} />
      <ScrollReveal className="glass-card venue-room">
        <h3>Venue Chat Room</h3>
        <p><ShieldCheck /> Verified visitors are sharing live wait times at Luma Rooftop.</p>
        <div className="vote-row">
          <button>👍 18</button>
          <button>👎 2</button>
          <span><i style={{ width: "88%" }} /></span>
        </div>
      </ScrollReveal>
      <div className="activity-feed">
        {["Maya earned Night Owl", "Chris just visited Atelier Sol", "Dana posted a live photo from Neon Library"].map((activity, index) => (
          <ScrollReveal key={activity} delay={index * 0.06} className="activity-card">
            <div className="avatar">{activity[0]}</div>
            <div>
              <b>{activity}</b>
              <span>{index + 4} min ago</span>
            </div>
            <img src={venues[index % venues.length].image} alt="" />
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
      <span>Add AI Concierge to your Home Screen</span>
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
