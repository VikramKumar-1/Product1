import { useState, useEffect, useRef } from "react";

// ── Scroll Reveal ───────────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useReveal(delay);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)`,
    }}>
      {children}
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
const SERVICES = [
  { emoji: "🔧", label: "Plumber",       sub: "Expert Repairs",       color: "#2563eb", light: "#eff6ff", border: "#bfdbfe" },
  { emoji: "⚡", label: "Electrician",   sub: "Electrical Solutions",  color: "#d97706", light: "#fffbeb", border: "#fde68a" },
  { emoji: "🔩", label: "Mechanic",      sub: "Auto Care",             color: "#059669", light: "#ecfdf5", border: "#a7f3d0" },
  { emoji: "🔴", label: "Gas Cylinder",  sub: "Quick Delivery",        color: "#dc2626", light: "#fef2f2", border: "#fecaca" },
  { emoji: "🏠", label: "Carpenter",     sub: "Home Woodwork",         color: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe" },
  { emoji: "🧹", label: "Cleaning",      sub: "Deep Clean",            color: "#0891b2", light: "#ecfeff", border: "#a5f3fc" },
  { emoji: "🎨", label: "Painter",       sub: "Wall Solutions",        color: "#be185d", light: "#fdf2f8", border: "#fbcfe8" },
  { emoji: "📦", label: "Packers",       sub: "Move Anywhere",         color: "#92400e", light: "#fef3c7", border: "#fde68a" },
];

const ROOMS = [
  { name: "Cozy Studio in Mumbai",      city: "Mumbai",    price: 1200, rating: 4.6, reviews: 120, badge: "New",     bc: "#059669", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80", tags: ["WiFi","AC","Kitchen"] },
  { name: "Luxury Apartment in Delhi",  city: "Delhi",     price: 2500, rating: 4.8, reviews: 85,  badge: "Popular", bc: "#d97706", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", tags: ["WiFi","Gym","Pool"] },
  { name: "Budget Room in Bangalore",   city: "Bangalore", price: 800,  rating: 4.3, reviews: 60,  badge: "Budget",  bc: "#2563eb", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", tags: ["WiFi","AC"] },
  { name: "Seaside Villa in Goa",       city: "Goa",       price: 3500, rating: 4.9, reviews: 45,  badge: "Premium", bc: "#7c3aed", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80", tags: ["Pool","Beach","Chef"] },
];

const STEPS = [
  { n: "1", icon: "🔍", title: "Search & Select",  desc: "Find Services or Rooms",    color: "#2563eb" },
  { n: "2", icon: "📅", title: "Book Your Slot",    desc: "Choose Date & Time",        color: "#7c3aed" },
  { n: "3", icon: "✅", title: "Get it Done!",      desc: "Service at Your Doorstep",  color: "#059669" },
];

const TESTIMONIALS = [
  { name: "Rahul Mehta",  city: "Mumbai",    service: "Plumber",      stars: 5, text: "Great service! The plumber was on time and fixed everything quickly. Highly recommend CityMate!",        av: "RM", color: "#2563eb" },
  { name: "Priya Sharma", city: "Pune",      service: "Room Booking", stars: 5, text: "Booked a Goa villa for our anniversary — seamless check-in, beautiful property. Best experience ever!",   av: "PS", color: "#7c3aed" },
  { name: "Anil Kumar",   city: "Hyderabad", service: "Electrician",  stars: 4, text: "The electrician was professional, transparent with pricing and finished the job fast. Very impressed.",   av: "AK", color: "#059669" },
];

const CITIES = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Pune","Kolkata","Jaipur","Goa","Ahmedabad","Lucknow","Surat"];

// ── Room Card ───────────────────────────────────────────────────────────────
function RoomCard({ r, delay }: { r: typeof ROOMS[0]; delay: number }) {
  const [fav, setFav] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "#fff", borderRadius: 18, overflow: "hidden",
          border: `1.5px solid ${hov ? "#bfdbfe" : "#f1f5f9"}`,
          boxShadow: hov ? "0 20px 56px rgba(37,99,235,0.13)" : "0 2px 10px rgba(0,0,0,0.06)",
          transform: hov ? "translateY(-7px)" : "none",
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", cursor: "pointer",
        }}
      >
        <div style={{ position: "relative", height: 185, overflow: "hidden" }}>
          <img src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.38) 0%,transparent 55%)" }} />
          <span style={{ position: "absolute", top: 12, left: 12, background: r.bc, color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.05em" }}>{r.badge}</span>
          <span style={{ position: "absolute", top: 12, right: 44, background: "rgba(255,255,255,0.93)", color: "#059669", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 12 }}>✓ Verified</span>
          <button onClick={() => setFav(f => !f)} style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "transform 0.2s", transform: fav ? "scale(1.2)" : "scale(1)" }}>
            {fav ? "❤️" : "🤍"}
          </button>
        </div>
        <div style={{ padding: "14px 16px 16px" }}>
          <p style={{ fontWeight: 800, fontSize: 14, color: "#0f172a", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</p>
          <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>📍 {r.city}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {r.tags.map(t => <span key={t} style={{ fontSize: 11, color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "2px 8px", borderRadius: 6, fontWeight: 500 }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>
            <div>
              <span style={{ fontWeight: 900, fontSize: 19, color: "#0f172a" }}>₹{r.price.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 2 }}>/night</span>
            </div>
            <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700 }}>⭐ {r.rating} <span style={{ color: "#cbd5e1", fontWeight: 400 }}>({r.reviews})</span></div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── Service Card ────────────────────────────────────────────────────────────
function ServiceCard({ svc, delay }: { svc: typeof SERVICES[0]; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? svc.light : "#fafafa",
          border: `1.5px solid ${hov ? svc.border : "#f1f5f9"}`,
          borderRadius: 16, padding: "22px 18px", cursor: "pointer", position: "relative", overflow: "hidden",
          transform: hov ? "translateY(-5px)" : "none",
          boxShadow: hov ? `0 16px 40px ${svc.color}18` : "0 1px 4px rgba(0,0,0,0.04)",
          transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ position: "absolute", top: 14, right: 14, fontSize: 15, color: hov ? svc.color : "#cbd5e1", transition: "all 0.25s", transform: hov ? "translate(2px,-2px)" : "none" }}>↗</div>
        <div style={{ fontSize: 30, marginBottom: 12, display: "inline-block", transition: "transform 0.3s", transform: hov ? "scale(1.18) rotate(-5deg)" : "none" }}>{svc.emoji}</div>
        <p style={{ fontWeight: 800, fontSize: 14.5, color: "#0f172a", marginBottom: 2 }}>{svc.label}</p>
        <p style={{ fontSize: 12, color: "#64748b", marginBottom: 12, fontWeight: 500 }}>{svc.sub}</p>
        <span style={{ fontSize: 10.5, color: "#059669", fontWeight: 700, background: "#ecfdf5", padding: "3px 8px", borderRadius: 6 }}>✓ Verified</span>
      </div>
    </Reveal>
  );
}

// ── Main Export ─────────────────────────────────────────────────────────────
export default function CityMateMain() {
  const [query, setQuery]             = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [filter, setFilter]           = useState("All");
  const [activeCity, setActiveCity]   = useState("Mumbai");
  const [tIdx, setTIdx]               = useState(0);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);

  // Counters
  useEffect(() => {
    const go = (target: number, set: (n: number) => void) => {
      let v = 0;
      const step = Math.ceil(target / 55);
      const t = setInterval(() => { v = Math.min(v + step, target); set(v); if (v >= target) clearInterval(t); }, 28);
    };
    const to = setTimeout(() => { go(50000, setC1); go(12000, setC2); go(200, setC3); }, 400);
    return () => clearTimeout(to);
  }, []);

  // Testimonial auto-cycle
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % 3), 4500);
    return () => clearInterval(t);
  }, []);

  const filteredRooms = filter === "All" ? ROOMS
    : filter === "Budget" ? ROOMS.filter(r => r.price <= 1000)
    : filter === "Luxury" ? ROOMS.filter(r => r.price >= 2500)
    : ROOMS;

  return (
    <div style={{ background: "#f8fafc", fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", color: "#0f172a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::placeholder{color:#94a3b8;}
        input,select,button{font-family:inherit;}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fdDown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fdUp  {from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.7)}}
        @keyframes floatIcon{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes tFadeIn {from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "90px 20px 64px", textAlign: "center" }}>
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80" alt="city" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.42) saturate(1.3)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(10,20,50,0.5) 0%,rgba(10,20,50,0.55) 55%,rgba(10,20,50,0.88) 100%)" }} />
          {/* Subtle grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, width: "100%" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.18)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 50, padding: "6px 18px", marginBottom: 28, backdropFilter: "blur(8px)", animation: "fdDown 0.6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#60a5fa", display: "inline-block", animation: "pulseDot 2s ease infinite" }} />
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.12em" }}>India's #1 City Platform</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(2.4rem,6vw,4.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 18, animation: "fdDown 0.6s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}>
            Find{" "}
            <span style={{ backgroundImage: "linear-gradient(130deg,#60a5fa 0%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Rooms &amp; Services
            </span>
            <br />in Your City
          </h1>

          <p style={{ fontSize: "clamp(1rem,2vw,1.13rem)", color: "rgba(255,255,255,0.62)", lineHeight: 1.68, marginBottom: 36, animation: "fdDown 0.6s 0.18s ease both", opacity: 0, animationFillMode: "forwards" }}>
            Your one-stop platform for rooms, local services &amp; everything your city has to offer.
          </p>

          {/* Search — white pill identical to your reference */}
          <div style={{ animation: "fdDown 0.6s 0.28s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div style={{
              display: "flex", alignItems: "center", background: "#fff", borderRadius: 50,
              padding: "6px 6px 6px 20px", maxWidth: 540, margin: "0 auto",
              border: searchFocused ? "2px solid #3b82f6" : "2px solid transparent",
              boxShadow: searchFocused ? "0 0 0 4px rgba(59,130,246,0.18),0 20px 60px rgba(0,0,0,0.32)" : "0 16px 56px rgba(0,0,0,0.28)",
              transition: "all 0.25s",
            }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginRight: 8 }}>📍</span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Enter your Pincode or City"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: "#0f172a", fontWeight: 500, background: "transparent" }}
              />
              <button style={{ flexShrink: 0, background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", border: "none", borderRadius: 50, padding: "13px 28px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 4px 18px rgba(37,99,235,0.45)", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
                🔍 Search
              </button>
            </div>
          </div>

          {/* Quick chips */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 18, animation: "fdDown 0.6s 0.38s ease both", opacity: 0, animationFillMode: "forwards" }}>
            {["Plumber near me","Rooms in Delhi","Rooms in Goa","Electrician","AC Repair"].map(c => (
              <button key={c} onClick={() => setQuery(c)} style={{ padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.18)", cursor: "pointer", backdropFilter: "blur(6px)", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.28)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 760, marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, animation: "fdUp 0.7s 0.5s ease both", opacity: 0, animationFillMode: "forwards" }}>
          {[
            { v: `${Math.round(c1/1000)}K+`,  l: "Happy Users" },
            { v: `${Math.round(c2/1000)}K+`,  l: "Verified Pros" },
            { v: `${c3}+`,                    l: "Cities" },
            { v: "4.8 ★",                     l: "Avg Rating" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "18px 10px", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: i===0?"12px 0 0 12px":i===3?"0 12px 12px 0":0 }}>
              <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.65rem)", fontWeight: 900, color: "#fff" }}>{s.v}</p>
              <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.09em", marginTop: 3, fontWeight: 600 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TRUST STRIP ══════════════════════════════════════════ */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "13px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, alignItems: "center", animation: "marquee 28s linear infinite", width: "max-content" }}>
          {[...Array(2)].flatMap(() => ["Trusted by 50,000+ Users","◆","Verified Professionals","◆","Instant Booking","◆","200+ Cities","◆","Same-Day Service","◆","₹0 Platform Fee","◆"]).map((x, i) => (
            <span key={i} style={{ fontSize: x==="◆"?9:11.5, fontWeight: 700, color: x==="◆"?"#e2e8f0":"#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{x}</span>
          ))}
        </div>
      </div>

      {/* ══ POPULAR SERVICES ════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 5% 88px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2, display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.16em" }}>Services</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.1 }}>Popular Services</h2>
                <p style={{ color: "#64748b", fontSize: 14.5, marginTop: 7 }}>Certified professionals at your doorstep, available 24/7</p>
              </div>
              <a href="#" style={{ fontSize: 14, fontWeight: 700, color: "#2563eb", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "gap 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.gap="10px")} onMouseLeave={e=>(e.currentTarget.style.gap="5px")}>
                View All Services →
              </a>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
            {SERVICES.map((svc, i) => <ServiceCard key={svc.label} svc={svc} delay={i * 55} />)}
          </div>
        </div>
      </section>

      {/* ══ FEATURED ROOMS ══════════════════════════════════════ */}
      <section style={{ background: "#f8fafc", padding: "80px 5% 88px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2, display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.16em" }}>Stays</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.025em" }}>Featured Rooms</h2>
                <p style={{ color: "#64748b", fontSize: 14.5, marginTop: 7 }}>Handpicked verified stays across India's top cities</p>
              </div>
              <a href="#" style={{ fontSize: 14, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>View All Rooms &gt;</a>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {["All","Budget","Luxury","Villas"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 20px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: filter===f?"1.5px solid #2563eb":"1.5px solid #e2e8f0", background: filter===f?"#eff6ff":"#fff", color: filter===f?"#2563eb":"#64748b", transition: "all 0.2s" }}>
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 22 }}>
            {filteredRooms.map((r, i) => <RoomCard key={r.name} r={r} delay={i * 75} />)}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 5% 88px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.16em" }}>Process</span>
              <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2 }} />
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 10 }}>How It Works</h2>
            <p style={{ color: "#64748b", fontSize: 14.5, maxWidth: 400, margin: "0 auto 52px" }}>Book a service or room in under 2 minutes. No calls, no queues.</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, position: "relative" }}>
            <div style={{ position: "absolute", top: 44, left: "20%", right: "20%", height: 2, background: "linear-gradient(90deg,#2563eb,#7c3aed,#059669)", borderRadius: 2, zIndex: 0 }} />
            {STEPS.map((step, i) => {
              const [h, setH] = useState(false);
              return (
                <Reveal key={step.n} delay={i * 100}>
                  <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h?"#fff":"#fafafa", border: `1.5px solid ${h?"#bfdbfe":"#f1f5f9"}`, borderRadius: 20, padding: "30px 22px 26px", position: "relative", zIndex: 1, transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", transform: h?"translateY(-5px)":"none", boxShadow: h?"0 16px 40px rgba(37,99,235,0.1)":"0 1px 6px rgba(0,0,0,0.05)", textAlign: "center" }}>
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontWeight: 900, fontSize: 18, color: "#fff", boxShadow: `0 6px 18px ${step.color}45`, position: "relative", zIndex: 2 }}>{step.n}</div>
                    <div style={{ fontSize: 36, marginBottom: 14, display: "inline-block", animation: "floatIcon 3s ease-in-out infinite" }}>{step.icon}</div>
                    <h3 style={{ fontWeight: 800, fontSize: 16.5, color: "#0f172a", marginBottom: 6 }}>{step.title}</h3>
                    <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CITIES ══════════════════════════════════════════════ */}
      <section style={{ background: "#f8fafc", padding: "72px 5%", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 38 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.16em" }}>Explore</span>
                <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2 }} />
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.025em" }}>Browse by City</h2>
              <p style={{ color: "#64748b", fontSize: 14.5, marginTop: 7 }}>Available across 200+ Indian cities</p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {CITIES.map((city, i) => (
              <Reveal key={city} delay={i * 35}>
                <button onClick={() => setActiveCity(city)} style={{ padding: "10px 20px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: activeCity===city?"1.5px solid #2563eb":"1.5px solid #e2e8f0", background: activeCity===city?"#eff6ff":"#fff", color: activeCity===city?"#2563eb":"#475569", boxShadow: activeCity===city?"0 4px 14px rgba(37,99,235,0.16)":"0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.2s" }}>
                  📍 {city}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "80px 5% 88px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 46 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.16em" }}>Reviews</span>
                <span style={{ width: 26, height: 3, background: "#2563eb", borderRadius: 2 }} />
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.025em" }}>What Our Customers Say</h2>
              <p style={{ color: "#64748b", fontSize: 14.5, marginTop: 7 }}>Real reviews from verified users across India</p>
            </div>
          </Reveal>

          {/* Carousel card */}
          <div style={{ position: "relative", minHeight: 240 }}>
            {TESTIMONIALS.map((t, i) => (
              i === tIdx && (
                <div key={t.name} style={{ background: "#fafafa", border: "1.5px solid #f1f5f9", borderRadius: 20, padding: "38px 44px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", animation: "tFadeIn 0.5s ease" }}>
                  <div style={{ width: 62, height: 62, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 18, fontWeight: 800, color: "#fff", boxShadow: `0 6px 20px ${t.color}42` }}>{t.av}</div>
                  <div style={{ color: "#f59e0b", fontSize: 17, marginBottom: 14, letterSpacing: 3 }}>{"★".repeat(t.stars)}</div>
                  <p style={{ fontSize: 15.5, color: "#334155", lineHeight: 1.75, fontStyle: "italic", marginBottom: 20, maxWidth: 500, margin: "0 auto 20px" }}>"{t.text}"</p>
                  <p style={{ fontWeight: 800, color: "#0f172a", fontSize: 14.5 }}>{t.name}</p>
                  <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 3 }}>{t.city} · {t.service}</p>
                </div>
              )
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 22 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{ width: i===tIdx?26:8, height: 8, borderRadius: 50, border: "none", cursor: "pointer", background: i===tIdx?"#2563eb":"#e2e8f0", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ APP DOWNLOAD ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#1d4ed8 100%)", padding: "68px 5%" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <Reveal>
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", marginBottom: 10 }}>Download the App</h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14.5, maxWidth: 380, marginBottom: 28, lineHeight: 1.65 }}>Get our app for easy booking on the go. Available on iOS and Android.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[{ icon: "🍎", label: "App Store", sub: "Download on the" }, { icon: "▶", label: "Google Play", sub: "Get it on" }].map(s => (
                  <button key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, background: "#000", border: "none", borderRadius: 12, padding: "12px 22px", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.35)", transition: "transform 0.2s" }}
                    onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="none")}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{s.sub}</p>
                      <p style={{ fontSize: 15, color: "#fff", fontWeight: 800 }}>{s.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["50K+","Downloads"],["4.9 ★","App Rating"],["200+","Cities"],["24/7","Support"]].map(([v,l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 20px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", minWidth: 120 }}>
                  <p style={{ fontWeight: 900, fontSize: 22, color: "#fff" }}>{v}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.09em", marginTop: 3, fontWeight: 600 }}>{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}