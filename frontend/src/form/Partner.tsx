import { useState, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */
interface FormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
}
interface Errors {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
}

/* ══════════════════════════════════════════════════════════
   INPUT SHELL  (matches PasswordSetup exactly)
══════════════════════════════════════════════════════════ */
function InputShell({ icon, error, children }: {
  icon: React.ReactNode; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          position: "relative", height: "54px", borderRadius: "16px",
          border: `1.5px solid ${error ? "#fca5a5" : "#e8edf5"}`,
          background: "#f7f9fc", display: "flex", alignItems: "center",
          transition: "all 0.2s", overflow: "hidden",
        }}
        onFocusCapture={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#2563eb";
          el.style.background = "#fff";
          el.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.09)";
        }}
        onBlurCapture={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = error ? "#fca5a5" : "#e8edf5";
          el.style.background = "#f7f9fc";
          el.style.boxShadow = "none";
        }}
      >
        <div style={{
          position: "absolute", left: "16px", top: "50%",
          transform: "translateY(-50%)", color: "#b4bfcc",
          pointerEvents: "none", display: "flex",
        }}>{icon}</div>
        {children}
      </div>
      {error && (
        <p style={{
          margin: "5px 0 0 4px", fontSize: "12px", color: "#ef4444",
          fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "4px",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TEXT FIELD
══════════════════════════════════════════════════════════ */
function Field({ label, value, onChange, placeholder, type = "text", icon, error, maxLength }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; icon: React.ReactNode;
  error?: string; maxLength?: number;
}) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "11px", fontWeight: 800,
        color: "#64748b", letterSpacing: "0.09em", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif", marginBottom: "8px",
      }}>
        {label} <span style={{ color: "#2563eb" }}>*</span>
      </label>
      <InputShell icon={icon} error={error}>
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{
            flex: 1, height: "100%", border: "none", background: "transparent", outline: "none",
            fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
            paddingLeft: "46px", paddingRight: "16px",
          }}
        />
      </InputShell>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TEXTAREA FIELD
