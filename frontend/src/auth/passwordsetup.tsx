import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type Step = "email" | "otp" | "password" | "success";

/* ─────────────────────────────────────────
   REUSABLE: InputShell  (icon + border + glow)
───────────────────────────────────────── */
function InputShell({
  icon, error, children,
}: { icon: React.ReactNode; error?: string; children: React.ReactNode }) {
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
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   EMAIL INPUT
───────────────────────────────────────── */
function EmailInput({ value, onChange, error, disabled }: {
  value: string; onChange: (v: string) => void; error?: string; disabled?: boolean;
}) {
  return (
    <InputShell error={error} icon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
      </svg>
    }>
      <input
        type="email" value={value} onChange={e => onChange(e.target.value)}
        placeholder="you@example.com" disabled={disabled}
        style={{
          flex: 1, height: "100%", border: "none", background: "transparent", outline: "none",
          fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
          paddingLeft: "46px", paddingRight: "16px",
          opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "text",
        }}
      />
    </InputShell>
  );
}

/* ─────────────────────────────────────────
   PASSWORD INPUT
───────────────────────────────────────── */
function PasswordInput({ value, onChange, error, placeholder }: {
  value: string; onChange: (v: string) => void; error?: string; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <InputShell error={error} icon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    }>
      <input
        type={show ? "text" : "password"} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? "New password"}
        style={{
          flex: 1, height: "100%", border: "none", background: "transparent", outline: "none",
          fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
          paddingLeft: "46px", paddingRight: "52px",
          letterSpacing: show ? "0.02em" : "0.12em",
        }}
      />
      <button type="button" onClick={() => setShow(s => !s)} style={{
        position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
        background: "none", border: "none", cursor: "pointer", color: "#94a3b8",
        padding: "4px", display: "flex", alignItems: "center", borderRadius: "6px", transition: "color 0.18s",
      }}
        onMouseEnter={e => (e.currentTarget.style.color = "#2563eb")}
        onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
      >
        {show
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        }
      </button>
    </InputShell>
  );
}

