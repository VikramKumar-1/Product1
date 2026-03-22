import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════
   ILLUSTRATED ICON COMPONENTS — JustDial cartoon style
═══════════════════════════════════════════════════════ */

const HomeCleaningIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <circle cx="32" cy="14" r="8" fill="#FFDBB5" stroke="#333" strokeWidth="1.5"/>
    <path d="M20 52 C20 36 44 36 44 52" fill="#4A90D9" stroke="#333" strokeWidth="1.5"/>
    <path d="M25 38 L32 60 L39 38 Z" fill="#fff" stroke="#333" strokeWidth="1"/>
    <line x1="44" y1="35" x2="58" y2="55" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="57" cy="57" rx="6" ry="3" fill="#94D4F0" stroke="#333" strokeWidth="1"/>
    <path d="M24 12 Q32 6 40 12" fill="#5C3D1E" stroke="#333" strokeWidth="1"/>
    <circle cx="29" cy="15" r="1.2" fill="#333"/>
    <circle cx="35" cy="15" r="1.2" fill="#333"/>
    <path d="M29 19 Q32 22 35 19" stroke="#333" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <circle cx="10" cy="20" r="3" fill="none" stroke="#94D4F0" strokeWidth="1.5"/>
    <circle cx="16" cy="12" r="2" fill="none" stroke="#94D4F0" strokeWidth="1.5"/>
    <circle cx="8"  cy="12" r="1.5" fill="none" stroke="#94D4F0" strokeWidth="1.5"/>
  </svg>
);

const PlumberIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <circle cx="26" cy="14" r="8" fill="#FFDBB5" stroke="#333" strokeWidth="1.5"/>
    <path d="M14 52 C14 36 38 36 38 52" fill="#E8863A" stroke="#333" strokeWidth="1.5"/>
    <path d="M18 14 Q26 4 34 14" fill="#F5C518" stroke="#333" strokeWidth="1.5"/>
    <rect x="36" y="28" width="22" height="6" rx="3" fill="#9E9E9E" stroke="#333" strokeWidth="1.2"/>
    <circle cx="56" cy="31" r="4" fill="#757575" stroke="#333" strokeWidth="1.2"/>
    <circle cx="56" cy="31" r="2" fill="#9E9E9E"/>
    <rect x="38" y="44" width="18" height="5" rx="2.5" fill="#A0C4E8" stroke="#333" strokeWidth="1"/>
    <rect x="34" y="42" width="6"  height="9" rx="1"   fill="#A0C4E8" stroke="#333" strokeWidth="1"/>
    <path d="M48 52 Q48 58 44 58 Q40 58 40 54 Q40 50 44 48 Q48 50 48 52Z" fill="#4A90D9" stroke="#2171B5" strokeWidth="1"/>
    <circle cx="23" cy="15" r="1.2" fill="#333"/>
    <circle cx="29" cy="15" r="1.2" fill="#333"/>
    <path d="M23 19 Q26 22 29 19" stroke="#333" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

const ElectricianIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <circle cx="28" cy="14" r="8" fill="#FFDBB5" stroke="#333" strokeWidth="1.5"/>
    <path d="M16 52 C16 36 40 36 40 52" fill="#D32F2F" stroke="#333" strokeWidth="1.5"/>
    <path d="M20 14 Q28 4 36 14 L36 18 L20 18 Z" fill="#F5C518" stroke="#333" strokeWidth="1.5"/>
    <rect x="18" y="17" width="20" height="3" rx="1.5" fill="#E0B010" stroke="#333" strokeWidth="1"/>
    <polygon points="48,10 42,28 48,26 44,46 54,22 48,24" fill="#FDD835" stroke="#F57F17" strokeWidth="1.5"/>
    <line x1="50" y1="44" x2="58" y2="56" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round"/>
    <rect x="47" y="40" width="6" height="6" rx="1" fill="#F5C518" stroke="#333" strokeWidth="1"/>
    <circle cx="25" cy="15" r="1.2" fill="#333"/>
    <circle cx="31" cy="15" r="1.2" fill="#333"/>
    <path d="M25 19 Q28 22 31 19" stroke="#333" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

const CarpenterIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <circle cx="26" cy="13" r="8" fill="#FFDBB5" stroke="#333" strokeWidth="1.5"/>
    <path d="M14 52 C14 36 38 36 38 52" fill="#5D4037" stroke="#333" strokeWidth="1.5"/>
    <path d="M18 13 Q26 4 34 13" fill="#795548" stroke="#333" strokeWidth="1.5"/>
    <rect x="36" y="30" width="22" height="5" rx="2" fill="#9E9E9E" stroke="#333" strokeWidth="1.2"/>
    <path d="M36 35 L38 40 L40 35 L42 40 L44 35 L46 40 L48 35 L50 40 L52 35 L54 40 L56 35 L58 35" stroke="#616161" strokeWidth="1.2" fill="none"/>
    <rect x="8" y="46" width="30" height="8" rx="2" fill="#A1887F" stroke="#795548" strokeWidth="1.2"/>
    <line x1="14" y1="46" x2="14" y2="54" stroke="#795548" strokeWidth="0.8"/>
    <line x1="22" y1="46" x2="22" y2="54" stroke="#795548" strokeWidth="0.8"/>
    <line x1="30" y1="46" x2="30" y2="54" stroke="#795548" strokeWidth="0.8"/>
    <circle cx="23" cy="14" r="1.2" fill="#333"/>
    <circle cx="29" cy="14" r="1.2" fill="#333"/>
    <path d="M23 18 Q26 21 29 18" stroke="#333" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

const ACRepairIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <rect x="8" y="16" width="38" height="22" rx="5" fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.8"/>
    <rect x="12" y="20" width="30" height="14" rx="3" fill="#BBDEFB"/>
    <line x1="15" y1="24" x2="39" y2="24" stroke="#1565C0" strokeWidth="1.2"/>
    <line x1="15" y1="28" x2="39" y2="28" stroke="#1565C0" strokeWidth="1.2"/>
    <line x1="15" y1="32" x2="39" y2="32" stroke="#1565C0" strokeWidth="1.2"/>
    <circle cx="42" cy="22" r="2" fill="#F44336"/>
    <circle cx="42" cy="28" r="2" fill="#4CAF50"/>
    <g stroke="#42A5F5" strokeWidth="1.5" strokeLinecap="round">
      <line x1="54" y1="14" x2="54" y2="30"/>
      <line x1="46" y1="22" x2="62" y2="22"/>
      <line x1="49" y1="17" x2="59" y2="27"/>
      <line x1="59" y1="17" x2="49" y2="27"/>
    </g>
    <path d="M18 38 Q18 48 28 50 Q38 52 38 44" stroke="#90CAF9" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="50" cy="46" r="6" fill="#FFDBB5" stroke="#333" strokeWidth="1.2"/>
    <path d="M44 62 C44 54 56 54 56 62" fill="#1565C0" stroke="#333" strokeWidth="1.2"/>
    <circle cx="48" cy="47" r="0.9" fill="#333"/>
    <circle cx="52" cy="47" r="0.9" fill="#333"/>
  </svg>
);

const PestControlIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <rect x="8"  y="24" width="16" height="26" rx="4" fill="#66BB6A" stroke="#333" strokeWidth="1.5"/>
    <rect x="8"  y="18" width="16" height="8"  rx="2" fill="#43A047" stroke="#333" strokeWidth="1.3"/>
    <rect x="22" y="21" width="12" height="4"  rx="2" fill="#388E3C" stroke="#333" strokeWidth="1.2"/>
    <line x1="34" y1="23" x2="44" y2="18" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="46" cy="16" r="1.5" fill="#A5D6A7"/>
    <ellipse cx="46" cy="44" rx="8" ry="5" fill="#5D4037" stroke="#333" strokeWidth="1.2"/>
    <ellipse cx="46" cy="42" rx="5" ry="3" fill="#795548"/>
    <line x1="40" y1="42" x2="34" y2="38" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="40" y1="44" x2="34" y2="44" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="40" y1="46" x2="34" y2="50" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="52" y1="42" x2="58" y2="38" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="52" y1="44" x2="58" y2="44" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="52" y1="46" x2="58" y2="50" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const DeepCleaningIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <path d="M16 30 L20 56 L44 56 L48 30 Z" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.8"/>
    <rect x="14" y="26" width="36" height="6" rx="3" fill="#FDD835" stroke="#F9A825" strokeWidth="1.5"/>
    <path d="M22 26 Q32 14 42 26" stroke="#9E9E9E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M20 44 Q32 40 44 44 L44 56 L20 56 Z" fill="#81D4FA"/>
    <line x1="48" y1="14" x2="58" y2="46" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="49" cy="12" rx="6" ry="4" fill="#BDBDBD" stroke="#757575" strokeWidth="1.2"/>
    <circle cx="10" cy="28" r="4"   fill="none" stroke="#4FC3F7" strokeWidth="1.5"/>
    <circle cx="6"  cy="20" r="2.5" fill="none" stroke="#4FC3F7" strokeWidth="1.5"/>
    <circle cx="14" cy="18" r="2"   fill="none" stroke="#81D4FA" strokeWidth="1.2"/>
  </svg>
);

const PackersMoversIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <rect x="4"  y="28" width="36" height="22" rx="3" fill="#FFF9C4" stroke="#F57F17" strokeWidth="1.8"/>
    <path d="M40 36 L40 50 L56 50 L56 36 L50 28 L40 28 Z" fill="#FFE0B2" stroke="#F57F17" strokeWidth="1.8"/>
    <path d="M42 34 L50 34 L54 38 L54 34 L50 30 L42 34 Z" fill="#B3E5FC" stroke="#0288D1" strokeWidth="1"/>
    <circle cx="14" cy="52" r="6" fill="#616161" stroke="#333" strokeWidth="1.5"/>
    <circle cx="14" cy="52" r="3" fill="#9E9E9E"/>
    <circle cx="46" cy="52" r="6" fill="#616161" stroke="#333" strokeWidth="1.5"/>
    <circle cx="46" cy="52" r="3" fill="#9E9E9E"/>
    <rect x="10" y="30" width="24" height="16" rx="2" fill="#FFCC02" stroke="#F57F17" strokeWidth="1.2"/>
    <line x1="22" y1="30" x2="22" y2="46" stroke="#F57F17" strokeWidth="1"/>
    <line x1="10" y1="38" x2="34" y2="38" stroke="#F57F17" strokeWidth="1"/>
  </svg>
);

const VerifiedPGIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <path d="M32 8 L6 30 L10 30 L10 56 L54 56 L54 30 L58 30 Z" fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.8"/>
    <path d="M32 8 L6 30 L58 30 Z" fill="#90CAF9" stroke="#1565C0" strokeWidth="1.5"/>
    <rect x="26" y="40" width="12" height="16" rx="2" fill="#A0522D" stroke="#333" strokeWidth="1.2"/>
    <circle cx="35" cy="48" r="1.2" fill="#FFD700"/>
    <rect x="14" y="36" width="10" height="9" rx="2" fill="#B3E5FC" stroke="#1565C0" strokeWidth="1"/>
    <rect x="40" y="36" width="10" height="9" rx="2" fill="#B3E5FC" stroke="#1565C0" strokeWidth="1"/>
    <circle cx="50" cy="18" r="10" fill="#4CAF50" stroke="#fff" strokeWidth="2"/>
    <path d="M44 18 L48 22 L56 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="32" y="29" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1565C0">PG</text>
  </svg>
);

const LuxuryFlatsIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <rect x="12" y="18" width="40" height="40" rx="3" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.8"/>
    <line x1="12" y1="30" x2="52" y2="30" stroke="#7986CB" strokeWidth="0.8"/>
    <line x1="12" y1="42" x2="52" y2="42" stroke="#7986CB" strokeWidth="0.8"/>
    <rect x="17" y="21" width="8" height="7" rx="1.5" fill="#B3E5FC" stroke="#0288D1" strokeWidth="0.8"/>
    <rect x="29" y="21" width="8" height="7" rx="1.5" fill="#B3E5FC" stroke="#0288D1" strokeWidth="0.8"/>
    <rect x="41" y="21" width="8" height="7" rx="1.5" fill="#B3E5FC" stroke="#0288D1" strokeWidth="0.8"/>
    <rect x="17" y="33" width="8" height="7" rx="1.5" fill="#B3E5FC" stroke="#0288D1" strokeWidth="0.8"/>
    <rect x="29" y="33" width="8" height="7" rx="1.5" fill="#B3E5FC" stroke="#0288D1" strokeWidth="0.8"/>
    <rect x="41" y="33" width="8" height="7" rx="1.5" fill="#B3E5FC" stroke="#0288D1" strokeWidth="0.8"/>
    <rect x="12" y="12" width="40" height="8" rx="2" fill="#3949AB" stroke="#283593" strokeWidth="1.2"/>
    <polygon points="32,4 33.5,9 38,9 34.5,12 36,17 32,14 28,17 29.5,12 26,9 30.5,9" fill="#FFD700" stroke="#FFA000" strokeWidth="0.8"/>
    <rect x="27" y="48" width="10" height="10" rx="1" fill="#7986CB" stroke="#3949AB" strokeWidth="1"/>
    <circle cx="34" cy="53" r="1" fill="#FFD700"/>
  </svg>
);

const EmergencyPlumbingIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <circle cx="32" cy="12" r="8" fill="#F44336" stroke="#B71C1C" strokeWidth="1.5"/>
    <circle cx="32" cy="12" r="4" fill="#FFCDD2"/>
    <rect x="8"  y="36" width="48" height="10" rx="5" fill="#90CAF9" stroke="#1565C0" strokeWidth="1.8"/>
    <path d="M28 36 Q32 28 36 36" fill="#64B5F6" stroke="#1565C0" strokeWidth="1"/>
    <path d="M22 46 Q20 52 22 56 Q24 60 22 56" fill="#42A5F5" stroke="#1565C0" strokeWidth="1"/>
    <path d="M34 46 Q32 54 34 58 Q36 62 34 58" fill="#42A5F5" stroke="#1565C0" strokeWidth="1"/>
    <path d="M46 46 Q44 52 46 56 Q48 60 46 56" fill="#42A5F5" stroke="#1565C0" strokeWidth="1"/>
  </svg>
);

