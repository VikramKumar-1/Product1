import type { JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/* ══════════════════════════════════════════
   ART ICONS — Illustrated SVG
══════════════════════════════════════════ */
const HomeServiceArt = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" fill="none">
    {/* Person */}
    <circle cx="38" cy="17" r="10" fill="#FFDBB5" stroke="#fff" strokeWidth="1.5"/>
    <path d="M22 58 C22 40 54 40 54 58" fill="#60A5FA" stroke="#fff" strokeWidth="1.5"/>
    {/* Hair */}
    <path d="M28 13 Q38 5 48 13" fill="#5C3D1E" stroke="#fff" strokeWidth="1"/>
    {/* Eyes */}
    <circle cx="34" cy="18" r="1.5" fill="#333"/>
    <circle cx="42" cy="18" r="1.5" fill="#333"/>
    {/* Smile */}
    <path d="M34 23 Q38 27 42 23" stroke="#333" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    {/* Mop stick */}
    <line x1="52" y1="36" x2="66" y2="62" stroke="#A0522D" strokeWidth="3.5" strokeLinecap="round"/>
    {/* Mop head */}
    <ellipse cx="67" cy="64" rx="8" ry="3.5" fill="#BAE6FD" stroke="#fff" strokeWidth="1.2"/>
    <line x1="60" y1="62" x2="62" y2="68" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="64" y1="61" x2="66" y2="67" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="68" y1="61" x2="70" y2="67" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="72" y1="62" x2="74" y2="68" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Sparkles */}
    <circle cx="14" cy="26" r="3" fill="none" stroke="#BAE6FD" strokeWidth="1.5"/>
    <circle cx="9"  cy="17" r="2" fill="none" stroke="#BAE6FD" strokeWidth="1.5"/>
    <circle cx="18" cy="13" r="1.5" fill="none" stroke="#93C5FD" strokeWidth="1.2"/>
    {/* Bucket */}
    <path d="M22 50 L24 62 L36 62 L38 50 Z" fill="#FCD34D" stroke="#fff" strokeWidth="1"/>
    <rect x="21" y="48" width="18" height="4" rx="2" fill="#FDE68A" stroke="#fff" strokeWidth="1"/>
  </svg>
);

const RoomsPGArt = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" fill="none">
    {/* Main house body */}
    <path d="M40 8 L8 36 L12 36 L12 70 L68 70 L68 36 L72 36 Z" fill="#D1FAE5" stroke="#fff" strokeWidth="1.8"/>
    {/* Roof */}
    <path d="M40 8 L8 36 L72 36 Z" fill="#6EE7B7" stroke="#fff" strokeWidth="1.5"/>
    {/* Door */}
    <rect x="32" y="50" width="16" height="20" rx="2.5" fill="#A0522D" stroke="#fff" strokeWidth="1.2"/>
    <circle cx="45" cy="60" r="1.8" fill="#FCD34D"/>
    {/* Left window */}
    <rect x="15" y="42" width="13" height="11" rx="2" fill="#BAE6FD" stroke="#fff" strokeWidth="1"/>
    <line x1="21.5" y1="42" x2="21.5" y2="53" stroke="#fff" strokeWidth="0.9"/>
    <line x1="15"   y1="47.5" x2="28" y2="47.5" stroke="#fff" strokeWidth="0.9"/>
    {/* Right window */}
    <rect x="52" y="42" width="13" height="11" rx="2" fill="#BAE6FD" stroke="#fff" strokeWidth="1"/>
    <line x1="58.5" y1="42" x2="58.5" y2="53" stroke="#fff" strokeWidth="0.9"/>
    <line x1="52"   y1="47.5" x2="65" y2="47.5" stroke="#fff" strokeWidth="0.9"/>
    {/* Chimney */}
    <rect x="50" y="14" width="8" height="14" rx="2" fill="#6EE7B7" stroke="#fff" strokeWidth="1"/>
    {/* Smoke puffs */}
    <circle cx="53" cy="11" r="2.5" fill="none" stroke="#A7F3D0" strokeWidth="1.4"/>
    <circle cx="56" cy="7"  r="2"   fill="none" stroke="#A7F3D0" strokeWidth="1.2"/>
    <circle cx="59" cy="4"  r="1.5" fill="none" stroke="#A7F3D0" strokeWidth="1"/>
    {/* Verified badge */}
    <circle cx="64" cy="16" r="12" fill="#10B981" stroke="#fff" strokeWidth="2.5"/>
    <path d="M58 16 L62 20 L70 12" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Decorative dots */}
    <circle cx="8"  cy="54" r="2"   fill="#A7F3D0" opacity="0.7"/>
    <circle cx="5"  cy="44" r="1.5" fill="#A7F3D0" opacity="0.5"/>
    <circle cx="10" cy="64" r="1.5" fill="#A7F3D0" opacity="0.6"/>
    <circle cx="72" cy="56" r="1.8" fill="#A7F3D0" opacity="0.5"/>
  </svg>
);

