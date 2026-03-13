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
        padding: "8px 14px", borderRadius: "10px",
        fontSize: "14px", fontWeight: 500,
        fontFamily: "'DM Sans',sans-serif",
        transition: "all 0.18s", letterSpacing: "0.01em",
      }}>
        {label}
        <IconChevronDown size={13} style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }} />
      </button>
      <div style={{
        position: "absolute", top: "calc(100% + 14px)", left: "50%",
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
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${item.color}18`, color: item.color }}>{item.icon}</div>
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
    <div ref={wrapRef} style={{ flex: 1, minWidth: 0, position: "relative", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 8px 0 20px", gap: "10px" }}>
        <IconMapPin size={17} style={{ color: open ? "#2563eb" : "#94a3b8", flexShrink: 0, transition: "color 0.2s" }} />
        <input
          ref={inputRef} type="text" value={value}
          onChange={e => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Enter your Pincode or City"
          style={{ background: "transparent", border: "none", outline: "none", color: "#0f172a", fontSize: "15px", fontWeight: 400, fontFamily: "'DM Sans',sans-serif", width: "100%", padding: 0 }}
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
          position: "absolute", top: "calc(100% + 14px)", left: "-20px",
          minWidth: "300px", width: "calc(100% + 20px)",
          background: "#fff", border: "1px solid #e8edf5", borderRadius: "20px",
          overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.16)",
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
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center",
        background: focused ? "#fff" : "rgba(255,255,255,0.13)",
        backdropFilter: focused ? "none" : "blur(20px)",
        WebkitBackdropFilter: focused ? "none" : "blur(20px)",
        border: focused ? "2px solid #2563eb" : "1.5px solid rgba(255,255,255,0.24)",
        borderRadius: "14px", padding: "0 6px 0 16px", height: "52px",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: focused ? "0 0 0 4px rgba(37,99,235,0.12)" : "none",
      }}>
        <IconMapPin size={17} style={{ color: focused ? "#2563eb" : "rgba(255,255,255,0.6)", flexShrink: 0, transition: "color 0.2s" }} />
        <input
          type="text" value={city}
          onChange={e => { setCity(e.target.value); setDropOpen(true); }}
          onFocus={() => { setFocused(true); setDropOpen(true); }}
          placeholder="Search city or pincode…"
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: focused ? "#0f172a" : "#fff", fontSize: "15px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", padding: "0 10px" }}
        />
        <button style={{ background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; }}
        >
          <IconSearch size={16} strokeWidth={2.5} />
        </button>
      </div>
      {dropOpen && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", left: 0, right: 0,
          background: "#fff", borderRadius: "16px", border: "1px solid #e8edf5",
          boxShadow: "0 20px 56px rgba(0,0,0,0.18)", overflow: "hidden",
          zIndex: 9999, animation: "cmDropIn 0.18s ease both",
        }}>
          <div style={{ padding: "10px 16px 6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif" }}>Popular Cities</div>
          <div style={{ padding: "2px 8px 10px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {filtered.map((c, i) => (
              <button key={i} onMouseDown={() => { setCity(c); setDropOpen(false); setFocused(false); }}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 10px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "#1e293b", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

  const menuGroups = [
    {
      items: [
        { label: "Services", sub: "Home, transport, food & more", hasChildren: true, key: "services" as const },
        { label: "Rooms & Stays", sub: "Homes, PGs, co-living & more", hasChildren: true, key: "rooms" as const },
      ]
    },
    {
      items: [
        { label: "Become a Partner", sub: "List your property or service", hasChildren: false, key: null },
        { label: "Explore", sub: "Discover what's near you", hasChildren: false, key: null },
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
        {/* Handle bar */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* Header */}
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

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "2px 10px 40px" }}>
          {!section && (
            <div style={{ animation: "cmFadeSlide 0.22s ease both" }}>
              {menuGroups.map((group, gi) => (
                <div key={gi}>
                  {gi > 0 && <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 6px" }} />}
                  {group.items.map((item, ii) => (
                    <button key={ii}
                      onClick={() => item.hasChildren && setSection(item.key)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 10px", borderRadius: "12px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <div>
                        <div style={{ color: "#fff", fontSize: "15px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{item.label}</div>
                        <div style={{ color: "rgba(255,255,255,0.33)", fontSize: "12px", marginTop: "2px", fontFamily: "'DM Sans',sans-serif" }}>{item.sub}</div>
                      </div>
                      {item.hasChildren && <IconChevronRight size={15} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />}
                    </button>
                  ))}
                </div>
              ))}

              {/* Auth row inside drawer */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "10px 6px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "6px 0" }}>
                <Link to="/login" style={{ textDecoration: "none" }} onClick={onClose}>
                  <button style={{
                    width: "100%", padding: "13px 0", borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.82)", fontSize: "14px", fontWeight: 600,
                    fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
                    transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.82)"; }}
                  >
                    <IconLogin size={15} />Log In
                  </button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }} onClick={onClose}>
                  <button style={{
                    width: "100%", padding: "13px 0", borderRadius: "12px",
                    background: "#2563eb", border: "none",
                    color: "#fff", fontSize: "14px", fontWeight: 700,
                    fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
                    transition: "background 0.15s",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.38)",
                  }}
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

        .cm-bg { animation: heroPan 24s ease-in-out infinite alternate; }
        .cm-f2 { animation: fadeUp 0.8s 0.08s cubic-bezier(.22,.68,0,1.2) both; }
        .cm-f3 { animation: fadeUp 0.8s 0.18s cubic-bezier(.22,.68,0,1.2) both; }
        .cm-f4 { animation: fadeUp 0.8s 0.28s cubic-bezier(.22,.68,0,1.2) both; }

        /*
         * FIX: -webkit-background-clip:text clips at the tight line-box boundary,
         * cutting off descenders on the last letter of gradient text.
         * padding-bottom + a negative margin-bottom of the same value expands the
         * paint area without shifting layout, so the full glyph is always visible.
         */
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
          height: 60px; position: relative; overflow: visible;
          padding: 5px; border: 1.5px solid rgba(255,255,255,0.9);
          transition: box-shadow 0.3s;
        }
        .cm-search-card:focus-within {
          box-shadow: 0 0 0 4px rgba(37,99,235,0.15), 0 12px 48px rgba(0,0,0,0.32);
        }
        .cm-search-btn {
          background: #2563eb; color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans',sans-serif; font-size: 14.5px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          padding: 0 26px; border-radius: 100px;
          transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
          height: 100%;
        }
        .cm-search-btn:hover { background: #1d4ed8; }
        .cm-navlink:hover { color: #fff !important; background: rgba(255,255,255,0.1) !important; }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .cm-desktop-only { display: none !important; }
          .cm-mobile-only  { display: flex !important; }
          .cm-hero-wrap    { min-height: 100svh !important; }
          .cm-hero-pad     { padding: 88px 16px 48px !important; }
          .cm-headline     {
            font-size: clamp(30px, 8vw, 42px) !important;
            letter-spacing: -1.2px !important;
            line-height: 1.12 !important;
          }
          .cm-subline { font-size: 13.5px !important; margin-bottom: 24px !important; line-height: 1.65 !important; }
        }
        @media (min-width: 769px) {
          .cm-mobile-only { display: none !important; }
        }

        /* Extra small phones */
        @media (max-width: 360px) {
          .cm-hero-pad { padding: 82px 14px 40px !important; }
          .cm-headline { font-size: 28px !important; }
          .cm-logo-text { font-size: 16px !important; }
        }
      `}</style>

      <div className="cm-hero-wrap" style={{ position: "relative", minHeight: "720px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Background */}
        <div className="cm-bg" style={{ position: "absolute", inset: "-5%", backgroundImage: "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=90)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.85)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,6,18,0.85) 0%, rgba(3,6,18,0.18) 40%, rgba(3,6,18,0.45) 68%, rgba(3,6,18,0.97) 100%)" }} />

        {/* ════════ NAVBAR ════════ */}
        <nav style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
          height: "64px",
          background: scrolled ? "rgba(3,6,18,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "all 0.3s",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 18px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "11px", fontFamily: "'DM Sans',sans-serif", letterSpacing: "-0.5px", transition: "transform 0.3s", flexShrink: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1) rotate(-8deg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1) rotate(0)"; }}
              >CM</div>
              <span className="cm-logo-text" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", fontWeight: 800, color: "#fff", letterSpacing: "-0.4px" }}>
                City<span style={{ color: "#60a5fa" }}>Mate</span>
              </span>
            </a>

            {/* Desktop centre */}
            <div className="cm-desktop-only" style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
              <MegaMenu label="Services" items={serviceItems} />
              <MegaMenu label="Rooms" items={roomItems} />
              {["Become a Partner","Explore"].map(l => (
                <button key={l} className="cm-navlink" style={{ color: "rgba(255,255,255,0.72)", background: "transparent", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", transition: "all 0.18s" }}>{l}</button>
              ))}
            </div>

            {/* Desktop auth */}
            <div className="cm-desktop-only" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <Link to="/login">
                <button style={{ color: "rgba(255,255,255,0.8)", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", cursor: "pointer", padding: "8px 20px", borderRadius: "10px", fontSize: "13.5px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.1)"; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.8)"; }}
                >Log In</button>
              </Link>
              <Link to="/signup">
                <button style={{ background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", padding: "9px 22px", borderRadius: "10px", fontSize: "13.5px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1d4ed8"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#2563eb"; }}
                >Sign Up Free</button>
              </Link>
            </div>

            {/* Mobile: Sign Up pill + Hamburger */}
            <div className="cm-mobile-only" style={{ display: "none", alignItems: "center", gap: "8px" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button style={{
                  background: "#2563eb", border: "none", color: "#fff",
                  fontSize: "13px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                  cursor: "pointer", padding: "0 15px", height: "34px", borderRadius: "9px",
                  whiteSpace: "nowrap", transition: "background 0.18s",
                  boxShadow: "0 2px 10px rgba(37,99,235,0.4)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; }}
                >Sign Up</button>
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                style={{
                  color: "#fff", background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)", borderRadius: "9px",
                  width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0, transition: "background 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                <IconMenu2 size={18} />
              </button>
            </div>

          </div>
        </nav>

        {/* Drawer */}
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}

        {/* ════════ HERO ════════ */}
        <div className="cm-hero-pad" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "110px 20px 48px" }}>

          <h1 className="cm-f2 cm-headline" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(40px, 5.8vw, 72px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-2.5px", marginBottom: "16px", maxWidth: "780px" }}>
            Find{" "}<span className="cm-shimmer">Rooms &amp; Services</span>
            <br /><span style={{ color: "rgba(255,255,255,0.92)" }}>in Your City</span>
          </h1>

          <p className="cm-f3 cm-subline" style={{ color: "rgba(255,255,255,0.45)", fontSize: "17px", fontWeight: 400, lineHeight: 1.75, maxWidth: "400px", marginBottom: "34px" }}>
            Your one-stop platform for rooms, local services &amp; everything your city has to offer.
          </p>

          {/* Desktop search */}
          <div className="cm-f4 cm-search-card cm-desktop-only" style={{ width: "100%", maxWidth: "520px" }}>
            <CitySearchField value={city} onChange={setCity} />
            <button className="cm-search-btn"><IconSearch size={15} strokeWidth={2.5} />Search</button>
          </div>

          {/* Mobile search */}
          <div className="cm-f4 cm-mobile-only" style={{ width: "100%", maxWidth: "100%" }}>
            <MobileSearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}