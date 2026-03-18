import { useEffect, useState } from "react";

export default function DottedBlueSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 300);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase(2), 600); 
          setTimeout(() => onComplete(), 1400);
          return 100;
        }
        return prev + (prev < 70 ? 2.2 : 0.5);
      });
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      opacity: phase === 2 ? 0 : 1,
      transform: phase === 2 ? "scale(1.02)" : "scale(1)",
      transition: "opacity 0.8s ease, transform 0.8s ease"
    }}>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes revealLogo {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dot {
          width: 8px; height: 8px; background: #3b82f6;
          border-radius: 50%; display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot1 { animation-delay: -0.32s; }
        .dot2 { animation-delay: -0.16s; }
      `}</style>

      {/* ── CENTRAL BRANDING ── */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        animation: "revealLogo 1s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}>
        <div style={{
          width: "84px", height: "84px",
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          borderRadius: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.12)",
          marginBottom: "24px"
        }}>
           <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
           </svg>
        </div>

        <h1 style={{ 
          fontSize: "52px", fontWeight: 800, color: "#0f172a", margin: 0,
          fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-2px"
        }}>
          City<span style={{ color: "#3b82f6" }}>Mate</span>
        </h1>
      </div>

      {/* ── LOADING SECTION ── */}
      <div style={{
        position: "absolute", bottom: "120px", width: "200px",
        opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.8s ease",
        display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        {/* Minimal Progress Bar */}
        <div style={{
          width: "100%", height: "3px", background: "rgba(0,0,0,0.04)",
          borderRadius: "10px", overflow: "hidden", marginBottom: "20px"
        }}>
          <div style={{
            width: `${progress}%`, height: "100%", background: "#3b82f6",
            transition: "width 0.4s ease-out"
          }} />
        </div>

        {/* Dotted Loading Effect */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ 
            fontSize: "12px", fontWeight: 700, color: "#94a3b8", 
            letterSpacing: "2px", textTransform: "uppercase", marginRight: "4px" 
          }}>
            Loading
          </span>
          <div className="dot dot1" />
          <div className="dot dot2" />
          <div className="dot" />
        </div>
      </div>

      {/* ── BOTTOM TAG ── */}
      <div style={{
        position: "absolute", bottom: "40px",
        fontSize: "10px", color: "#cbd5e1",
        fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase"
      }}>
        Platform v2.0
      </div>
    </div>
  );
}