══════════════════════════════════════════════════════════ */
function TextareaField({ label, value, onChange, placeholder, error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; error?: string;
}) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "11px", fontWeight: 800,
        color: "#64748b", letterSpacing: "0.09em", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif", marginBottom: "8px",
      }}>
        {label} <span style={{ color: "#2563eb" }}>*</span>
      </label>
      <div
        style={{
          position: "relative", borderRadius: "16px",
          border: `1.5px solid ${error ? "#fca5a5" : "#e8edf5"}`,
          background: "#f7f9fc", transition: "all 0.2s", overflow: "hidden",
        }}
        onFocusCapture={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#2563eb"; el.style.background = "#fff";
          el.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.09)";
        }}
        onBlurCapture={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = error ? "#fca5a5" : "#e8edf5";
          el.style.background = "#f7f9fc"; el.style.boxShadow = "none";
        }}
      >
        <div style={{ position: "absolute", left: "16px", top: "16px", color: "#b4bfcc", pointerEvents: "none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <textarea
          value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} rows={3}
          style={{
            width: "100%", border: "none", background: "transparent", outline: "none",
            fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
            padding: "16px 16px 16px 46px", resize: "none",
          }}
        />
      </div>
      {error && (
        <p style={{ margin: "5px 0 0 4px", fontSize: "12px", color: "#ef4444", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   UPLOAD ZONE
══════════════════════════════════════════════════════════ */
function UploadZone({ label, side, error, onChange }: {
  label: string; side: "front" | "back"; error?: string; onChange: (f: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(f));
    setFileName(f.name);
    onChange(f);
  }, [onChange]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <label style={{
        display: "block", fontSize: "11px", fontWeight: 800,
        color: "#64748b", letterSpacing: "0.09em", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif", marginBottom: "8px",
      }}>
        {label} <span style={{ color: "#2563eb" }}>*</span>
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        style={{
          borderRadius: "16px",
          border: `1.5px dashed ${error ? "#fca5a5" : drag ? "#2563eb" : preview ? "#2563eb" : "#e2e8f0"}`,
          background: drag ? "rgba(37,99,235,0.04)" : preview ? "#eff6ff" : "#f7f9fc",
          minHeight: "150px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative", overflow: "hidden",
          transition: "all 0.2s",
          boxShadow: drag ? "0 0 0 4px rgba(37,99,235,0.1)" : "none",
        }}
      >
        {preview ? (
          <>
            <img src={preview} alt={label} style={{ width: "100%", height: "150px", objectFit: "cover", display: "block" }} />
            <div style={{
              position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "12px", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>Change image</p>
            </div>
            <div style={{
              position: "absolute", top: "10px", right: "10px",
              background: "#16a34a", borderRadius: "8px", padding: "3px 10px",
              fontSize: "11px", fontWeight: 700, color: "#fff",
              display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              Uploaded
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 16px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px", margin: "0 auto 12px",
              background: drag ? "rgba(37,99,235,0.1)" : "#eef2f7",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}>
              {side === "front" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={drag ? "#2563eb" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={drag ? "#2563eb" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/>
                  <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
                </svg>
              )}
            </div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: drag ? "#2563eb" : "#475569", marginBottom: "3px", fontFamily: "'DM Sans', sans-serif" }}>
              {drag ? "Drop it here!" : "Click or drag to upload"}
            </p>
            <p style={{ fontSize: "11.5px", color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>PNG, JPG up to 10 MB</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>

      {fileName && !error && (
        <p style={{ margin: "5px 0 0 4px", fontSize: "11.5px", color: "#16a34a", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          {fileName.length > 28 ? fileName.slice(0, 25) + "…" : fileName}
        </p>
      )}
      {error && (
        <p style={{ margin: "5px 0 0 4px", fontSize: "12px", color: "#ef4444", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SUBMIT BUTTON
══════════════════════════════════════════════════════════ */
function SubmitBtn({ loading, onClick, children }: {
  loading?: boolean; onClick?: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%", height: "54px", borderRadius: "16px",
        background: loading ? "#3b5fc0" : "#1e40af",
        color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
        fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
        letterSpacing: "0.015em", transition: "all 0.25s",
        boxShadow: loading ? "none" : "0 4px 20px rgba(30,64,175,0.38)",
      }}
      onMouseEnter={e => {
        if (!loading) {
          e.currentTarget.style.background = "#1d4ed8";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 32px rgba(30,64,175,0.46)";
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = loading ? "#3b5fc0" : "#1e40af";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 20px rgba(30,64,175,0.38)";
      }}
    >
      {loading ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ animation: "pt-spin 0.75s linear infinite" }}>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
            <path d="M21 12a9 9 0 00-9-9"/>
          </svg>
          <span>Submitting…</span>
        </>
      ) : children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP PILLS  (matches PasswordSetup)
══════════════════════════════════════════════════════════ */
function StepPills({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "Personal" },
    { n: 2, label: "Address" },
    { n: 3, label: "Documents" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "36px" }}>
      {steps.map((s, i) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "initial" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: done ? "#22c55e" : active ? "#1e40af" : "#f0f4fa",
                border: `2px solid ${done ? "#22c55e" : active ? "#1e40af" : "#e8edf5"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                boxShadow: active ? "0 0 0 4px rgba(37,99,235,0.12)" : "none",
              }}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <span style={{ fontSize: "12px", fontWeight: 800, color: active ? "#fff" : "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>{s.n}</span>
                )}
              </div>
              <span style={{
                fontSize: "10.5px", fontWeight: 700,
                color: done ? "#22c55e" : active ? "#1e40af" : "#94a3b8",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase",
              }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: "2px", margin: "0 6px", marginBottom: "18px",
                background: done ? "#22c55e" : "#e8edf5", transition: "background 0.35s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LEFT PANEL
══════════════════════════════════════════════════════════ */
function LeftPanel({ step }: { step: number }) {
  const perks = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
      title: "Your income, supercharged",
      body: "Partners see up to 3× more bookings in their first 90 days — zero commission for month one.",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      title: "Instant payouts",
      body: "Payment lands in your account the moment you complete a job — no waiting, no delays.",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: "Verified partner badge",
      body: "Stand out with a trust badge that boosts customer confidence.",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      title: "Real-time analytics",
      body: "Track bookings, revenue & ratings from your partner dashboard.",
    },
  ];

  const stepInfo = [
    { title: "Personal Info", sub: "Just your name and phone — takes 30 seconds." },
    { title: "Your Location", sub: "Tell us where your shop or service is based." },
    { title: "Aadhaar KYC",   sub: "Quick identity check — we keep your data safe." },
  ];

  return (
    <div className="pt-left" style={{
      flex: "0 0 46%", position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 52px",
    }}>
      {/* BG image */}
      <div style={{
        position: "absolute", inset: "-8%",
        backgroundImage: "url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=90)",
        backgroundSize: "cover", backgroundPosition: "center 40%",
        animation: "pt-pan 30s ease-in-out infinite alternate",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,rgba(1,4,20,0.97) 0%,rgba(3,12,48,0.91) 42%,rgba(6,20,70,0.78) 76%,rgba(8,26,80,0.64) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 75% 50% at -5% 105%,rgba(37,99,235,0.52) 0%,transparent 55%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 105% -2%,rgba(14,165,233,0.18) 0%,transparent 52%)" }} />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 4 }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "11px", textDecoration: "none" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(145deg,#2563eb,#1e3a8a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "14px", fontFamily: "'DM Sans',sans-serif" }}>CM</div>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", fontFamily: "'DM Sans',sans-serif" }}>
            City<span style={{ color: "#60a5fa" }}>Mate</span>
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "2px 8px" }}>Partners</span>
        </Link>
      </div>

      {/* Center */}
      <div style={{ position: "relative", zIndex: 4 }}>
        {/* Step badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.35)",
          borderRadius: "50px", padding: "5px 14px", marginBottom: "24px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#60a5fa", display: "inline-block", animation: "pt-pulse 2s ease infinite" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
            Step {step} of 3 — {stepInfo[step - 1].title}
          </span>
        </div>

        <h2 style={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 800,
          fontSize: "clamp(28px,3vw,42px)", color: "#fff",
          lineHeight: 1.1, letterSpacing: "-1.8px", margin: "0 0 16px 0",
        }}>
          Become a<br />
          <span style={{
            background: "linear-gradient(110deg,#fff 0%,#93c5fd 30%,#7dd3fc 60%,#93c5fd 80%,#fff 100%)",
            backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "pt-shimmer 5s linear infinite",
          }}>CityMate Partner.</span>
        </h2>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.76, maxWidth: "340px", margin: "0 0 8px 0", fontFamily: "'DM Sans',sans-serif" }}>
          {stepInfo[step - 1].sub}
        </p>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "13.5px", lineHeight: 1.6, maxWidth: "320px", margin: "0 0 36px 0", fontFamily: "'DM Sans',sans-serif" }}>
          Your next customer is already searching for you — <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>get discovered today.</strong>
        </p>

        {/* Perks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {perks.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              padding: "14px 18px", borderRadius: "16px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)", transition: "all 0.28s cubic-bezier(.16,1,.3,1)", cursor: "default",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; (e.currentTarget as HTMLElement).style.transform = "translateX(5px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}
            >
              <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {p.icon}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: "13.5px", fontWeight: 700, marginBottom: "2px", fontFamily: "'DM Sans',sans-serif" }}>{p.title}</div>
                <div style={{ color: "rgba(255,255,255,0.38)", fontSize: "12px", lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif" }}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 4 }}>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "11.5px", fontFamily: "'DM Sans',sans-serif", margin: 0, lineHeight: 1.7 }}>
          🔒 Your data is protected under our{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function Partner() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: "", phone: "", address: "", city: "", pincode: "",
    aadhaarFront: null, aadhaarBack: null,
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof FormData, val: string | File) =>
    setForm(f => ({ ...f, [key]: val }));

  const goStep = (n: number) => { setAnimKey(k => k + 1); setStep(n); setErrors({}); };

  /* ── Validation ── */
  const validateStep1 = () => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    else if (form.fullName.trim().length < 3) e.fullName = "At least 3 characters required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e: Errors = {};
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.pincode.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const validateStep3 = () => {
    const e: Errors = {};
    if (!form.aadhaarFront) e.aadhaarFront = "Please upload the front side of your Aadhaar";
    if (!form.aadhaarBack)  e.aadhaarBack  = "Please upload the back side of your Aadhaar";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) goStep(2);
    else if (step === 2 && validateStep2()) goStep(3);
    else if (step === 3 && validateStep3()) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
    }
  };

  /* ══════════════════════════════════════
     SUCCESS SCREEN
  ══════════════════════════════════════ */
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans',sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
          *, *::before, *::after { box-sizing: border-box; }
          @keyframes pt-successRing { 0%{opacity:0;transform:scale(0.7)} 60%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
          @keyframes pt-checkDraw { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
          @keyframes pt-fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pt-pulsering { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 50%{box-shadow:0 0 0 12px rgba(34,197,94,0)} }
          .pt-ring  { animation: pt-successRing 0.55s 0.1s cubic-bezier(.16,1,.3,1) both; }
          .pt-check { stroke-dasharray:100; animation: pt-checkDraw 0.5s 0.55s cubic-bezier(.16,1,.3,1) both; }
          .pt-pr    { animation: pt-pulsering 2s 1s ease-in-out infinite; }
          .pt-fade  { animation: pt-fadeUp 0.5s cubic-bezier(.16,1,.3,1) both; }
        `}</style>

        <div className="pt-fade" style={{ textAlign: "center", maxWidth: "440px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <div className="pt-ring pt-pr" style={{
              width: "88px", height: "88px", borderRadius: "50%",
              background: "linear-gradient(145deg,#f0fdf4,#dcfce7)",
              border: "2px solid #86efac",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline className="pt-check" points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "28px", color: "#0d1526", letterSpacing: "-1px", margin: "0 0 10px 0" }}>
            Application submitted! 🎉
          </h2>
          <p style={{ color: "#7c8fa6", fontSize: "14.5px", lineHeight: 1.7, margin: "0 0 32px 0", fontFamily: "'DM Sans',sans-serif" }}>
            Our team will verify your details and reach out within{" "}
            <strong style={{ color: "#1e40af" }}>24–48 hours</strong>.
          </p>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "28px" }}>
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                label: "Name", val: form.fullName,
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                label: "Phone", val: form.phone,
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                label: "City", val: form.city,
              },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ background: "#f7f9fc", border: "1.5px solid #e8edf5", borderRadius: "14px", padding: "16px 12px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                </div>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 3px 0", fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", wordBreak: "break-word", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Status note */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: "14px", padding: "14px 18px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1e40af", fontFamily: "'DM Sans',sans-serif" }}>Verification in progress</p>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#3b82f6", fontFamily: "'DM Sans',sans-serif" }}>You'll receive an SMS + email update within 48 hours.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                flex: 1, height: "52px", borderRadius: "14px",
                background: "#1e40af", color: "#fff", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: "0 4px 20px rgba(30,64,175,0.35)", transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e40af"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Home
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setAnimKey(0); setForm({ fullName: "", phone: "", address: "", city: "", pincode: "", aadhaarFront: null, aadhaarBack: null }); }}
              style={{
                flex: 1, height: "52px", borderRadius: "14px",
                background: "#f7f9fc", color: "#475569", border: "1.5px solid #e8edf5", cursor: "pointer",
                fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f0f4fa"; e.currentTarget.style.color = "#1e293b"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.color = "#475569"; }}
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════
     STEP META
  ══════════════════════════════════════ */
  const stepMeta = [
    {
      icon: (
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(145deg,#eff6ff,#dbeafe)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", boxShadow: "0 4px 16px rgba(37,99,235,0.1)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      ),
      title: "Personal Information",
      sub: "Tell us about yourself — your name and mobile number.",
    },
    {
      icon: (
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(145deg,#faf5ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", boxShadow: "0 4px 16px rgba(124,58,237,0.1)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      ),
      title: "Your Address",
      sub: "Where is your shop or service located? This helps us match you with nearby customers.",
    },
    {
      icon: (
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(145deg,#f0fdf4,#dcfce7)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", boxShadow: "0 4px 16px rgba(34,197,94,0.1)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        </div>
      ),
      title: "Aadhaar Verification",
      sub: "Upload clear photos of your Aadhaar card for a quick KYC check.",
    },
  ];

  /* ══════════════════════════════════════
     MAIN FORM
  ══════════════════════════════════════ */
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, button { font-family: 'DM Sans', sans-serif; }
        ::placeholder { color: #b4bfcc !important; }
        textarea { color: #0f172a !important; }
        textarea:focus { outline: none; }

        @keyframes pt-pan {
          0%   { transform: scale(1.06) translate(0,0); }
          50%  { transform: scale(1.11) translate(-14px,-8px); }
          100% { transform: scale(1.08) translate(10px,5px); }
        }
        @keyframes pt-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes pt-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pt-fadeUp {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pt-pulse {
          0%,100% { opacity:0.6; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.2); }
        }
        @keyframes pt-mobileIn {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .pt-f1 { animation: pt-fadeUp 0.6s 0.04s cubic-bezier(.16,1,.3,1) both; }
        .pt-f2 { animation: pt-fadeUp 0.6s 0.10s cubic-bezier(.16,1,.3,1) both; }
        .pt-f3 { animation: pt-fadeUp 0.6s 0.16s cubic-bezier(.16,1,.3,1) both; }
        .pt-f4 { animation: pt-fadeUp 0.6s 0.22s cubic-bezier(.16,1,.3,1) both; }
        .pt-f5 { animation: pt-fadeUp 0.6s 0.28s cubic-bezier(.16,1,.3,1) both; }
        .pt-f6 { animation: pt-fadeUp 0.6s 0.34s cubic-bezier(.16,1,.3,1) both; }

        .pt-back-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 14px; border-radius: 10px;
          background: #f0f4fa; border: none; cursor: pointer;
          font-size: 13px; font-weight: 600; color: #475569;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
          text-decoration: none;
        }
        .pt-back-btn:hover { background: #e2e8f4; color: #1e293b; transform: translateX(-2px); }

        .pt-left   { display: flex !important; }
        .pt-m-head { display: none  !important; }

        @media (max-width: 900px) {
          .pt-left   { display: none !important; }
          .pt-m-head { display: flex !important; animation: pt-mobileIn 0.4s ease both; }
          .pt-right  { padding: 0 !important; align-items: stretch !important; justify-content: flex-start !important; }
          .pt-shell  { width: 100% !important; max-width: 100% !important; padding: 28px 22px 52px !important; }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <LeftPanel step={step} />

      {/* ── RIGHT PANEL ── */}
      <div className="pt-right" style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#ffffff", overflowY: "auto", position: "relative",
      }}>
        {/* Mobile header */}
        <div className="pt-m-head" style={{
          width: "100%", position: "relative", overflow: "hidden",
          flexShrink: 0, height: "185px", flexDirection: "column",
        }}>
          <div style={{ position: "absolute", inset: "-6%", backgroundImage: "url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85)", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,6,18,0.82) 0%,rgba(3,6,18,0.5) 55%,rgba(3,6,18,0.9) 100%)" }} />
          {/* Mobile back button */}
          <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
            {step === 1 ? (
              <Link to="/" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "10px", padding: "8px 14px",
                color: "rgba(255,255,255,0.9)", fontSize: "13px", fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif", textDecoration: "none",
                backdropFilter: "blur(12px)", transition: "all 0.2s",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </Link>
            ) : (
              <button onClick={() => goStep(step - 1)} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "10px", padding: "8px 14px",
                color: "rgba(255,255,255,0.9)", fontSize: "13px", fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
                backdropFilter: "blur(12px)", transition: "all 0.2s",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
            )}
          </div>

          <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "12px" }}>CM</div>
              <span style={{ fontSize: "21px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>City<span style={{ color: "#60a5fa" }}>Mate</span></span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "12.5px", margin: 0 }}>Partner Registration</p>
          </div>
        </div>

        {/* Form shell — key forces re-animation on step change */}
        <div className="pt-shell" key={animKey} style={{ width: "100%", maxWidth: "420px", padding: "44px 24px" }}>

          {/* Back button */}
          <div className="pt-f1" style={{ marginBottom: "28px" }}>
            {step === 1 ? (
              <Link to="/" className="pt-back-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back to Home
              </Link>
            ) : (
              <button className="pt-back-btn" onClick={() => goStep(step - 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
            )}
          </div>

          {/* Step pills */}
          <div className="pt-f2"><StepPills step={step} /></div>

          {/* Step icon + title */}
          <div className="pt-f3">
            {stepMeta[step - 1].icon}
            <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "26px", color: "#0d1526", letterSpacing: "-1px", lineHeight: 1.14, margin: "0 0 8px 0" }}>
              {stepMeta[step - 1].title}
            </h1>
            <p style={{ color: "#7c8fa6", fontSize: "14px", lineHeight: 1.7, margin: "0 0 30px 0", fontFamily: "'DM Sans',sans-serif" }}>
              {stepMeta[step - 1].sub}
            </p>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="pt-f4">
                <Field
                  label="Full Name" value={form.fullName}
                  onChange={v => { set("fullName", v); setErrors(e => ({ ...e, fullName: undefined })); }}
                  placeholder="e.g. Rajesh Kumar Sharma" error={errors.fullName}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  }
                />
              </div>
              <div className="pt-f5">
                <Field
                  label="Mobile Number" value={form.phone} type="tel" maxLength={10}
                  onChange={v => { if (/^\d{0,10}$/.test(v)) { set("phone", v); setErrors(e => ({ ...e, phone: undefined })); } }}
                  placeholder="e.g. 9876543210" error={errors.phone}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  }
                />
              </div>
              <div className="pt-f5" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: "14px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p style={{ fontSize: "12.5px", color: "#1d4ed8", fontWeight: 500, lineHeight: 1.5, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                  We'll send an OTP to verify your number before final submission.
                </p>
              </div>
              <div className="pt-f6">
                <SubmitBtn onClick={handleNext}>
                  <span>Continue</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </SubmitBtn>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="pt-f4">
                <TextareaField
                  label="Full Address" value={form.address}
                  onChange={v => { set("address", v); setErrors(e => ({ ...e, address: undefined })); }}
                  placeholder="House/Shop no., Street, Landmark…" error={errors.address}
                />
              </div>
              <div className="pt-f5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <Field
                  label="City" value={form.city}
                  onChange={v => { set("city", v); setErrors(e => ({ ...e, city: undefined })); }}
                  placeholder="e.g. Mumbai" error={errors.city}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  }
                />
                <Field
                  label="Pincode" value={form.pincode} type="tel" maxLength={6}
                  onChange={v => { if (/^\d{0,6}$/.test(v)) { set("pincode", v); setErrors(e => ({ ...e, pincode: undefined })); } }}
                  placeholder="e.g. 400001" error={errors.pincode}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  }
                />
              </div>
              <div className="pt-f5" style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: "14px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p style={{ fontSize: "12.5px", color: "#92400e", fontWeight: 500, lineHeight: 1.5, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                  Address should match your Aadhaar card for smooth verification.
                </p>
              </div>
              <div className="pt-f6">
                <SubmitBtn onClick={handleNext}>
                  <span>Continue</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </SubmitBtn>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Security badge */}
              <div className="pt-f3" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "14px", padding: "13px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#166534", fontFamily: "'DM Sans',sans-serif" }}>Your data is encrypted & secure</p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#16a34a", fontFamily: "'DM Sans',sans-serif" }}>AES-256 encrypted. Only used for KYC — never shared.</p>
                </div>
              </div>

              {/* Upload zones */}
              <div className="pt-f4" style={{ display: "flex", gap: "14px" }}>
                <UploadZone
                  label="Aadhaar Front" side="front" error={errors.aadhaarFront}
                  onChange={f => { set("aadhaarFront", f); setErrors(e => ({ ...e, aadhaarFront: undefined })); }}
                />
                <UploadZone
                  label="Aadhaar Back" side="back" error={errors.aadhaarBack}
                  onChange={f => { set("aadhaarBack", f); setErrors(e => ({ ...e, aadhaarBack: undefined })); }}
                />
              </div>

              {/* Tips */}
              <div className="pt-f5" style={{ background: "#f7f9fc", border: "1.5px solid #e8edf5", borderRadius: "14px", padding: "14px 16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", fontFamily: "'DM Sans',sans-serif" }}>
                  Tips for faster verification
                </p>
                {["All 4 corners clearly visible", "Text is sharp and readable", "No glare or flash reflections", "Plain, well-lit background"].map(t => (
                  <p key={t} style={{ fontSize: "12.5px", color: "#475569", display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontWeight: 500, fontFamily: "'DM Sans',sans-serif" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </p>
                ))}
              </div>

              <div className="pt-f6">
                <SubmitBtn loading={loading} onClick={handleNext}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Submit Application</span>
                </SubmitBtn>
              </div>
            </div>
          )}

          {/* Footer */}
          <p style={{ textAlign: "center", marginTop: "28px", fontSize: "11.5px", color: "#b8c4d0", lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>
            🔒 Secured with end-to-end encryption &nbsp;·&nbsp;
            <a href="#" style={{ color: "#94a3b8", textDecoration: "underline" }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}