const PainterIcon = () => (
  <svg viewBox="0 0 64 64" width="46" height="46" fill="none">
    <circle cx="28" cy="13" r="8" fill="#FFDBB5" stroke="#333" strokeWidth="1.5"/>
    <path d="M16 52 C16 36 40 36 40 52" fill="#FFFFFF" stroke="#333" strokeWidth="1.5"/>
    <circle cx="20" cy="40" r="2"   fill="#E53935" opacity="0.7"/>
    <circle cx="35" cy="44" r="1.5" fill="#1E88E5" opacity="0.7"/>
    <circle cx="26" cy="48" r="1.8" fill="#43A047" opacity="0.7"/>
    <line x1="40" y1="24" x2="52" y2="14" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="50" y="8" width="12" height="10" rx="3" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5"/>
    <path d="M52 18 Q52 24 50 26" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M56 18 Q56 26 54 28" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <ellipse cx="10" cy="50" rx="8" ry="3"   fill="#FFEB3B" stroke="#F9A825" strokeWidth="1.2"/>
    <rect    x="2"  y="44" width="16" height="8" rx="2" fill="#FDD835" stroke="#F9A825" strokeWidth="1.2"/>
    <ellipse cx="10" cy="44" rx="8" ry="2.5"   fill="#FFF176" stroke="#F9A825" strokeWidth="1"/>
    <circle cx="25" cy="14" r="1.2" fill="#333"/>
    <circle cx="31" cy="14" r="1.2" fill="#333"/>
    <path d="M25 18 Q28 21 31 18" stroke="#333" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════
   SERVICE DATA
═══════════════════════════════════════════════════════ */
const CITYMATE_SERVICES = [
  { label: "Home Cleaning",      bg: "#E3F2FD", Icon: HomeCleaningIcon,     path: "home-cleaning"      },
  { label: "Plumber",            bg: "#E1F5FE", Icon: PlumberIcon,           path: "plumber"            },
  { label: "Electrician",        bg: "#FFF9C4", Icon: ElectricianIcon,       path: "electrician"        },
  { label: "Carpenter",          bg: "#EFEBE9", Icon: CarpenterIcon,         path: "carpenter"          },
  { label: "AC Repair",          bg: "#E3F2FD", Icon: ACRepairIcon,          path: "ac-repair"          },
  { label: "Pest Control",       bg: "#E8F5E9", Icon: PestControlIcon,       path: "pest-control"       },
  { label: "Deep Cleaning",      bg: "#FFFDE7", Icon: DeepCleaningIcon,      path: "deep-cleaning"      },
  { label: "Packers & Movers",   bg: "#FFF3E0", Icon: PackersMoversIcon,     path: "packers-movers"     },
  { label: "Verified PGs",       bg: "#E8EAF6", Icon: VerifiedPGIcon,        path: "verified-pgs"       },
  { label: "Luxury Flats",       bg: "#EDE7F6", Icon: LuxuryFlatsIcon,       path: "luxury-flats"       },
  { label: "Emergency Plumbing", bg: "#FFEBEE", Icon: EmergencyPlumbingIcon, path: "emergency-plumbing" },
  { label: "Painter",            bg: "#F1F8E9", Icon: PainterIcon,           path: "painter"            },
];

/* ═══════════════════════════════════════════════════════
   HERO CAROUSEL DATA
═══════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85",
    tag: "🏠 Home Services",
    title: "Professional Home Cleaning",
    sub: "Trusted cleaners at your doorstep",
    bg: "rgba(21,101,192,0.55)",
  },
  {
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85",
    tag: "🛏️ Rooms & PG",
    title: "Verified PGs & Luxury Flats",
    sub: "Comfort living in your city",
    bg: "rgba(69,39,160,0.55)",
  },
  {
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=85",
    tag: "❄️ AC Repair",
    title: "AC Service & Repair",
    sub: "Same-day installation & servicing",
    bg: "rgba(1,87,155,0.55)",
  },
  {
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1400&q=85",
    tag: "📷 CCTV & Security",
    title: "CCTV Installation & Monitoring",
    sub: "Keep your home & office safe 24/7",
    bg: "rgba(27,94,32,0.55)",
  },
  {
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=85",
    tag: "💇 Salon & Beauty",
    title: "Salon Services at Home",
    sub: "Expert beauticians at your door",
    bg: "rgba(136,14,79,0.55)",
  },
];

/* ═══════════════════════════════════════════════════════
   HERO CAROUSEL
═══════════════════════════════════════════════════════ */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const total = HERO_SLIDES.length;

  const goTo = (idx: number) => setCurrent((idx + total) % total);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % total), 3200);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (Math.abs(diff) > 40) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetTimer(); }
  };
  const onMouseDown  = (e: React.MouseEvent) => { isDragging.current = true; startX.current = e.clientX; };
  const onMouseUp    = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (Math.abs(diff) > 40) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetTimer(); }
  };

  return (
    <div style={{ background: "#fff", padding: "10px 16px 10px", borderBottom: "1.5px solid #DBEAFE" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{ overflow: "hidden", borderRadius: "14px", cursor: "grab", userSelect: "none" }}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}   onMouseUp={onMouseUp}
          onMouseLeave={() => { isDragging.current = false; }}>
          <div style={{
            display: "flex",
            transition: "transform 0.45s cubic-bezier(.16,1,.3,1)",
            transform: `translateX(-${current * 100}%)`,
            willChange: "transform",
          }}>
            {HERO_SLIDES.map((slide, i) => (
              <div key={i} style={{
                flex: "0 0 100%", minWidth: "100%",
                height: "300px", position: "relative",
                overflow: "hidden", borderRadius: "14px",
              }}>
                <img src={slide.img} alt={slide.title} draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${slide.bg} 0%, rgba(0,0,0,0.15) 70%, transparent 100%)` }} />
                <div style={{ position: "absolute", bottom: "14px", left: "16px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "20px", padding: "2px 9px", display: "inline-block", marginBottom: "5px", letterSpacing: "0.04em" }}>
                    {slide.tag}
                  </div>
                  <div style={{ fontSize: "clamp(14px,3vw,18px)", fontWeight: 900, color: "#fff", fontFamily: "'Nunito',sans-serif", lineHeight: 1.2, textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}>
                    {slide.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", fontWeight: 500, marginTop: "2px", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
                    {slide.sub}
                  </div>
                </div>
                <div style={{ position: "absolute", top: "10px", right: "12px", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "2px 9px", fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
                  {i + 1} / {total}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "8px" }}>
          {HERO_SLIDES.map((_, i) => (
            <div key={i} onClick={() => { goTo(i); resetTimer(); }}
              style={{ width: i === current ? "18px" : "5px", height: "5px", borderRadius: "3px", background: i === current ? "#2563EB" : "#BFDBFE", cursor: "pointer", transition: "all 0.3s cubic-bezier(.16,1,.3,1)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LOCATION BUTTON
═══════════════════════════════════════════════════════ */
function LocationButton({ locVal, setLocVal }: { locVal: string; setLocVal: (v: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState(locVal);

  useEffect(() => { setInputVal(locVal); }, [locVal]);

  const handleCommit = () => {
    const trimmed = inputVal.trim();
    if (!trimmed || trimmed === locVal) return;
    setLoading(true);
    setTimeout(() => { setLocVal(trimmed); setLoading(false); }, 600);
  };

  return (
    <div className="cm-loc-box" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", borderRight: "1.5px solid #BFDBFE", width: "200px", flexShrink: 0, background: "transparent" }}>
      {loading ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ animation: "cm-spin 0.8s linear infinite", flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="40 20" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#2563EB" style={{ flexShrink: 0 }}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
        </svg>
      )}
      <input className="cm-input cm-loc-input" value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={e => { if (e.key === "Enter") { (e.target as HTMLInputElement).blur(); handleCommit(); } }}
        placeholder="Enter location"
        style={{ fontSize: "13px", color: "#111827" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE MENU — word-by-word animation + hover/active
═══════════════════════════════════════════════════════ */

const MOBILE_MENU_STYLES = `
  @keyframes mm-backdrop {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes mm-slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes mm-word {
    from { opacity: 0; transform: translateY(6px) scale(0.96); filter: blur(2px); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    filter: blur(0);   }
  }

  .mm-backdrop {
    position: fixed; inset: 0; z-index: 9998;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(6px);
    animation: mm-backdrop 0.25s ease both;
  }

  .mm-drawer {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 78%; max-width: 300px;
    z-index: 9999;
    background: #fff;
    padding: 28px 20px;
    display: flex; flex-direction: column;
    box-shadow: -8px 0 40px rgba(0,0,0,0.18);
    animation: mm-slide-in 0.32s cubic-bezier(0.16,1,0.3,1) both;
    overflow-y: auto;
  }

  .mm-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 13px 12px;
    border-radius: 11px;
    margin-bottom: 4px;
    transition: background 0.18s;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
  }
  .mm-nav-item:hover  { background: #EFF6FF; }
  .mm-nav-item:active { background: #DBEAFE; }

  .mm-nav-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: transform 0.18s;
  }
  .mm-nav-item:hover .mm-nav-icon { transform: scale(1.1); }

  .mm-nav-label {
    font-size: 15.5px; font-weight: 700;
    color: #111827;
    font-family: 'DM Sans', sans-serif;
    display: flex; flex-wrap: wrap; gap: 5px;
    line-height: 1;
  }

  .mm-word {
    display: inline-block;
    opacity: 0;
    animation: mm-word 0.38s cubic-bezier(0.16,1,0.3,1) both;
  }

  .mm-nav-sub {
    font-size: 11px;
    color: #94A3B8;
    font-weight: 500;
    margin-top: 2px;
    font-family: 'DM Sans', sans-serif;
    opacity: 0;
    animation: mm-word 0.38s cubic-bezier(0.16,1,0.3,1) both;
  }

  .mm-arrow {
    margin-left: auto;
    color: #CBD5E1;
    transition: transform 0.18s, color 0.18s;
    flex-shrink: 0;
  }
  .mm-nav-item:hover .mm-arrow {
    transform: translateX(3px);
    color: #2563EB;
  }

  .mm-divider {
    height: 1px;
    background: #F1F5F9;
    margin: 8px 0;
  }

  .mm-section-label {
    font-size: 10px;
    font-weight: 800;
    color: #94A3B8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 12px;
    margin-bottom: 6px;
    font-family: 'DM Sans', sans-serif;
    opacity: 0;
    animation: mm-word 0.35s ease both;
  }
`;

const NAV_ITEMS = [
  {
    label: "Services",
    sub: "Home cleaning, plumbing & more",
    path: "/services",
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    label: "Rooms & PG",
    sub: "Verified PGs, flats & hostels",
    path: "/rooms",
    iconBg: "#F0FDF4",
    iconColor: "#16A34A",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Become a Partner",
    sub: "Grow your business with us",
    path: "/become-a-partner",
    iconBg: "#FFFBEB",
    iconColor: "#D97706",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

/* Word-by-word animated label */
function AnimatedLabel({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <span className="mm-nav-label">
      {text.split(" ").map((word, i) => (
        <span key={i} className="mm-word" style={{ animationDelay: `${baseDelay + i * 0.07}s` }}>
          {word}
        </span>
      ))}
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <style>{MOBILE_MENU_STYLES}</style>

      {/* Backdrop */}
      <div className="mm-backdrop" onClick={onClose} />

      {/* Drawer */}
      <div className="mm-drawer">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(37,99,235,0.3)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2"  y="2"  width="9" height="9" rx="2" fill="#fff" opacity="0.95"/>
                <rect x="13" y="2"  width="9" height="9" rx="2" fill="#fff" opacity="0.6"/>
                <rect x="2"  y="13" width="9" height="9" rx="2" fill="#fff" opacity="0.6"/>
                <rect x="13" y="13" width="9" height="9" rx="2" fill="#fff" opacity="0.95"/>
              </svg>
            </div>
            <span style={{ fontWeight: 900, fontSize: "19px", fontFamily: "'Nunito',sans-serif" }}>
              <span style={{ color: "#111827" }}>City</span>
              <span style={{ color: "#2563EB" }}>Mate</span>
            </span>
          </div>
          <button onClick={onClose}
            style={{ background: "#EFF6FF", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0, transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#DBEAFE")}
            onMouseLeave={e => (e.currentTarget.style.background = "#EFF6FF")}>
            ✕
          </button>
        </div>

        {/* Section label */}
        <div className="mm-section-label" style={{ animationDelay: "0.05s" }}>Navigation</div>

        {/* Nav Items */}
        {NAV_ITEMS.map((item, idx) => (
          <div key={item.label} className="mm-nav-item" onClick={() => handleNav(item.path)}>
            <div className="mm-nav-icon" style={{ background: item.iconBg }}>
              {item.icon}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 }}>
              <AnimatedLabel text={item.label} baseDelay={0.1 + idx * 0.06} />
              <span
                className="mm-nav-sub"
                style={{ animationDelay: `${0.18 + idx * 0.06}s` }}>
                {item.sub}
              </span>
            </div>
            <span className="mm-arrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </span>
          </div>
        ))}

        <div className="mm-divider" />

        {/* CTA Buttons */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingTop: "12px" }}>
          <button onClick={() => handleNav("/login")}
            style={{ width: "100%", background: "#fff", color: "#2563EB", border: "2px solid #2563EB", padding: "12px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "background 0.15s, border-color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#EFF6FF")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            onMouseDown={e => (e.currentTarget.style.background = "#DBEAFE")}
            onMouseUp={e => (e.currentTarget.style.background = "#EFF6FF")}>
            Login
          </button>
          <button onClick={() => handleNav("/signup")}
            style={{ width: "100%", background: "#2563EB", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1D4ED8")}
            onMouseLeave={e => (e.currentTarget.style.background = "#2563EB")}
            onMouseDown={e => (e.currentTarget.style.background = "#1E40AF")}
            onMouseUp={e => (e.currentTarget.style.background = "#1D4ED8")}>
            Register Free
          </button>
        </div>

      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function CityMateNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [searchVal,  setSearchVal]  = useState("");
  const [locVal,     setLocVal]     = useState("Khatima, Uttarakhand");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#F0F7FF", color: "#1E3A8A" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Nunito:wght@700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes iconPop   { 0%{transform:scale(1)} 40%{transform:scale(1.14)} 100%{transform:scale(1)} }
        @keyframes cm-spin   { to { transform: rotate(360deg); } }

        .cm-input { color:#111827 !important; }
        .cm-input::placeholder { color:#9CA3AF !important; opacity:1; }
        .cm-input::-webkit-input-placeholder { color:#9CA3AF !important; }
        .cm-input::-moz-placeholder { color:#9CA3AF !important; opacity:1; }

        .cm-card {
          display:flex; flex-direction:column; align-items:center; gap:10px;
          cursor:pointer; padding:8px 6px; border-radius:14px;
          transition:background 0.2s, transform 0.2s;
          animation:fadeUp 0.45s ease both;
        }
        .cm-card:hover { background:rgba(37,99,235,0.06); transform:translateY(-4px); }

        .cm-icon-box {
          width:72px; height:72px; border-radius:18px;
          display:flex; align-items:center; justify-content:center;
          border:1.5px solid rgba(0,0,0,0.07);
          box-shadow:0 3px 12px rgba(0,0,0,0.08);
          transition:box-shadow 0.2s, transform 0.2s;
          position:relative; overflow:hidden;
        }
        .cm-card:hover .cm-icon-box {
          box-shadow:0 10px 28px rgba(37,99,235,0.18);
          transform:scale(1.06);
          animation:iconPop 0.35s ease forwards;
        }

        .cm-label {
          font-size:12px; font-weight:700; text-align:center;
          line-height:1.35; max-width:80px; color:#1E40AF;
          letter-spacing:-0.1px;
        }

        .cm-input {
          border:none; outline:none; background:transparent;
          font-family:'DM Sans',sans-serif; font-size:14px; color:#111827; width:100%;
        }

        .cm-btn {
          background:#2563EB; color:#fff; border:none;
          cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:700;
          transition:background 0.18s;
        }
        .cm-btn:hover { background:#1D4ED8; }

        .cm-btn-ghost {
          background:#fff; color:#2563EB; border:1.5px solid #BFDBFE;
          cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:700;
          transition:all 0.18s;
        }
        .cm-btn-ghost:hover { background:#EFF6FF; border-color:#2563EB; }

        .cm-navlink {
          font-size:13.5px; font-weight:600; color:#374151;
          text-decoration:none; padding:4px 0;
          border-bottom:2px solid transparent; transition:all 0.18s;
        }
        .cm-navlink:hover { color:#2563EB; border-bottom-color:#2563EB; }

        .cm-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:6px; }

        @media (max-width:1024px) { .cm-grid { grid-template-columns:repeat(4,1fr) !important; } }
        @media (max-width:768px) {
          .cm-desktop { display:none !important; }
          .cm-mobile  { display:flex !important; }
          .cm-grid    { grid-template-columns:repeat(4,1fr) !important; gap:12px 8px !important; }
          .cm-search-row { flex-direction:column !important; border-radius:12px !important; }
          .cm-loc-box    { border-right:none !important; border-bottom:1.5px solid #BFDBFE !important; width:100% !important; }
        }
        @media (max-width:500px) {
          .cm-grid { grid-template-columns:repeat(3,1fr) !important; }
          .cm-icon-box { width:62px !important; height:62px !important; border-radius:15px !important; }
          .cm-label { font-size:11px !important; max-width:68px !important; }
        }
        @media (max-width:360px) {
          .cm-grid { grid-template-columns:repeat(3,1fr) !important; gap:8px 4px !important; }
          .cm-icon-box { width:56px !important; height:56px !important; }
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav style={{
        background: "#fff", borderBottom: "1.5px solid #DBEAFE",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        boxShadow: scrolled ? "0 4px 20px rgba(37,99,235,0.12)" : "0 1px 4px rgba(37,99,235,0.05)",
        transition: "box-shadow 0.3s",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: "14px" }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2"  y="2"  width="9" height="9" rx="2" fill="#fff" opacity="0.95"/>
                  <rect x="13" y="2"  width="9" height="9" rx="2" fill="#fff" opacity="0.6"/>
                  <rect x="2"  y="13" width="9" height="9" rx="2" fill="#fff" opacity="0.6"/>
                  <rect x="13" y="13" width="9" height="9" rx="2" fill="#fff" opacity="0.95"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "21px", fontWeight: 900, fontFamily: "'Nunito',sans-serif", lineHeight: 1.05, letterSpacing: "-0.3px" }}>
                  <span style={{ color: "#111827" }}>City</span><span style={{ color: "#2563EB" }}>Mate</span>
                </div>
                <div style={{ fontSize: "9px", color: "#93C5FD", fontWeight: 600, letterSpacing: "0.04em" }}>Your City. Simplified.</div>
              </div>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="cm-desktop" style={{ flex: 1, maxWidth: "580px" }}>
            <div className="cm-search-row" style={{ display: "flex", alignItems: "center", border: "2px solid #2563EB", borderRadius: "10px", overflow: "hidden", height: "46px", background: "#fff", boxShadow: "0 2px 14px rgba(37,99,235,0.12)" }}>
              <LocationButton locVal={locVal} setLocVal={setLocVal} />
              <input className="cm-input" value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="Search services" style={{ flex: 1, padding: "0 14px" }}
                onKeyDown={e => e.key === "Enter" && navigate("/search")} />
              <button className="cm-btn" onClick={() => navigate("/search")}
                style={{ padding: "0 22px", height: "100%", fontSize: "14px", borderRadius: "0", flexShrink: 0, display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="2.2"/>
                  <path d="M21 21l-4.35-4.35" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="cm-desktop" style={{ display: "flex", alignItems: "center", gap: "18px", marginLeft: "auto" }}>
            <Link to="/services"         className="cm-navlink">Services</Link>
            <Link to="/rooms"            className="cm-navlink">Rooms</Link>
            <Link to="/become-a-partner" className="cm-navlink" style={{ color: "#2563EB", fontWeight: 700 }}>Become a Partner</Link>
            <div style={{ width: "1px", height: "18px", background: "#BFDBFE" }} />
            <button className="cm-btn-ghost" onClick={() => navigate("/login")}
              style={{ padding: "7px 16px", fontSize: "13px", borderRadius: "8px" }}>Login</button>
            <button className="cm-btn" onClick={() => navigate("/signup")}
              style={{ padding: "8px 18px", fontSize: "13px", borderRadius: "8px" }}>Sign up</button>
          </div>

          {/* Mobile buttons */}
          <div className="cm-mobile" style={{ display: "none", marginLeft: "auto", alignItems: "center", gap: "8px" }}>
            <button className="cm-btn" onClick={() => navigate("/signup")}
              style={{ padding: "8px 14px", fontSize: "13px", borderRadius: "8px" }}>Join</button>
            <button onClick={() => setMobileOpen(true)}
              style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", padding: "9px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: "68px" }}/>

      {/* Mobile Search Bar */}
      <div className="cm-mobile" style={{ display: "none", padding: "10px 14px", background: "#fff", borderBottom: "1.5px solid #DBEAFE" }}>
        <div style={{ display: "flex", border: "2px solid #2563EB", borderRadius: "10px", overflow: "hidden", width: "100%", height: "44px", background: "#fff" }}>
          <input className="cm-input" placeholder="Search cleaning, PG, plumbing…"
            style={{ flex: 1, padding: "0 14px" }}
            onKeyDown={e => e.key === "Enter" && navigate("/search")} />
          <button className="cm-btn" onClick={() => navigate("/search")}
            style={{ padding: "0 16px", borderRadius: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="2.2"/>
              <path d="M21 21l-4.35-4.35" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ══ HERO CAROUSEL ══ */}
      <HeroCarousel />

      {/* ══ SERVICE ICON GRID ══ */}
      <div style={{ background: "#fff", padding: "22px 16px 24px", borderBottom: "1.5px solid #DBEAFE" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#1E3A8A", fontFamily: "'Nunito',sans-serif", lineHeight: 1 }}>
                Our Services
              </h2>
              <p style={{ fontSize: "12px", color: "#93C5FD", marginTop: "3px", fontWeight: 500 }}>
                Trusted professionals near {locVal}
              </p>
            </div>
          </div>
          <div className="cm-grid">
            {CITYMATE_SERVICES.map((svc, i) => (
              <div key={svc.label} className="cm-card"
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => navigate(`/services/${svc.path}`)}>
                <div className="cm-icon-box" style={{ background: svc.bg }}>
                  <svc.Icon />
                </div>
                <span className="cm-label">{svc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE MENU ══ */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </div>
  );
}