/* ─────────────────────────────────────────
   PASSWORD STRENGTH
───────────────────────────────────────── */
function StrengthMeter({ password }: { password: string }) {
  const rules = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = rules.filter(r => r.pass).length;
  const config = [
    { label: "", color: "#e2e8f0" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f97316" },
    { label: "Good", color: "#eab308" },
    { label: "Strong", color: "#22c55e" },
  ];
  if (!password) return null;

  return (
    <div style={{ marginTop: "12px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: "3px", borderRadius: "99px",
            background: i <= score ? config[score].color : "#e8edf5",
            transition: "background 0.35s",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11.5px", fontWeight: 700, color: config[score].color, fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s" }}>
          {config[score].label}
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {rules.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%",
                background: r.pass ? "#dcfce7" : "#f1f5f9",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.25s",
              }}>
                {r.pass && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <span style={{ fontSize: "10px", color: r.pass ? "#16a34a" : "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   OTP BOXES
───────────────────────────────────────── */
function OtpBoxes({ value, onChange, error }: {
  value: string[]; onChange: (v: string[]) => void; error?: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/, "").slice(-1);
    const next = [...value]; next[i] = digit; onChange(next);
    if (digit && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (p) {
      onChange(p.split("").concat(Array(6).fill("")).slice(0, 6));
      refs.current[Math.min(p.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        {value.map((d, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type="text" inputMode="numeric" maxLength={1} value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)} onPaste={handlePaste}
            style={{
              width: "48px", height: "52px", flexShrink: 0,
              textAlign: "center",
              fontSize: "20px", fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
              color: d ? "#1e40af" : "#64748b",
              background: d ? "#eff6ff" : "#f7f9fc",
              border: `2px solid ${error ? "#fca5a5" : d ? "#2563eb" : "#e2e8f0"}`,
              borderRadius: "12px", outline: "none",
              transition: "all 0.18s", caretColor: "#2563eb",
              boxShadow: d ? "0 0 0 3px rgba(37,99,235,0.08)" : "none",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = "#2563eb";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.1)";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = d ? "#2563eb" : error ? "#fca5a5" : "#e2e8f0";
              e.currentTarget.style.background = d ? "#eff6ff" : "#f7f9fc";
              e.currentTarget.style.boxShadow = d ? "0 0 0 3px rgba(37,99,235,0.08)" : "none";
            }}
          />
        ))}
      </div>
      {error && (
        <p style={{ margin: "6px 0 0 2px", fontSize: "12px", color: "#ef4444", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   SUBMIT BUTTON
───────────────────────────────────────── */
function SubmitBtn({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: "100%", height: "54px", borderRadius: "16px",
      background: loading ? "#3b5fc0" : "#1e40af",
      color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
      fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
      letterSpacing: "0.015em", transition: "all 0.25s", position: "relative", overflow: "hidden",
      boxShadow: loading ? "none" : "0 4px 20px rgba(30,64,175,0.38)",
    }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(30,64,175,0.46)"; } }}
      onMouseLeave={e => { e.currentTarget.style.background = loading ? "#3b5fc0" : "#1e40af"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 20px rgba(30,64,175,0.38)"; }}
    >
      {loading ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "ps-spin 0.75s linear infinite" }}>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
            <path d="M21 12a9 9 0 00-9-9"/>
          </svg>
          <span>Please wait…</span>
        </>
      ) : children}
    </button>
  );
}

/* ─────────────────────────────────────────
   STEP PILL INDICATOR
───────────────────────────────────────── */
function StepPills({ step }: { step: Step }) {
  const steps: Step[] = ["email", "otp", "password"];
  const labels = ["Email", "Verify", "Reset"];
  const idx = steps.indexOf(step);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "36px" }}>
      {steps.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "initial" }}>
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
                  <span style={{ fontSize: "12px", fontWeight: 800, color: active ? "#fff" : "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>{i + 1}</span>
                )}
              </div>
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: done ? "#22c55e" : active ? "#1e40af" : "#94a3b8", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>{labels[i]}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: "2px", margin: "0 6px", marginBottom: "18px",
                background: done ? "#22c55e" : "#e8edf5",
                transition: "background 0.35s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   LEFT PANEL
───────────────────────────────────────── */
function LeftPanel() {
  const features = [
    { icon: "🔐", title: "Bank-grade security", body: "Your account is protected with AES-256 encryption and secure reset flows." },
    { icon: "⚡", title: "Instant recovery", body: "Get back into your account in under 2 minutes with our streamlined process." },
    { icon: "🛡️", title: "Verified every step", body: "OTP verification ensures only you can reset your CityMate password." },
  ];

  return (
    <div className="ps-left" style={{
      flex: "0 0 46%", position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 52px",
    }}>
      <div style={{
        position: "absolute", inset: "-8%",
        backgroundImage: "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=90)",
        backgroundSize: "cover", backgroundPosition: "center 40%",
        animation: "ps-pan 30s ease-in-out infinite alternate",
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
        </Link>
      </div>

      {/* Center */}
      <div style={{ position: "relative", zIndex: 4 }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "22px", marginBottom: "28px",
          background: "linear-gradient(145deg, rgba(37,99,235,0.35), rgba(37,99,235,0.12))",
          border: "1px solid rgba(37,99,235,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
            <circle cx="12" cy="16" r="1" fill="#60a5fa"/>
          </svg>
        </div>

        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-1.8px", margin: "0 0 18px 0" }}>
          Secure account<br /><span style={{
            background: "linear-gradient(110deg,#fff 0%,#93c5fd 30%,#7dd3fc 60%,#93c5fd 80%,#fff 100%)",
            backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "ps-shimmer 5s linear infinite",
          }}>recovery.</span>
        </h2>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", fontWeight: 400, lineHeight: 1.76, maxWidth: "340px", margin: "0 0 36px 0" }}>
          We take every step to ensure your password reset is <strong style={{ color: "rgba(255,255,255,0.78)", fontWeight: 600 }}>safe, fast, and verified.</strong>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              padding: "16px 18px", borderRadius: "16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              transition: "all 0.28s cubic-bezier(.16,1,.3,1)",
              cursor: "default",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; (e.currentTarget as HTMLElement).style.transform = "translateX(5px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ color: "#fff", fontSize: "13.5px", fontWeight: 700, marginBottom: "3px", fontFamily: "'DM Sans',sans-serif" }}>{f.title}</div>
                <div style={{ color: "rgba(255,255,255,0.38)", fontSize: "12px", lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif" }}>{f.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div style={{ position: "relative", zIndex: 4 }}>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "11.5px", fontFamily: "'DM Sans',sans-serif", margin: 0, lineHeight: 1.7 }}>
          🔒 Your data is protected under our <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PasswordSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Step 1 — email
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // Step 2 — OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Step 3 — password
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPassErr, setNewPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");

  /* ── FIX 2: Timer only runs the interval; state reset moved to event handler ── */
  useEffect(() => {
    if (step !== "otp") return;
    const id = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(id); setCanResend(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  const goStep = (s: Step) => { setAnimKey(k => k + 1); setStep(s); };

  /* ── Step 1: send OTP ── */
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setEmailErr("Please enter a valid email address"); return; }
    setEmailErr(""); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Reset OTP timer state here in the event handler, not in the effect
      setTimer(30);
      setCanResend(false);
      goStep("otp");
    }, 1500);
  };

  /* ── Step 2: verify OTP ── */
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(d => !d)) { setOtpErr("Please enter all 6 digits"); return; }
    setOtpErr(""); setLoading(true);
    setTimeout(() => { setLoading(false); goStep("password"); }, 1200);
  };

  /* ── Step 3: set password ── */
  const handlePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let ok = true;
    if (newPass.length < 8) { setNewPassErr("Minimum 8 characters required"); ok = false; } else setNewPassErr("");
    if (newPass !== confirmPass) { setConfirmPassErr("Passwords don't match"); ok = false; } else setConfirmPassErr("");
    if (!ok) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); goStep("success"); }, 1600);
  };

  /* ── Resend handler ── */
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
  };

  /* ── step meta ── */
  const stepMeta = {
    email: {
      icon: (
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(145deg,#eff6ff,#dbeafe)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", boxShadow: "0 4px 16px rgba(37,99,235,0.1)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
        </div>
      ),
      title: "Forgot your password?",
      sub: "No worries! Enter your email and we'll send you a 6-digit reset code.",
    },
    otp: {
      icon: (
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(145deg,#f0fdf4,#dcfce7)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", boxShadow: "0 4px 16px rgba(34,197,94,0.12)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        </div>
      ),
      title: "Check your inbox",
      sub: `We've sent a 6-digit code to ${email || "your email"}. It expires in 10 minutes.`,
    },
    password: {
      icon: (
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(145deg,#faf5ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", boxShadow: "0 4px 16px rgba(124,58,237,0.1)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill="#7c3aed"/></svg>
        </div>
      ),
      title: "Create new password",
      sub: "Your identity has been verified. Set a strong new password for your account.",
    },
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes ps-pan {
          0%   { transform: scale(1.06) translate(0,0); }
          50%  { transform: scale(1.11) translate(-14px,-8px); }
          100% { transform: scale(1.08) translate(10px,5px); }
        }
        @keyframes ps-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes ps-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ps-fadeUp {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ps-successRing {
          0%   { opacity:0; transform:scale(0.7); }
          60%  { transform:scale(1.08); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes ps-checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ps-mobileIn {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ps-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
        }

        .ps-step-content { animation: ps-fadeUp 0.42s cubic-bezier(.16,1,.3,1) both; }

        .ps-f1 { animation: ps-fadeUp 0.6s 0.04s cubic-bezier(.16,1,.3,1) both; }
        .ps-f2 { animation: ps-fadeUp 0.6s 0.10s cubic-bezier(.16,1,.3,1) both; }
        .ps-f3 { animation: ps-fadeUp 0.6s 0.16s cubic-bezier(.16,1,.3,1) both; }
        .ps-f4 { animation: ps-fadeUp 0.6s 0.22s cubic-bezier(.16,1,.3,1) both; }
        .ps-f5 { animation: ps-fadeUp 0.6s 0.28s cubic-bezier(.16,1,.3,1) both; }
        .ps-f6 { animation: ps-fadeUp 0.6s 0.34s cubic-bezier(.16,1,.3,1) both; }

        .ps-success-ring { animation: ps-successRing 0.55s 0.1s cubic-bezier(.16,1,.3,1) both; }
        .ps-check { stroke-dasharray: 100; animation: ps-checkDraw 0.5s 0.55s cubic-bezier(.16,1,.3,1) both; }
        .ps-pulse { animation: ps-pulse 2s 1s ease-in-out infinite; }

        .ps-label {
          display: block; font-size: 11px; font-weight: 800;
          color: #64748b; letter-spacing: 0.09em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; margin-bottom: 8px;
        }
        .ps-back-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 14px; border-radius: 10px;
          background: #f0f4fa; border: none; cursor: pointer;
          font-size: 13px; font-weight: 600; color: #475569;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
          text-decoration: none;
        }
        .ps-back-btn:hover { background: #e2e8f4; color: #1e293b; transform: translateX(-2px); }

        .ps-left { display: flex !important; }
        .ps-m-header { display: none !important; }

        @media (max-width: 900px) {
          .ps-left { display: none !important; }
          .ps-m-header { display: flex !important; animation: ps-mobileIn 0.4s ease both; }
          .ps-right {
            padding: 0 !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
          }
          .ps-form-shell {
            width: 100% !important;
            max-width: 100% !important;
            padding: 28px 22px 52px !important;
          }
        }
      `}</style>

      {/* ══ LEFT PANEL ══ */}
      <LeftPanel />

      {/* ══ RIGHT PANEL ══ */}
      <div className="ps-right" style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#ffffff", overflowY: "auto", position: "relative",
      }}>

        {/* Mobile header */}
        <div className="ps-m-header" style={{
          width: "100%", position: "relative", overflow: "hidden",
          flexShrink: 0, height: "185px", flexDirection: "column",
        }}>
          <div style={{ position: "absolute", inset: "-6%", backgroundImage: "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85)", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,6,18,0.82) 0%,rgba(3,6,18,0.5) 55%,rgba(3,6,18,0.9) 100%)" }} />
          <button onClick={() => navigate(-1)} style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10, display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "9px", padding: "7px 12px", color: "rgba(255,255,255,0.85)", fontSize: "12.5px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", backdropFilter: "blur(12px)", transition: "all 0.2s" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "12px", fontFamily: "'DM Sans',sans-serif" }}>CM</div>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "21px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>City<span style={{ color: "#60a5fa" }}>Mate</span></span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "12.5px", fontFamily: "'DM Sans',sans-serif", margin: 0 }}>Password Recovery</p>
          </div>
        </div>

        {/* Form shell */}
        <div className="ps-form-shell" style={{ width: "100%", maxWidth: "400px", padding: "44px 24px", position: "relative" }}>

          {/* SUCCESS STATE */}
          {step === "success" && (
            <div key="success" style={{ textAlign: "center", animation: "ps-fadeUp 0.5s cubic-bezier(.16,1,.3,1) both" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
                <div className="ps-success-ring ps-pulse" style={{
                  width: "88px", height: "88px", borderRadius: "50%",
                  background: "linear-gradient(145deg,#f0fdf4,#dcfce7)",
                  border: "2px solid #86efac",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline className="ps-check" points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>

              <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "26px", color: "#0d1526", letterSpacing: "-1px", margin: "0 0 12px 0" }}>
                Password updated! 🎉
              </h1>
              <p style={{ color: "#7c8fa6", fontSize: "14.5px", lineHeight: 1.7, margin: "0 0 36px 0", fontFamily: "'DM Sans',sans-serif" }}>
                Your new password has been set successfully.<br />You can now sign in with your new credentials.
              </p>

              <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "16px", padding: "16px 20px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#166534", fontFamily: "'DM Sans',sans-serif" }}>Account secured</p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#16a34a", fontFamily: "'DM Sans',sans-serif" }}>All other sessions have been signed out for safety.</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "100%", height: "54px", borderRadius: "16px",
                  background: "#1e40af", color: "#fff", border: "none", cursor: "pointer",
                  fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                  boxShadow: "0 4px 20px rgba(30,64,175,0.38)", transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(30,64,175,0.46)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1e40af"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(30,64,175,0.38)"; }}
              >
                <span>Sign in to CityMate</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {/* NORMAL STEPS */}
          {step !== "success" && (
            <div key={animKey} className="ps-step-content">

              {/* Back button */}
              <div className="ps-f1" style={{ marginBottom: "28px" }}>
                {step === "email" ? (
                  <Link to="/login" className="ps-back-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                    Back to Login
                  </Link>
                ) : (
                  <button
                    className="ps-back-btn"
                    onClick={() => goStep(step === "otp" ? "email" : "otp")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                    Back
                  </button>
                )}
              </div>

              {/* Step pills */}
              <div className="ps-f2">
                <StepPills step={step} />
              </div>

              {/* Icon + Title + Sub */}
              <div className="ps-f3">
                {stepMeta[step].icon}
                <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "26px", color: "#0d1526", letterSpacing: "-1px", lineHeight: 1.14, margin: "0 0 8px 0" }}>
                  {stepMeta[step].title}
                </h1>
                <p style={{ color: "#7c8fa6", fontSize: "14px", lineHeight: 1.7, margin: "0 0 30px 0", fontFamily: "'DM Sans',sans-serif" }}>
                  {stepMeta[step].sub}
                </p>
              </div>

              {/* ── STEP 1: EMAIL ── */}
              {step === "email" && (
                <form onSubmit={handleEmailSubmit}>
                  <div className="ps-f4" style={{ marginBottom: "20px" }}>
                    <label className="ps-label">Email address</label>
                    <EmailInput value={email} onChange={v => { setEmail(v); setEmailErr(""); }} error={emailErr} />
                  </div>
                  <div className="ps-f5">
                    <SubmitBtn loading={loading}>
                      <span>Send Reset Code</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </SubmitBtn>
                  </div>
                  <p className="ps-f6" style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#7c8fa6", fontFamily: "'DM Sans',sans-serif" }}>
                    Remembered it?{" "}
                    <Link to="/login" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                    >Sign in instead →</Link>
                  </p>
                </form>
              )}

              {/* ── STEP 2: OTP ── */}
              {step === "otp" && (
                <form onSubmit={handleOtpSubmit}>
                  <div className="ps-f4" style={{ marginBottom: "8px" }}>
                    <label className="ps-label">6-digit verification code</label>
                    <OtpBoxes value={otp} onChange={v => { setOtp(v); setOtpErr(""); }} error={otpErr} />
                  </div>

                  {/* Resend */}
                  <div className="ps-f4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", marginTop: "12px" }}>
                    <span style={{ fontSize: "12.5px", color: "#94a3b8", fontFamily: "'DM Sans',sans-serif" }}>
                      {canResend ? "Didn't receive it?" : `Resend in ${timer}s`}
                    </span>
                    <button
                      type="button"
                      disabled={!canResend}
                      onClick={handleResend}
                      style={{
                        fontSize: "12.5px", fontWeight: 700, color: canResend ? "#2563eb" : "#b0bec9",
                        fontFamily: "'DM Sans',sans-serif", background: "none", border: "none",
                        cursor: canResend ? "pointer" : "not-allowed", padding: 0, transition: "color 0.2s",
                      }}
                    >
                      Resend code
                    </button>
                  </div>

                  {/* Email chip */}
                  <div className="ps-f4" style={{ background: "#f7f9fc", border: "1.5px solid #e8edf5", borderRadius: "12px", padding: "11px 14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                    <span style={{ fontSize: "13px", color: "#475569", fontFamily: "'DM Sans',sans-serif", flex: 1, fontWeight: 500 }}>{email}</span>
                    <button type="button" onClick={() => goStep("email")} style={{ fontSize: "12px", color: "#2563eb", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", padding: 0, transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#1d4ed8")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#2563eb")}
                    >Change</button>
                  </div>

                  <div className="ps-f5">
                    <SubmitBtn loading={loading}>
                      <span>Verify Code</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </SubmitBtn>
                  </div>
                </form>
              )}

              {/* ── STEP 3: NEW PASSWORD ── */}
              {step === "password" && (
                <form onSubmit={handlePassSubmit}>
                  {/* Verified badge */}
                  <div className="ps-f3" style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "12px", padding: "10px 14px", marginBottom: "22px" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#15803d", fontFamily: "'DM Sans',sans-serif" }}>Identity verified — you're good to go!</span>
                  </div>

                  <div className="ps-f4" style={{ marginBottom: "16px" }}>
                    <label className="ps-label">New password</label>
                    <PasswordInput value={newPass} onChange={v => { setNewPass(v); setNewPassErr(""); }} error={newPassErr} placeholder="Create a strong password" />
                    <StrengthMeter password={newPass} />
                  </div>

                  <div className="ps-f5" style={{ marginBottom: "22px" }}>
                    <label className="ps-label">Confirm password</label>
                    <PasswordInput value={confirmPass} onChange={v => { setConfirmPass(v); setConfirmPassErr(""); }} error={confirmPassErr} placeholder="Repeat your new password" />
                    {confirmPass && newPass === confirmPass && !confirmPassErr && (
                      <p style={{ margin: "5px 0 0 3px", fontSize: "12px", color: "#16a34a", fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        Passwords match
                      </p>
                    )}
                  </div>

                  <div className="ps-f6">
                    <SubmitBtn loading={loading}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      <span>Set New Password</span>
                    </SubmitBtn>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Footer */}
          {step !== "success" && (
            <p style={{ textAlign: "center", marginTop: "28px", fontSize: "11.5px", color: "#b8c4d0", lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>
              🔒 Secured with end-to-end encryption &nbsp;·&nbsp;
              <a href="#" style={{ color: "#94a3b8", textDecoration: "underline" }}>Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}