/* ══════════════════════════════════════════
   SECTION EMOJI ICONS — small art SVGs
══════════════════════════════════════════ */
const SectionIcons: Record<string, () => JSX.Element> = {
  "home-services": () => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <circle cx="16" cy="8" r="5" fill="#FFDBB5" stroke="#2563eb" strokeWidth="1.2"/>
      <path d="M8 28 C8 18 24 18 24 28" fill="#60A5FA" stroke="#2563eb" strokeWidth="1.2"/>
      <line x1="22" y1="17" x2="29" y2="28" stroke="#A0522D" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="29" cy="29" rx="4" ry="2" fill="#BAE6FD" stroke="#2563eb" strokeWidth="0.8"/>
    </svg>
  ),
  "repairs": () => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect x="4" y="14" width="18" height="5" rx="2.5" fill="#9E9E9E" stroke="#d97706" strokeWidth="1.2"/>
      <circle cx="20" cy="16.5" r="4" fill="#757575" stroke="#d97706" strokeWidth="1.2"/>
      <circle cx="20" cy="16.5" r="2" fill="#BDBDBD"/>
      <path d="M6 10 Q12 4 18 10" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <rect x="8" y="20" width="12" height="4" rx="2" fill="#BAE6FD" stroke="#d97706" strokeWidth="0.8"/>
    </svg>
  ),
  "rooms": () => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <path d="M16 4 L4 14 L6 14 L6 28 L26 28 L26 14 L28 14 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="1.2"/>
      <path d="M16 4 L4 14 L28 14 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="1"/>
      <rect x="13" y="20" width="6" height="8" rx="1" fill="#A0522D" stroke="#059669" strokeWidth="0.8"/>
      <rect x="7"  y="17" width="5" height="5" rx="1" fill="#BAE6FD" stroke="#059669" strokeWidth="0.8"/>
      <rect x="20" y="17" width="5" height="5" rx="1" fill="#BAE6FD" stroke="#059669" strokeWidth="0.8"/>
      <circle cx="26" cy="8" r="5" fill="#10B981" stroke="#fff" strokeWidth="1.2"/>
      <path d="M23 8 L25 10 L29 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "packers": () => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect x="2" y="14" width="18" height="11" rx="2" fill="#FFF9C4" stroke="#7c3aed" strokeWidth="1.2"/>
      <path d="M20 18 L20 25 L28 25 L28 18 L25 14 L20 14 Z" fill="#FFE0B2" stroke="#7c3aed" strokeWidth="1.2"/>
      <circle cx="7"  cy="26" r="3" fill="#616161" stroke="#333" strokeWidth="1"/>
      <circle cx="7"  cy="26" r="1.5" fill="#9E9E9E"/>
      <circle cx="23" cy="26" r="3" fill="#616161" stroke="#333" strokeWidth="1"/>
      <circle cx="23" cy="26" r="1.5" fill="#9E9E9E"/>
      <rect x="5" y="15" width="12" height="8" rx="1" fill="#FFCC02" stroke="#7c3aed" strokeWidth="0.8"/>
      <line x1="11" y1="15" x2="11" y2="23" stroke="#7c3aed" strokeWidth="0.7"/>
      <line x1="5"  y1="19" x2="17" y2="19" stroke="#7c3aed" strokeWidth="0.7"/>
    </svg>
  ),
  "painting": () => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <circle cx="14" cy="8" r="5" fill="#FFDBB5" stroke="#e11d48" strokeWidth="1.2"/>
      <path d="M8 28 C8 18 20 18 20 28" fill="#fff" stroke="#e11d48" strokeWidth="1.2"/>
      <circle cx="10" cy="20" r="1.5" fill="#E53935" opacity="0.8"/>
      <circle cx="17" cy="22" r="1.2" fill="#1E88E5" opacity="0.8"/>
      <circle cx="13" cy="25" r="1.3" fill="#43A047" opacity="0.8"/>
      <line x1="20" y1="12" x2="27" y2="7" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round"/>
      <rect x="25" y="4" width="6" height="6" rx="1.5" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1"/>
    </svg>
  ),
  "daily": () => (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect x="4" y="12" width="8" height="14" rx="2" fill="#66BB6A" stroke="#0284c7" strokeWidth="1.2"/>
      <rect x="4" y="8"  width="8" height="5"  rx="1" fill="#43A047" stroke="#0284c7" strokeWidth="1"/>
      <rect x="12" y="10" width="6" height="3" rx="1" fill="#388E3C" stroke="#0284c7" strokeWidth="0.8"/>
      <ellipse cx="24" cy="22" rx="5" ry="3" fill="#5D4037" stroke="#0284c7" strokeWidth="1"/>
      <line x1="21" y1="21" x2="17" y2="18" stroke="#5D4037" strokeWidth="1" strokeLinecap="round"/>
      <line x1="21" y1="22" x2="17" y2="22" stroke="#5D4037" strokeWidth="1" strokeLinecap="round"/>
      <line x1="21" y1="23" x2="17" y2="26" stroke="#5D4037" strokeWidth="1" strokeLinecap="round"/>
      <line x1="27" y1="21" x2="31" y2="18" stroke="#5D4037" strokeWidth="1" strokeLinecap="round"/>
      <line x1="27" y1="22" x2="31" y2="22" stroke="#5D4037" strokeWidth="1" strokeLinecap="round"/>
      <line x1="27" y1="23" x2="31" y2="26" stroke="#5D4037" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════
   CATEGORY SECTIONS DATA
══════════════════════════════════════════ */
const SECTIONS = [
  {
    id: "home-services",
    title: "Home Services",
    color: "#2563eb",
    bg: "#eff6ff",
    path: "/services",
    items: [
      { label: "House Cleaning",  img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=85" },
      { label: "Sofa & Carpet",   img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=85" },
      { label: "Deep Cleaning",   img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=85" },
    ],
  },
  {
    id: "repairs",
    title: "Repairs & Services",
    color: "#d97706",
    bg: "#fffbeb",
    path: "/services",
    items: [
      { label: "AC Service",      img: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?w=500&q=85" },
      { label: "Plumbing",        img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=500&q=85" },
      { label: "Electrician",     img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&q=85" },
    ],
  },
  {
    id: "rooms",
    title: "Rooms & PG",
    color: "#059669",
    bg: "#ecfdf5",
    path: "/rooms",
    items: [
      { label: "Boys PG",         img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=85" },
      { label: "Girls PG",        img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=85" },
      { label: "1 BHK Flat",      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=85" },
    ],
  },
  {
    id: "packers",
    title: "Packers & Movers",
    color: "#7c3aed",
    bg: "#f5f3ff",
    path: "/services/packers-movers",
    items: [
      { label: "Local Shifting",  img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=500&q=85" },
      { label: "Intercity Move",  img: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=500&q=85" },
      { label: "Office Shifting", img: "https://images.unsplash.com/photo-1558618047-f8d8e72c9c13?w=500&q=85" },
    ],
  },
  {
    id: "painting",
    title: "Painting & Interiors",
    color: "#e11d48",
    bg: "#fff1f2",
    path: "/services/painter",
    items: [
      { label: "Wall Painting",   img: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=500&q=85" },
      { label: "Carpentry",       img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=85" },
      { label: "False Ceiling",   img: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=500&q=85" },
    ],
  },
  {
    id: "daily",
    title: "Daily Needs",
    color: "#0284c7",
    bg: "#e0f2fe",
    path: "/services",
    items: [
      { label: "Pest Control",    img: "https://images.unsplash.com/photo-1632933773545-1cba98a63b01?w=500&q=85" },
      { label: "Water Purifier",  img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=85" },
      { label: "CCTV Install",    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=85" },
    ],
  },
];

/* ══════════════════════════════════════════
   STYLES
══════════════════════════════════════════ */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --blue:#2563eb; --blue-d:#1d4ed8;
    --text:#0f172a; --text2:#475569; --text3:#94a3b8;
    --border:#e2e8f0; --surface:#f1f5f9; --white:#fff;
  }
  *{box-sizing:border-box;margin:0;padding:0;}

  @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

  .jd-sec{
    background:var(--white);
    border:1.5px solid var(--border);
    border-radius:16px;
    padding:18px 18px 20px;
    box-shadow:0 1px 5px rgba(0,0,0,.04);
    animation:up .4s ease both;
  }

  .jd-ic{
    border-radius:10px; overflow:hidden;
    border:1.5px solid var(--border);
    cursor:pointer; background:var(--white);
    transition:transform .24s cubic-bezier(.16,1,.3,1),box-shadow .24s,border-color .24s;
    animation:up .35s ease both;
  }
  .jd-ic:hover{transform:translateY(-5px);box-shadow:0 14px 32px rgba(0,0,0,.11);border-color:#93c5fd;}
  .jd-ic-wrap{overflow:hidden;position:relative;}
  .jd-ic img{width:100%;height:120px;object-fit:cover;display:block;transition:transform .45s cubic-bezier(.16,1,.3,1);}
  .jd-ic:hover img{transform:scale(1.08);}
  .jd-ic-lbl{
    padding:7px 8px 8px;font-size:11.5px;font-weight:700;
    color:var(--text);text-align:center;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    font-family:'DM Sans',sans-serif;
  }

  .jd-see{
    font-size:12px;font-weight:700;color:var(--blue);
    background:none;border:none;cursor:pointer;
    font-family:'DM Sans',sans-serif;
    display:inline-flex;align-items:center;gap:2px;
    transition:color .15s;padding:0;
  }
  .jd-see:hover{color:var(--blue-d);}

  .jd-promo{
    border-radius:14px;overflow:hidden;cursor:pointer;
    transition:transform .2s,box-shadow .2s;
    display:flex;align-items:center;justify-content:space-between;
    padding:22px 26px;gap:14px;
  }
  .jd-promo:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.14);}

  .jd-partner{
    background:linear-gradient(130deg,#0f172a 0%,#1e3a8a 55%,#2563eb 100%);
    border-radius:16px;padding:38px 44px;
    position:relative;overflow:hidden;
  }

  .jd-wrap{max-width:1240px;margin:0 auto;padding:0 18px;}
  .jd-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .jd-3img{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
  .jd-2ban{display:grid;grid-template-columns:1fr 1fr;gap:14px;}

  @media(max-width:900px){ .jd-ic img{height:100px!important;} }
  @media(max-width:700px){
    .jd-2col{grid-template-columns:1fr;}
    .jd-2ban{grid-template-columns:1fr;}
    .jd-ic img{height:95px!important;}
    .jd-partner{padding:26px 20px;}
    .jd-p-inner{flex-direction:column!important;gap:16px!important;}
    .jd-p-text{max-width:100%!important;}
    .jd-promo{padding:18px 20px;}
  }
  @media(max-width:480px){
    .jd-wrap{padding:0 11px;}
    .jd-sec{padding:14px 12px 16px;border-radius:13px;}
    .jd-ic img{height:82px!important;}
    .jd-ic-lbl{font-size:10.5px!important;}
    .jd-3img{gap:7px;}
    .jd-2col{gap:10px;}
    .jd-2ban{gap:10px;}
    .jd-partner{border-radius:13px;padding:22px 16px;}
  }
`;

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function MainLayout() {
  const nav = useNavigate();

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{S}</style>

      <div className="jd-wrap" style={{ paddingTop: "16px", paddingBottom: "64px", display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* ── PROMO BANNERS ── */}
        <div className="jd-2ban">

          {/* Home Services */}
          <div className="jd-promo" onClick={() => nav("/services")}
            style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%)" }}>
            <div>
              <div style={{ fontSize: "10.5px", color: "#93c5fd", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: "5px" }}>Book Today</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff", fontFamily: "'Sora',sans-serif", lineHeight: 1.15 }}>Home<br/>Services</div>
              <div style={{ fontSize: "12px", color: "#bfdbfe", marginTop: "6px" }}>Starting ₹199 only →</div>
            </div>
            {/* ← ART ICON */}
            <div style={{ width: "88px", height: "88px", borderRadius: "50%", background: "rgba(255,255,255,.13)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <HomeServiceArt />
            </div>
          </div>

          {/* Rooms & PG */}
          <div className="jd-promo" onClick={() => nav("/rooms")}
            style={{ background: "linear-gradient(135deg,#064e3b 0%,#059669 100%)" }}>
            <div>
              <div style={{ fontSize: "10.5px", color: "#6ee7b7", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: "5px" }}>Verified</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff", fontFamily: "'Sora',sans-serif", lineHeight: 1.15 }}>Rooms<br/>& PG</div>
              <div style={{ fontSize: "12px", color: "#a7f3d0", marginTop: "6px" }}>Near your location →</div>
            </div>
            {/* ← ART ICON */}
            <div style={{ width: "88px", height: "88px", borderRadius: "50%", background: "rgba(255,255,255,.13)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <RoomsPGArt />
            </div>
          </div>

        </div>

        {/* ── 2-COL SECTION GRID ── */}
        <div className="jd-2col">
          {SECTIONS.map((sec, si) => {
            const IconComp = SectionIcons[sec.id];
            return (
              <div key={sec.id} className="jd-sec" style={{ animationDelay: `${si * 0.05}s` }}>

                {/* header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "9px",
                      background: sec.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: `0 2px 8px ${sec.color}22`,
                    }}>
                      {IconComp ? <IconComp /> : null}
                    </div>
                    <div style={{ fontSize: "14.5px", fontWeight: 800, color: "var(--text)", fontFamily: "'Sora',sans-serif", letterSpacing: "-.2px" }}>
                      {sec.title}
                    </div>
                  </div>
                  <button className="jd-see" onClick={() => nav(sec.path)}>See All →</button>
                </div>

                {/* 3 image cards */}
                <div className="jd-3img">
                  {sec.items.map((item, ii) => (
                    <div key={item.label} className="jd-ic"
                      style={{ animationDelay: `${si * 0.04 + ii * 0.05}s` }}
                      onClick={() => nav(sec.path)}>
                      <div className="jd-ic-wrap">
                        <img src={item.img} alt={item.label} loading="lazy"/>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.2) 0%,transparent 55%)", pointerEvents: "none" }}/>
                      </div>
                      <div className="jd-ic-lbl">{item.label}</div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── PARTNER BANNER ── */}
        <div className="jd-partner">
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", bottom: "-30px", left: "20%", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,.03)", pointerEvents: "none" }}/>

          <div className="jd-p-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "28px", position: "relative" }}>
            <div className="jd-p-text" style={{ maxWidth: "500px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(147,197,253,.15)", border: "1px solid rgba(147,197,253,.3)", borderRadius: "100px", padding: "4px 12px", fontSize: "11px", color: "#93c5fd", fontWeight: 700, marginBottom: "12px" }}>
                🚀 Limited Spots Available
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", fontFamily: "'Sora',sans-serif", letterSpacing: "-.4px", lineHeight: 1.25, marginBottom: "9px" }}>
                Grow Your Business<br/>with CityMate
              </h2>
              <p style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.65 }}>
                Join 12,000+ verified professionals. Get more customers, manage bookings, and grow your income.
              </p>
              <div style={{ display: "flex", gap: "18px", marginTop: "14px", flexWrap: "wrap" }}>
                {["Zero Commission", "Instant Payouts", "Dedicated Support"].map(pt => (
                  <div key={pt} style={{ display: "flex", alignItems: "center", gap: "5px", color: "#bfdbfe", fontSize: "12px", fontWeight: 600 }}>
                    <span style={{ color: "#86efac" }}>✓</span>{pt}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", flexShrink: 0 }}>
              <button onClick={() => nav("/become-a-partner")}
                style={{ background: "#2563eb", color: "#fff", border: "none", padding: "12px 26px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 16px rgba(37,99,235,.4)", whiteSpace: "nowrap" }}>
                Join as Partner →
              </button>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Free to register. No hidden fees.</span>
            </div>
          </div>
        </div>

        <Outlet/>
      </div>
    </div>
  );
}