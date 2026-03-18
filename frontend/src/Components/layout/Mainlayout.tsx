import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  IconChevronRight, IconStar, IconMapPin, IconBolt,
  IconHome, IconTools, IconBus, IconToolsKitchen2, IconUsers, IconShieldCheck,
  IconTrendingUp,
} from "@tabler/icons-react";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const SERVICES = [
  { id: "cleaning",    label: "Cleaning",     emoji: "🧹", color: "#3b82f6" },
  { id: "plumbing",    label: "Plumbing",     emoji: "🔧", color: "#6366f1" },
  { id: "electrician", label: "Electrician",  emoji: "⚡", color: "#f59e0b" },
  { id: "ac",          label: "AC Repair",    emoji: "❄️", color: "#0ea5e9" },
  { id: "salon",       label: "Salon",        emoji: "💇", color: "#ec4899" },
  { id: "pest",        label: "Pest Control", emoji: "🛡️", color: "#10b981" },
  { id: "laundry",     label: "Laundry",      emoji: "👕", color: "#3b82f6" },
  { id: "carpentry",   label: "Carpentry",    emoji: "🪚", color: "#8b5cf6" },
];

const QUICK_CATS = [
  { id: "rooms",    label: "Rooms & PG",    sub: "Verified Stays",  icon: <IconHome size={22} />,           color: "#2563eb", bg: "#eff6ff" },
  { id: "services", label: "Home Services", sub: "Expert Help",     icon: <IconTools size={22} />,          color: "#4f46e5", bg: "#eef2ff" },
  { id: "transport",label: "Transport",     sub: "Cabs & More",     icon: <IconBus size={22} />,            color: "#059669", bg: "#ecfdf5" },
  { id: "food",     label: "Food Delivery", sub: "Top Rated",       icon: <IconToolsKitchen2 size={22} />,  color: "#d97706", bg: "#fffbeb" },
];

const LISTINGS = [
  { id: 1, tag: "Premium",  tagBg: "#eff6ff", tagColor: "#2563eb", title: "Modern 2BHK Apartment",    city: "Khatima", price: "₹15,000", per: "/mo", rating: "4.8", reviews: 128, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
  { id: 2, tag: "Verified", tagBg: "#f5f3ff", tagColor: "#7c3aed", title: "Luxury Girls PG",          city: "Delhi",   price: "₹8,500",  per: "/mo", rating: "4.6", reviews: 84,  img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80" },
  { id: 3, tag: "Popular",  tagBg: "#ecfdf5", tagColor: "#059669", title: "Professional Cleaning",    city: "Mumbai",  price: "₹499",    per: "",    rating: "4.9", reviews: 216, img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" },
  { id: 4, tag: "Top Pick", tagBg: "#fffbeb", tagColor: "#d97706", title: "Healthy Home Meals",       city: "Pune",    price: "₹120",    per: "",    rating: "4.7", reviews: 97,  img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
];

const TRUST_STATS = [
  { icon: <IconUsers size={20} />,       value: "2M+",  label: "Happy Users",     color: "#2563eb" },
  { icon: <IconShieldCheck size={20} />, value: "100%", label: "Verified Partners",color: "#16a34a" },
  { icon: <IconTrendingUp size={20} />,  value: "15K+", label: "Active Partners",  color: "#7c3aed" },
  { icon: <IconStar size={20} />,        value: "4.8★", label: "Average Rating",   color: "#d97706" },
];

/* ══════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --blue: #2563eb;
    --blue-light: #eff6ff;
    --blue-border: #dbeafe;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    --border: #e5e7eb;
    --surface: #f9fafb;
    --white: #ffffff;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-2xl: 24px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.07);
    --shadow-blue: 0 4px 20px rgba(37,99,235,0.22);
  }

  /* ── Animations ── */
  @keyframes ml-fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ml-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes ml-pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }

  /* ── Card hover ── */
  .ml-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-2xl);
    transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s, border-color .25s;
    cursor: pointer;
  }
  .ml-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(0,0,0,0.09);
    border-color: #93c5fd;
  }

  .ml-svc-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 14px 10px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    text-decoration: none;
    transition: transform .2s cubic-bezier(.16,1,.3,1), box-shadow .2s, border-color .2s;
  }
  .ml-svc-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
    border-color: #93c5fd;
  }

  .ml-cat-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 20px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer;
    transition: transform .2s cubic-bezier(.16,1,.3,1), box-shadow .2s, border-color .2s;
  }
  .ml-cat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.08);
    border-color: #93c5fd;
  }

  /* ── Book button ── */
  .ml-book-btn {
    padding: 8px 18px;
    background: var(--text-primary);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 700;
    font-size: 12.5px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background .2s, transform .2s;
  }
  .ml-book-btn:hover { background: var(--blue); transform: translateY(-1px); }

  /* ── Grids ── */
  .ml-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
  .ml-grid-8 { display: grid; grid-template-columns: repeat(8,1fr); gap: 10px; }
  .ml-grid-4stat { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }

  /* ── Section wrapper ── */
  .ml-section { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  /* ── See-all btn ── */
  .ml-see-all {
    background: none; border: 1.5px solid var(--border);
    color: var(--blue); font-weight: 700; font-size: 13.5px;
    cursor: pointer; display: flex; align-items: center; gap: 4px;
    padding: 8px 16px; border-radius: var(--radius-sm);
    font-family: 'Inter', sans-serif; transition: all .2s;
  }
  .ml-see-all:hover { background: var(--blue-light); border-color: var(--blue-border); }

  /* ── Partner banner CTA ── */
  .ml-partner-btn {
    background: var(--blue); color: #fff; border: none;
    padding: 14px 28px; border-radius: var(--radius-md);
    font-weight: 700; font-size: 15px; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: inline-flex; align-items: center; gap: 8px;
    transition: background .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 4px 18px rgba(37,99,235,.35);
  }
  .ml-partner-btn:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,99,235,.45); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .ml-grid-8   { grid-template-columns: repeat(4,1fr); }
    .ml-grid-4   { grid-template-columns: repeat(2,1fr); }
    .ml-grid-4stat { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 640px) {
    .ml-grid-8   { grid-template-columns: repeat(4,1fr); gap: 8px; }
    .ml-grid-4   { grid-template-columns: repeat(1,1fr); }
    .ml-grid-4stat { grid-template-columns: repeat(2,1fr); gap: 10px; }
    .ml-section  { padding: 0 16px; }
    .ml-partner-inner { flex-direction: column !important; text-align: center; }
    .ml-partner-text  { max-width: 100% !important; }
    .ml-section-title { font-size: 22px !important; }
    .ml-listing-img   { height: 170px !important; }
    .ml-partner-wrap  { padding: 36px 24px !important; border-radius: 20px !important; }
  }
