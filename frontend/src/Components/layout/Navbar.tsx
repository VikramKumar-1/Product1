import { useState, useEffect } from "react";
import {
  IconMapPin, IconMenu2, IconX, IconSearch, IconLayoutGrid,
  IconBolt, IconChevronDown, IconBriefcase
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

function MobileMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const links = ["Services", "Rooms", "Become a Partner", "Login", "Support"];

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(12px)",
        }}
      />
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "80%", maxWidth: "320px",
          zIndex: 9999,
          background: "#fff",
          padding: "32px 24px",
          display: "flex", flexDirection: "column",
          boxShadow: "-10px 0 60px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <span style={{ fontWeight: 800, fontSize: "20px", color: "#111827", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            CityMate
          </span>
          <button
            onClick={onClose}
            style={{
              background: "#f3f4f6", border: "none", borderRadius: "50%",
              width: "40px", height: "40px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#4b5563",
            }}
          >
            <IconX size={20} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {links.map((link, i) => (
            <div
              key={link}
              style={{
                fontSize: "20px", fontWeight: 700, color: "#111827", cursor: "pointer",
                animation: `slideIn 0.35s ease forwards ${i * 0.07}s`,
                opacity: 0, transform: "translateX(20px)",
              }}
              onClick={() => {
                const path =
                  link === "Become a Partner"
                    ? "/become-a-partner"
                    : `/${link.toLowerCase().replace(/ /g, "-")}`;
                navigate(path);
                onClose();
              }}
            >
              {link}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "32px" }}>
          <button
            onClick={() => { navigate("/signup"); onClose(); }}
            style={{
              width: "100%", background: "#2563eb", color: "#fff",
              border: "none", padding: "14px", borderRadius: "12px",
              fontWeight: 700, fontSize: "15px", cursor: "pointer",
            }}
          >
            Join Free
          </button>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState("Khatima, Uttarakhand");
  const [isDetecting, setIsDetecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setLocation("Detecting...");
      setTimeout(() => {
        setLocation("Khatima, Uttarakhand");
        setIsDetecting(false);
      }, 1200);
    }, 600);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        color: "#111827",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        @keyframes slideIn   { to { opacity: 1; transform: translateX(0); } }
        @keyframes kenBurns  { from { transform: scale(1); } to { transform: scale(1.12); } }
        @keyframes fadeUp    { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

        /* ── NAVBAR ── */
        .nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: background 0.4s ease, box-shadow 0.4s ease, height 0.3s ease,
                      border-color 0.4s ease;
        }
        .nav-fixed.nav-top {
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          box-shadow: none;
        }
        .nav-fixed.nav-scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #f1f5f9;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
        }

        /* Nav link colors flip with scroll */
        .nav-fixed.nav-top  .nav-link        { color: rgba(255,255,255,0.9) !important; }
        .nav-fixed.nav-top  .nav-link:hover  { color: #fff !important; }
        .nav-fixed.nav-top  .nav-logo-text   { color: #fff !important; }
        .nav-fixed.nav-top  .nav-login-btn   { color: #fff !important; }
        .nav-fixed.nav-top  .nav-partner-btn { color: rgba(255,255,255,0.9) !important; }
        .nav-fixed.nav-top  .nav-divider     { background: rgba(255,255,255,0.25) !important; }
        .nav-fixed.nav-top  .nav-join-btn    { background: #fff !important; color: #2563eb !important; }
        .nav-fixed.nav-top  .nav-loc-label   { color: rgba(255,255,255,0.6) !important; }
        .nav-fixed.nav-top  .nav-loc-value   { color: #fff !important; }
        .nav-fixed.nav-top  .nav-loc-arrow   { color: rgba(255,255,255,0.5) !important; }
        .nav-fixed.nav-top  .mobile-menu-btn { background: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.2) !important; color: #fff !important; }
        .nav-fixed.nav-top  .mobile-join-btn { background: rgba(255,255,255,0.2) !important; color: #fff !important; }

        /* Location pill */
        .location-trigger {
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          padding: 6px 10px; border-radius: 8px; transition: background 0.2s;
        }
        .location-trigger:hover { background: rgba(255,255,255,0.12); }
        .nav-scrolled .location-trigger:hover { background: #f1f5f9; }

        /* Search bar */
        .search-pill-simple {
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 16px;
          padding: 10px 10px 10px 22px;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          width: 100%; transition: all 0.3s;
        }
        .search-pill-simple:focus-within {
          border-color: #2563eb;
          box-shadow: 0 24px 70px rgba(37,99,235,0.22);
          transform: translateY(-3px);
        }

        /* Quick-tag pills */
        .quick-tag {
          font-size: 12px; color: rgba(255,255,255,0.85); font-weight: 600;
          cursor: pointer; border: 1px solid rgba(255,255,255,0.3);
          padding: 7px 18px; border-radius: 100px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(6px);
          transition: all 0.2s;
        }
        .quick-tag:hover { background: rgba(255,255,255,0.25); color: #fff; border-color: rgba(255,255,255,0.6); }

        /* Hero text animation */
        .hero-badge  { animation: fadeUp 0.7s ease 0.1s both; }
        .hero-title  { animation: fadeUp 0.7s ease 0.25s both; }
        .hero-sub    { animation: fadeUp 0.7s ease 0.4s both; }
        .hero-search { animation: fadeUp 0.7s ease 0.55s both; }
        .hero-tags   { animation: fadeUp 0.7s ease 0.7s both; }

        /* ── RESPONSIVE ── */
        @media (min-width: 769px) {
          .desktop-nav-items { display: flex !important; }
          .mobile-nav-items  { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav-items { display: none !important; }
          .mobile-nav-items  { display: flex !important; align-items: center; gap: 10px; }
        }

        /* Input placeholder */
        .hero-input::placeholder { color: #94a3b8; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nav-fixed ${scrolled ? "nav-scrolled" : "nav-top"}`}
        style={{ height: scrolled ? "68px" : "82px" }}
      >
        <div
          style={{
            maxWidth: "1280px", margin: "0 auto",
            padding: "0 20px", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Left: Logo + Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div
                style={{
                  background: scrolled ? "#2563eb" : "rgba(255,255,255,0.2)",
                  width: "36px", height: "36px", borderRadius: "10px",
                  color: scrolled ? "#fff" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.4s",
                  border: scrolled ? "none" : "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <IconLayoutGrid size={20} stroke={2.5} />
              </div>
              <span
                className="nav-logo-text"
                style={{
                  fontSize: "22px", fontWeight: 800,
                  color: "#111827",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "color 0.4s",
                }}
              >
                CityMate
              </span>
            </Link>

            {/* Location — desktop only */}
            <div className="desktop-nav-items" onClick={handleDetectLocation}>
              <div className="location-trigger">
                <IconMapPin size={18} color={scrolled ? "#2563eb" : "rgba(255,255,255,0.9)"} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    className="nav-loc-label"
                    style={{
                      fontSize: "10px", fontWeight: 800,
                      color: "#64748b", textTransform: "uppercase",
                      transition: "color 0.4s",
                    }}
                  >
                    Your Location
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      className="nav-loc-value"
                      style={{
                        fontSize: "13px", fontWeight: 700,
                        color: "#111827", transition: "color 0.4s",
                      }}
                    >
                      {isDetecting ? "Detecting..." : location}
                    </span>
                    <IconChevronDown
                      size={13}
                      className="nav-loc-arrow"
                      style={{ color: "#64748b", transition: "color 0.4s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Desktop links */}
          <div
            className="desktop-nav-items"
            style={{ display: "flex", alignItems: "center", gap: "26px" }}
          >
            <Link to="/services"
              className="nav-link"
              style={{ textDecoration: "none", color: "#4b5563", fontWeight: 600, fontSize: "14px", transition: "color 0.4s" }}
            >
              Services
            </Link>
            <Link to="/rooms"
              className="nav-link"
              style={{ textDecoration: "none", color: "#4b5563", fontWeight: 600, fontSize: "14px", transition: "color 0.4s" }}
            >
              Rooms
            </Link>

            <button
              onClick={() => navigate("/become-a-partner")}
              className="nav-partner-btn"
              style={{
                background: "none", border: "none",
                color: "#2563eb", fontWeight: 700, fontSize: "14px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                transition: "color 0.4s",
              }}
            >
              <IconBriefcase size={17} /> Become a Partner
            </button>

            <div className="nav-divider" style={{ width: "1px", height: "20px", background: "#e2e8f0", transition: "background 0.4s" }} />

            <button
              onClick={() => navigate("/login")}
              className="nav-login-btn"
              style={{
                background: "none", border: "none",
                color: "#111827", fontWeight: 700, fontSize: "14px",
                cursor: "pointer", transition: "color 0.4s",
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="nav-join-btn"
              style={{
                background: "#111827", color: "#fff",
                border: "none", padding: "10px 22px",
                borderRadius: "12px", fontWeight: 700, fontSize: "14px",
                cursor: "pointer", transition: "background 0.4s, color 0.4s",
              }}
            >
              Join Free
            </button>
          </div>

          {/* Right: Mobile icons */}
          <div className="mobile-nav-items" style={{ display: "none" }}>
            <button
              onClick={() => navigate("/signup")}
              className="mobile-join-btn"
              style={{
                background: "#2563eb", color: "#fff",
                border: "none", padding: "8px 16px",
                borderRadius: "8px", fontWeight: 700, fontSize: "13px",
                cursor: "pointer", transition: "background 0.4s, color 0.4s",
              }}
            >
              Join
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="mobile-menu-btn"
              style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                padding: "8px", borderRadius: "8px",
                color: "#111827", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.4s, border-color 0.4s, color 0.4s",
              }}
            >
              <IconMenu2 size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <main
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* BG Image — darker + Ken Burns */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "kenBurns 28s ease-in-out infinite alternate",
            transformOrigin: "center center",
          }}
        />

        {/* Darker overlay layers */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,20,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Hero Content */}
        <div
          style={{
            position: "relative", zIndex: 10,
            textAlign: "center",
            maxWidth: "680px",
            padding: "0 20px",
            marginTop: "80px",   /* offset for fixed nav */
            width: "100%",
          }}
        >
          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              padding: "8px 16px", borderRadius: "100px",
              color: "#fff", fontSize: "11px", fontWeight: 800,
              marginBottom: "28px",
              border: "1px solid rgba(255,255,255,0.22)",
              letterSpacing: "0.06em",
            }}
          >
            <IconBolt size={13} fill="currentColor" />
            THE NEW STANDARD FOR CITY LIVING
          </div>

          {/* Title */}
          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(42px, 9vw, 80px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-3px",
              marginBottom: "22px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 0.92,
              textShadow: "0 4px 32px rgba(0,0,0,0.4)",
            }}
          >
            Your City. <br />
            <span style={{ color: "#60a5fa" }}>Simplified.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-sub"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              maxWidth: "560px",
              margin: "0 auto 48px",
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            Curating the finest local experts and verified premium stays.
            <br />Because you deserve a smarter way to live.
          </p>

          {/* Search */}
          <div className="hero-search">
            <div className="search-pill-simple">
              <IconSearch size={20} color="#94a3b8" />
              <input
                type="text"
                placeholder="What can we find for you today?"
                className="hero-input"
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontSize: "15px", fontWeight: 500, color: "#111827",
                  background: "transparent",
                  minWidth: 0,   /* prevents overflow on small screens */
                }}
              />
              <button
                onClick={() => navigate("/search")}
                style={{
                  background: "#2563eb", color: "#fff",
                  border: "none", padding: "12px 24px",
                  borderRadius: "12px", fontWeight: 700, fontSize: "14px",
                  cursor: "pointer", whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick tags */}
          <div
            className="hero-tags"
            style={{
              marginTop: "24px",
              display: "flex", justifyContent: "center",
              gap: "10px", flexWrap: "wrap",
            }}
          >
            {["Full Home Deep Clean", "Verified PGs", "Emergency Plumbing", "Luxury Flats"].map((tag) => (
              <span key={tag} className="quick-tag">{tag}</span>
            ))}
          </div>
        </div>
      </main>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </div>
  );
}