import { useState, useEffect, useRef } from "react";
import {
  IconMapPin, IconChevronDown, IconHome, IconTool, IconCar, IconSoup,
  IconBriefcase, IconBuilding, IconBed, IconUsers, IconMenu2, IconX,
  IconArrowRight, IconSearch, IconChevronRight, IconArrowLeft, IconLogin,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

/* ══════════════════════════════════════ DATA ══════════════════════════════════════ */
const CITIES = [
  "Delhi","Mumbai","Bangalore","Hyderabad","Pune","Chennai",
  "Kolkata","Jaipur","Ahmedabad","Surat","Noida","Gurgaon",
];
const serviceItems = [
  { icon: <IconTool size={16}/>, label: "Home Services", sub: "Cleaning, repairs & more", color: "#f59e0b" },
  { icon: <IconCar size={16}/>, label: "Transport", sub: "Rides & city logistics", color: "#10b981" },
  { icon: <IconSoup size={16}/>, label: "Food & Dining", sub: "Restaurants near you", color: "#ef4444" },
  { icon: <IconBriefcase size={16}/>, label: "Professional", sub: "Lawyers, doctors & more", color: "#8b5cf6" },
];
const roomItems = [
  { icon: <IconHome size={16}/>, label: "Entire Homes", sub: "Private spaces for rent", color: "#3b82f6" },
  { icon: <IconBed size={16}/>, label: "Single Rooms", sub: "Affordable & cozy stays", color: "#06b6d4" },
  { icon: <IconBuilding size={16}/>, label: "PG / Hostels", sub: "Budget-friendly living", color: "#f97316" },
  { icon: <IconUsers size={16}/>, label: "Co-living", sub: "Shared urban spaces", color: "#ec4899" },
];

/* ══════════════════════════════════════ MOBILE AUTH POPUP ══════════════════════════════════════ */
// 🔁 Replace this with your real auth check e.g. const { isLoggedIn } = useAuth()
/* internal — replace return value with your real auth check */
function useIsLoggedIn() { return false; }

export function MobileAuthPopup({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const benefits = [
    { icon: "🏠", text: "Book rooms & services instantly" },
    { icon: "⚡", text: "Real-time availability & pricing" },
    { icon: "🔒", text: "Secure payments & verified listings" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          animation: "mab-overlayIn 0.22s ease both",
        }}
      />

      {/* Bottom sheet */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: "#fff",
        borderRadius: "24px 24px 0 0",
        padding: "0 0 max(24px, env(safe-area-inset-bottom)) 0",
        boxShadow: "0 -8px 60px rgba(0,0,0,0.22)",
        animation: "mab-sheetUp 0.38s cubic-bezier(0.34,1.05,0.64,1) both",
      }}>
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "100px", background: "#e2e8f0" }} />
        </div>

        {/* Close btn */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "#f1f5f9", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#64748b",
          }}
        >
          <IconX size={14} />
        </button>

        <div style={{ padding: "16px 22px 0" }}>
          {/* Headline */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#eff6ff", border: "1px solid #bfdbfe",
              borderRadius: "50px", padding: "4px 12px", marginBottom: "10px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb", display: "inline-block", animation: "mab-pulse 2s ease infinite" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#1d4ed8", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
                Free to join
              </span>
            </div>
            <h2 style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
              fontSize: "22px", color: "#0d1526",
              letterSpacing: "-0.8px", lineHeight: 1.18,
              margin: "0 0 6px 0",
            }}>
              Get the full CityMate<br />experience 🏙️
            </h2>
            <p style={{ fontSize: "13.5px", color: "#7c8fa6", lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
              Sign up free to book, save & explore everything your city has to offer.
            </p>
          </div>

          {/* Benefits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {benefits.map((b, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                background: "#f8fafc", border: "1px solid #f1f5f9",
                borderRadius: "12px", padding: "10px 14px",
              }}>
                <span style={{ fontSize: "18px", lineHeight: 1, flexShrink: 0 }}>{b.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#334155", fontFamily: "'DM Sans',sans-serif" }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            <button
              onClick={() => { navigate("/signup"); onClose(); }}
              style={{
                width: "100%", height: "52px", borderRadius: "14px",
                background: "#1e40af", color: "#fff", border: "none", cursor: "pointer",
                fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: "0 4px 20px rgba(30,64,175,0.35)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e40af"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              Create free account
            </button>

            <button
              onClick={() => { navigate("/login"); onClose(); }}
              style={{
                width: "100%", height: "48px", borderRadius: "14px",
                background: "#f7f9fc", color: "#1e40af",
                border: "1.5px solid #bfdbfe", cursor: "pointer",
                fontSize: "14.5px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#f7f9fc"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              Already have an account? Log in
            </button>
          </div>

          {/* Skip */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif", marginBottom: "4px" }}>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "12px", fontFamily: "'DM Sans',sans-serif", textDecoration: "underline", padding: 0 }}
            >
              Maybe later, just browsing
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════ MOBILE AUTH GATE (wrap around interactive elements) ══════════════════════════════════════ */
/* ══════════════════════════════════════ DESKTOP MEGA MENU ══════════════════════════════════════ */
function MegaMenu({ label, items }: { label: string; items: typeof serviceItems }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button style={{
        display: "flex", alignItems: "center", gap: "5px",
        color: open ? "#fff" : "rgba(255,255,255,0.75)",
        background: open ? "rgba(255,255,255,0.1)" : "transparent",
        border: "none", cursor: "pointer",
        padding: "7px 12px", borderRadius: "10px",
        fontSize: "13.5px", fontWeight: 500,
        fontFamily: "'DM Sans',sans-serif",
        transition: "all 0.18s", letterSpacing: "0.01em",
      }}>
        {label}
        <IconChevronDown size={12} style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }} />
      </button>
      <div style={{
        position: "absolute", top: "calc(100% + 12px)", left: "50%",
        width: "260px", zIndex: 1000,
        background: "rgba(7,11,22,0.98)",
        backdropFilter: "blur(32px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "20px", padding: "8px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.65)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transform: open ? "translateX(-50%) translateY(0px)" : "translateX(-50%) translateY(-8px)",
        transition: "opacity 0.22s, transform 0.22s",
      }}>
        {items.map((item, i) => (
          <button key={i} style={{
            width: "100%", display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 10px", borderRadius: "12px", border: "none",
            background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${item.color}18`, color: item.color }}>{item.icon}</div>
            <div>
              <div style={{ color: "#fff", fontSize: "13px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif" }}>{item.label}</div>
              <div style={{ color: "rgba(255,255,255,0.34)", fontSize: "11.5px", marginTop: "2px", fontFamily: "'DM Sans',sans-serif" }}>{item.sub}</div>
            </div>
          </button>
        ))}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "6px 4px" }} />
        <button style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 12px", borderRadius: "11px", border: "none",
          background: "rgba(59,130,246,0.1)", cursor: "pointer",
          color: "#60a5fa", fontSize: "12.5px", fontWeight: 600,
          fontFamily: "'DM Sans',sans-serif", transition: "background 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
        >
          Browse all {label.toLowerCase()} <IconArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════ DESKTOP CITY SEARCH ══════════════════════════════════════ */
function CitySearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = value.length >= 1 ? CITIES.filter(s => s.toLowerCase().includes(value.toLowerCase())) : CITIES;

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={wrapRef} style={{ flex: 1, minWidth: 0, position: "relative", height: "100%", overflow: "visible" }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 8px 0 20px", gap: "10px" }}>
        <IconMapPin size={17} style={{ color: open ? "#2563eb" : "#94a3b8", flexShrink: 0, transition: "color 0.2s" }} />
        <input
          ref={inputRef} type="text" value={value}
          onChange={e => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Enter your Pincode or City"
          style={{ background: "transparent", border: "none", outline: "none", color: "#0f172a", fontSize: "14.5px", fontWeight: 400, fontFamily: "'DM Sans',sans-serif", width: "100%", padding: 0 }}
        />
        {value && (
          <button onClick={e => { e.stopPropagation(); onChange(""); inputRef.current?.focus(); }}
            style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#64748b" }}>
            <IconX size={11} />
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", left: 0,
          minWidth: "280px", width: "300px",
          background: "#fff", border: "1px solid #e8edf5", borderRadius: "16px",
          overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          zIndex: 99999, animation: "cmDropIn 0.18s ease both",
        }}>
          <div style={{ padding: "12px 16px 6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif" }}>Popular Cities</div>
          <div style={{ padding: "2px 8px 10px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {filtered.map((c, i) => (
              <button key={i} onMouseDown={() => { onChange(c); setOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 10px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px", color: "#1e293b", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconMapPin size={13} style={{ color: "#2563eb" }} />
                </div>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════ MOBILE SEARCH BAR ══════════════════════════════════════ */
function MobileSearchBar() {
  const [city, setCity] = useState("");
  const [focused, setFocused] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = city.length >= 1 ? CITIES.filter(s => s.toLowerCase().includes(city.toLowerCase())) : CITIES;

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { setDropOpen(false); setFocused(false); }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", zIndex: 50 }}>
      <div style={{
        display: "flex", alignItems: "center",
        background: focused ? "#fff" : "rgba(255,255,255,0.13)",
        backdropFilter: focused ? "none" : "blur(20px)",
        WebkitBackdropFilter: focused ? "none" : "blur(20px)",
        border: focused ? "2px solid #2563eb" : "1.5px solid rgba(255,255,255,0.24)",
        borderRadius: "10px", padding: "0 4px 0 12px", height: "38px",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: focused ? "0 0 0 4px rgba(37,99,235,0.12)" : "none",
      }}>
        <IconMapPin size={17} style={{ color: focused ? "#2563eb" : "rgba(255,255,255,0.6)", flexShrink: 0, transition: "color 0.2s" }} />
        <input
          type="text" value={city}
          onChange={e => { setCity(e.target.value); setDropOpen(true); }}
          onFocus={() => { setFocused(true); setDropOpen(true); }}
          placeholder="Search city or pincode…"
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: focused ? "#0f172a" : "#fff", fontSize: "14.5px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", padding: "0 10px" }}
        />
        <button style={{ background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", width: "28px", height: "28px", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; }}
        >
          <IconSearch size={15} strokeWidth={2.5} />
        </button>
      </div>
      {dropOpen && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0",
          boxShadow: "0 20px 48px rgba(0,0,0,0.22)", overflow: "hidden",
          zIndex: 99999, animation: "cmDropIn 0.18s ease both",
        }}>
          <div style={{ padding: "10px 16px 6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif" }}>Popular Cities</div>
          <div style={{ padding: "2px 8px 10px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {filtered.map((c, i) => (
              <button key={i} onMouseDown={() => { setCity(c); setDropOpen(false); setFocused(false); }}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 10px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#1e293b", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconMapPin size={12} style={{ color: "#2563eb" }} />
                </div>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════ MOBILE DRAWER ══════════════════════════════════════ */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<null | "services" | "rooms">(null);
  const navigate = useNavigate();

  const menuGroups = [
    {
      items: [
        { label: "Services",       sub: "Home, transport, food & more",   hasChildren: true,  key: "services" as const, path: null },
        { label: "Rooms & Stays",  sub: "Homes, PGs, co-living & more",   hasChildren: true,  key: "rooms" as const,    path: null },
      ]
    },
    {
      items: [
        { label: "Become a Partner", sub: "List your property or service", hasChildren: false, key: null, path: "/become-a-partner" },
        { label: "Explore",          sub: "Discover what's near you",      hasChildren: false, key: null, path: "/explore" },
      ]
    },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", animation: "cmOverlayIn 0.2s ease both" }} />
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201,
        background: "#0c1020",
        borderRadius: "24px 24px 0 0",
        border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none",
        display: "flex", flexDirection: "column",
        maxHeight: "90dvh",
        animation: "cmDrawerUp 0.36s cubic-bezier(0.34,1.05,0.64,1) both",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.12)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px 10px" }}>
          {section ? (
            <button onClick={() => setSection(null)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 500, padding: 0 }}>
              <IconArrowLeft size={15} />Back
            </button>
          ) : (
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "16px", fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Menu</span>
          )}
          <button onClick={onClose} style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.55)" }}>
            <IconX size={14} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "2px 10px 40px" }}>
          {!section && (
            <div style={{ animation: "cmFadeSlide 0.22s ease both" }}>
              {menuGroups.map((group, gi) => (
                <div key={gi}>
                  {gi > 0 && <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 6px" }} />}
                  {group.items.map((item, ii) => (
                    <button key={ii}
                      onClick={() => {
                        if (item.hasChildren) { setSection(item.key as "services" | "rooms"); }
                        else if (item.path) { navigate(item.path); onClose(); }
                      }}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 10px", borderRadius: "12px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <div>
                        <div style={{ color: item.label === "Become a Partner" ? "#60a5fa" : "#fff", fontSize: "15px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{item.label}</div>
                        <div style={{ color: "rgba(255,255,255,0.33)", fontSize: "12px", marginTop: "2px", fontFamily: "'DM Sans',sans-serif" }}>{item.sub}</div>
                      </div>
                      {item.hasChildren
                        ? <IconChevronRight size={15} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        : item.path ? <IconArrowRight size={14} style={{ color: "#60a5fa", flexShrink: 0 }} /> : null
                      }
                    </button>
                  ))}
                </div>
              ))}

              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "10px 6px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "6px 0" }}>
                <Link to="/login" style={{ textDecoration: "none" }} onClick={onClose}>
                  <button style={{ width: "100%", padding: "13px 0", borderRadius: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.82)", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  ><IconLogin size={15} />Log In</button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }} onClick={onClose}>
                  <button style={{ width: "100%", padding: "13px 0", borderRadius: "12px", background: "#2563eb", border: "none", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", transition: "background 0.15s", boxShadow: "0 4px 16px rgba(37,99,235,0.38)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; }}
                  >Sign Up Free</button>
                </Link>
              </div>
            </div>
          )}

          {section === "services" && (
            <div style={{ animation: "cmFadeSlide 0.22s ease both" }}>
              <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", padding: "2px 8px 12px", fontFamily: "'DM Sans',sans-serif" }}>Services</div>
              {serviceItems.map((item, i) => (
                <button key={i} style={{ width: "100%", display: "flex", alignItems: "center", gap: "14px", padding: "12px 10px", borderRadius: "12px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: `${item.color}15`, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: "14.5px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{item.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.33)", fontSize: "12px", marginTop: "2px", fontFamily: "'DM Sans',sans-serif" }}>{item.sub}</div>
                  </div>
                </button>
              ))}
              <button style={{ width: "100%", marginTop: "10px", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.09)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                View all services <IconArrowRight size={13} />
              </button>
            </div>
          )}

          {section === "rooms" && (
            <div style={{ animation: "cmFadeSlide 0.22s ease both" }}>
              <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", padding: "2px 8px 12px", fontFamily: "'DM Sans',sans-serif" }}>Rooms & Stays</div>
              {roomItems.map((item, i) => (
                <button key={i} style={{ width: "100%", display: "flex", alignItems: "center", gap: "14px", padding: "12px 10px", borderRadius: "12px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: `${item.color}15`, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: "14.5px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{item.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.33)", fontSize: "12px", marginTop: "2px", fontFamily: "'DM Sans',sans-serif" }}>{item.sub}</div>
                  </div>
                </button>
              ))}
              <button style={{ width: "100%", marginTop: "10px", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.09)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                View all rooms <IconArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════ BACK BUTTON ══════════════════════════════════════ */
export function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)", fontSize: "14px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
    >
      <IconArrowLeft size={16} />Back
    </button>
  );
}

/* ══════════════════════════════════════ MAIN NAVBAR ══════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [city, setCity] = useState("");
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  // Show auth popup on first interaction after 3s on mobile
  useEffect(() => {
    if (isLoggedIn) return;
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Trigger after 3 seconds of idle browsing
    const timer = setTimeout(() => {
      setShowAuthPopup(true);
    }, 3000);

    // Also trigger on any tap/touch
    const onTouch = () => {
      clearTimeout(timer);
      setShowAuthPopup(true);
      document.removeEventListener("touchstart", onTouch);
    };
    document.addEventListener("touchstart", onTouch, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("touchstart", onTouch);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

        @keyframes heroPan {
          0%   { transform: scale(1.0) translate(0px,0px); }
          33%  { transform: scale(1.06) translate(-8px,-4px); }
          66%  { transform: scale(1.08) translate(6px,-8px); }
          100% { transform: scale(1.05) translate(-4px,4px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cmOverlayIn { from { opacity:0; } to { opacity:1; } }
        @keyframes cmDrawerUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes cmFadeSlide {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cmDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mab-overlayIn { from { opacity:0; } to { opacity:1; } }
        @keyframes mab-sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes mab-pulse {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%      { opacity:1; transform:scale(1.2); }
        }

        .cm-bg { animation: heroPan 24s ease-in-out infinite alternate; }
        .cm-f2 { animation: fadeUp 0.8s 0.08s cubic-bezier(.22,.68,0,1.2) both; }
        .cm-f3 { animation: fadeUp 0.8s 0.18s cubic-bezier(.22,.68,0,1.2) both; }
        .cm-f4 { animation: fadeUp 0.8s 0.28s cubic-bezier(.22,.68,0,1.2) both; }

        .cm-shimmer {
          display: inline-block;
          background: linear-gradient(90deg,#93c5fd 0%,#818cf8 30%,#c4b5fd 50%,#818cf8 70%,#93c5fd 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          padding-bottom: 0.15em;
          margin-bottom: -0.15em;
        }

        .cm-search-card {
          background: #fff; border-radius: 100px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.28);
          display: flex; align-items: stretch;
          height: 48px; position: relative; overflow: visible;
          padding: 5px; border: 1.5px solid rgba(255,255,255,0.9);
          transition: box-shadow 0.3s;
        }
        .cm-search-card:focus-within {
          box-shadow: 0 0 0 4px rgba(37,99,235,0.15), 0 12px 48px rgba(0,0,0,0.32);
        }
        .cm-search-btn {
          background: #2563eb; color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans',sans-serif; font-size: 14px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          padding: 0 24px; border-radius: 100px;
          transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
          height: 100%;
        }
        .cm-search-btn:hover { background: #1d4ed8; }
        .cm-navlink:hover { color: #fff !important; background: rgba(255,255,255,0.1) !important; }

        @media (max-width: 768px) {
          .cm-desktop-only { display: none !important; }
          .cm-mobile-only  { display: flex !important; }
          .cm-hero-wrap    { min-height: 0 !important; }
          .cm-hero-pad     { padding: 44px 14px 22px !important; }
          .cm-headline     {
            font-size: clamp(18px, 5.5vw, 26px) !important;
            letter-spacing: -0.8px !important;
            line-height: 1.08 !important;
          }
          .cm-subline { font-size: 11.5px !important; margin-bottom: 12px !important; line-height: 1.5 !important; }
        }
        @media (min-width: 769px) {
          .cm-mobile-only { display: none !important; }
        }
        @media (max-width: 360px) {
          .cm-hero-pad { padding: 40px 12px 18px !important; }
          .cm-headline { font-size: 17px !important; }
          .cm-logo-text { font-size: 15px !important; }
        }
      `}</style>

      <div className="cm-hero-wrap" style={{ position: "relative", minHeight: "420px", display: "flex", flexDirection: "column", overflow: "visible", marginTop: "40px" }}>
        {/* Bg image extends 44px above to show behind fixed transparent nav */}
        <div style={{ position: "absolute", top: "-40px", left: 0, right: 0, bottom: 0, overflow: "hidden", zIndex: 0 }}>
          <div className="cm-bg" style={{ position: "absolute", inset: "-5%", backgroundImage: "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=90)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.85)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,6,18,0.5) 0%, rgba(3,6,18,0.08) 35%, rgba(3,6,18,0.35) 65%, rgba(3,6,18,0.97) 100%)" }} />
        </div>

        {/* ════════ NAVBAR — height reduced to 56px ════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9990,
          height: "40px",
          background: scrolled ? "rgba(3,6,18,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "all 0.3s",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <a href="#" style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "10px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.5px", transition: "transform 0.3s", flexShrink: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1) rotate(-8deg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1) rotate(0)"; }}
              >CM</div>
              <span className="cm-logo-text" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 800, color: "#fff", letterSpacing: "-0.4px" }}>
                City<span style={{ color: "#60a5fa" }}>Mate</span>
              </span>
            </a>

            {/* Desktop centre */}
            <div className="cm-desktop-only" style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
              <MegaMenu label="Services" items={serviceItems} />
              <MegaMenu label="Rooms" items={roomItems} />
              <button onClick={() => navigate("/become-a-partner")} className="cm-navlink"
                style={{ color: "rgba(255,255,255,0.72)", background: "transparent", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", transition: "all 0.18s" }}>
                Become a Partner
              </button>
              <button className="cm-navlink"
                style={{ color: "rgba(255,255,255,0.72)", background: "transparent", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", transition: "all 0.18s" }}>
                Explore
              </button>
            </div>

            {/* Desktop auth */}
            <div className="cm-desktop-only" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <Link to="/login">
                <button style={{ color: "rgba(255,255,255,0.8)", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", cursor: "pointer", padding: "6px 15px", borderRadius: "8px", fontSize: "12.5px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.1)"; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.8)"; }}
                >Log In</button>
              </Link>
              <Link to="/signup">
                <button style={{ background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", padding: "7px 17px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#2563eb"; }}
                >Sign Up Free</button>
              </Link>
            </div>

            {/* Mobile: Sign Up pill + Hamburger */}
            <div className="cm-mobile-only" style={{ display: "none", alignItems: "center", gap: "8px" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button style={{ background: "#2563eb", border: "none", color: "#fff", fontSize: "12px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", padding: "0 13px", height: "28px", borderRadius: "7px", whiteSpace: "nowrap", transition: "background 0.18s", boxShadow: "0 2px 10px rgba(37,99,235,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; }}
                >Sign Up</button>
              </Link>
              <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
                style={{ color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                <IconMenu2 size={17} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}

        {/* Mobile auth popup */}
        {showAuthPopup && !isLoggedIn && (
          <MobileAuthPopup onClose={() => setShowAuthPopup(false)} />
        )}

        {/* ════════ HERO ════════ */}
        <div className="cm-hero-pad" style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "44px 20px 28px", overflow: "visible" }}>
          <h1 className="cm-f2 cm-headline" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(24px, 3.6vw, 44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", marginBottom: "10px", maxWidth: "600px" }}>
            Find{" "}<span className="cm-shimmer">Rooms &amp; Services</span>
            <br /><span style={{ color: "rgba(255,255,255,0.92)" }}>in Your City</span>
          </h1>
          <p className="cm-f3 cm-subline" style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", fontWeight: 400, lineHeight: 1.6, maxWidth: "340px", marginBottom: "18px" }}>
            Your one-stop platform for rooms, local services &amp; everything your city has to offer.
          </p>

          {/* Desktop search */}
          <div className="cm-f4 cm-search-card cm-desktop-only" style={{ width: "100%", maxWidth: "460px", overflow: "visible" }}>
            <CitySearchField value={city} onChange={setCity} />
            <button className="cm-search-btn"><IconSearch size={14} strokeWidth={2.5} />Search</button>
          </div>

          {/* Mobile search */}
          <div className="cm-f4 cm-mobile-only" style={{ width: "100%", maxWidth: "100%", position: "relative", zIndex: 50 }}>
            <MobileSearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}