`;

/* ══════════════════════════════════════════
   SECTION HEADING
══════════════════════════════════════════ */
function SectionHeading({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
      <div>
        <h2 className="ml-section-title" style={{ fontSize: "26px", fontWeight: 800, color: "var(--text-primary)", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-.6px" }}>{title}</h2>
        {sub && <p style={{ color: "var(--text-secondary)", marginTop: "5px", fontSize: "14px", margin: "5px 0 0" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN LAYOUT
══════════════════════════════════════════ */
export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{STYLES}</style>

      {/* ─────────────────────────────────────
          1. TRENDING SERVICES STRIP
      ───────────────────────────────────── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="ml-section">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconBolt size={18} color="#2563eb" fill="#2563eb" />
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-secondary)" }}>Trending Services</span>
            </div>
            <button className="ml-see-all" onClick={() => navigate("/services")}>
              All Services <IconChevronRight size={15} />
            </button>
          </div>
          <div className="ml-grid-8">
            {SERVICES.map(s => (
              <Link key={s.id} to={`/services/${s.id}`} className="ml-svc-card">
                <div style={{ width: "46px", height: "46px", background: `${s.color}12`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                  {s.emoji}
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", textAlign: "center", lineHeight: 1.3 }}>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          2. EXPLORE CATEGORIES
      ───────────────────────────────────── */}
      <div style={{ padding: "56px 0 0" }}>
        <div className="ml-section">
          <SectionHeading title="Explore Categories" sub="Find exactly what you need" />
          <div className="ml-grid-4">
            {QUICK_CATS.map(cat => (
              <div key={cat.id} className="ml-cat-card" onClick={() => navigate(`/${cat.id}`)}>
                <div style={{ width: "50px", height: "50px", background: cat.bg, color: cat.color, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{cat.label}</h4>
                  <p style={{ margin: "3px 0 0", fontSize: "12.5px", color: "var(--text-muted)" }}>{cat.sub}</p>
                </div>
                <div style={{ marginLeft: "auto", color: "var(--text-muted)", flexShrink: 0 }}>
                  <IconChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          3. TRUST STATS BAR
      ───────────────────────────────────── */}
      <div style={{ padding: "48px 0 0" }}>
        <div className="ml-section">
          <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "24px 28px" }}>
            <div className="ml-grid-4stat">
              {TRUST_STATS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${s.color}12`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.value}</p>
                    <p style={{ margin: "1px 0 0", fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          4. FEATURED LISTINGS
      ───────────────────────────────────── */}
      <div style={{ padding: "56px 0 0" }}>
        <div className="ml-section">
          <SectionHeading
            title="Featured for You"
            sub="Handpicked top-rated stays and services"
            action={
              <button className="ml-see-all" onClick={() => navigate("/listings")}>
                See All <IconChevronRight size={15} />
              </button>
            }
          />
          <div className="ml-grid-4">
            {LISTINGS.map(item => (
              <div key={item.id} className="ml-card" style={{ overflow: "hidden" }}>
                {/* Image */}
                <div className="ml-listing-img" style={{ position: "relative", height: "195px" }}>
                  <img src={item.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={item.title} />
                  {/* Gradient bottom */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(0,0,0,.4), transparent)" }} />
                  {/* Tag */}
                  <div style={{ position: "absolute", top: "10px", left: "10px", background: item.tagBg, color: item.tagColor, padding: "3px 10px", borderRadius: "100px", fontSize: "10.5px", fontWeight: 800, backdropFilter: "blur(4px)" }}>
                    {item.tag}
                  </div>
                  {/* Rating */}
                  <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)", padding: "3px 8px", borderRadius: "7px", display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>
                    <IconStar size={12} fill="#f59e0b" color="#f59e0b" /> {item.rating}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "11.5px", marginBottom: "6px" }}>
                    <IconMapPin size={12} /> {item.city} · {item.reviews} reviews
                  </div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "14px", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.3, margin: "0 0 14px" }}>{item.title}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "17px", fontWeight: 800, color: "var(--blue)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.price}</span>
                      {item.per && <span style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 500 }}>{item.per}</span>}
                    </div>
                    <button className="ml-book-btn">Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ─────────────────────────────────────
          OUTLET
      ───────────────────────────────────── */}
      <div className="ml-section" style={{ paddingBottom: "40px" }}>
        <Outlet />
      </div>
    </div>
  );
}