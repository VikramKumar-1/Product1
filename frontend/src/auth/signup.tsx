import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ══════════════════════════════════════════
   REUSABLE FIELD COMPONENTS
══════════════════════════════════════════ */

function TextInput({
  value,
  onChange,
  error,
  placeholder,
  icon,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: "52px",
          borderRadius: "14px",
          border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          transition: "all 0.2s",
          overflow: "hidden",
        }}
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
          (e.currentTarget as HTMLElement).style.background = "#fff";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 0 4px rgba(37,99,235,0.1)";
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = error
            ? "#fca5a5"
            : "#e2e8f0";
          (e.currentTarget as HTMLElement).style.background = "#f8fafc";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#b0bec9",
            pointerEvents: "none",
            display: "flex",
          }}
        >
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            height: "100%",
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: "14.5px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#0f172a",
            paddingLeft: "44px",
            paddingRight: "16px",
          }}
        />
      </div>
      {error && (
        <p
          style={{
            margin: "5px 0 0 2px",
            fontSize: "12px",
            color: "#ef4444",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  error,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: "52px",
          borderRadius: "14px",
          border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          transition: "all 0.2s",
          overflow: "hidden",
        }}
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
          (e.currentTarget as HTMLElement).style.background = "#fff";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 0 4px rgba(37,99,235,0.1)";
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = error
            ? "#fca5a5"
            : "#e2e8f0";
          (e.currentTarget as HTMLElement).style.background = "#f8fafc";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#b0bec9",
            pointerEvents: "none",
            display: "flex",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "Create a password"}
          style={{
            flex: 1,
            height: "100%",
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: "14.5px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#0f172a",
            paddingLeft: "44px",
            paddingRight: "48px",
            letterSpacing: show ? "0.02em" : "0.1em",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            borderRadius: "6px",
            transition: "color 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
        >
          {show ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p
          style={{
            margin: "5px 0 0 2px",
            fontSize: "12px",
            color: "#ef4444",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   PASSWORD STRENGTH
══════════════════════════════════════════ */
function getStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!pw) return { score: 0, label: "", color: "#e2e8f0" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { score: 1, label: "Weak", color: "#ef4444" },
    { score: 2, label: "Fair", color: "#f59e0b" },
    { score: 3, label: "Good", color: "#10b981" },
    { score: 4, label: "Strong", color: "#2563eb" },
  ];
  return map[score - 1] ?? { score: 0, label: "", color: "#e2e8f0" };
}

function PasswordStrengthBar({ password }: { password: string }) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div style={{ marginTop: "8px" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "100px",
              background: i <= score ? color : "#e2e8f0",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "11px",
          color,
          fontFamily: "'DM Sans',sans-serif",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SIGNUP PAGE
══════════════════════════════════════════ */
export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!name.trim()) {
      setNameErr("Please enter your full name");
      valid = false;
    } else setNameErr("");
    if (!/^\S+@\S+$/.test(email)) {
      setEmailErr("Please enter a valid email");
      valid = false;
    } else setEmailErr("");
    if (password.length < 6) {
      setPassErr("Password must be at least 6 characters");
      valid = false;
    } else setPassErr("");
    if (confirm !== password) {
      setConfirmErr("Passwords do not match");
      valid = false;
    } else setConfirmErr("");
    if (!valid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1800);
  };

  const features = [
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      color: "#10b981",
      title: "Instant matches",
      body: "Our algorithm connects you to verified rooms and services in seconds.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      color: "#f59e0b",
      title: "100% free to join",
      body: "No hidden charges. Free sign-up, free browsing, no brokerage.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes heroPan {
          0%   { transform: scale(1.07) translate(0px,0px); }
          50%  { transform: scale(1.12) translate(-16px,-9px); }
          100% { transform: scale(1.09) translate(10px,6px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-300% center; }
          100% { background-position:300% center; }
        }
        @keyframes spin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes mHeaderIn {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes mFormIn {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .sp-bg { animation: heroPan 28s ease-in-out infinite alternate; }

        .f1 { animation: fadeUp .75s .04s cubic-bezier(.16,1,.3,1) both; }
        .f2 { animation: fadeUp .75s .12s cubic-bezier(.16,1,.3,1) both; }
        .f3 { animation: fadeUp .75s .20s cubic-bezier(.16,1,.3,1) both; }
        .f4 { animation: fadeUp .75s .27s cubic-bezier(.16,1,.3,1) both; }
        .f5 { animation: fadeUp .75s .33s cubic-bezier(.16,1,.3,1) both; }
        .f6 { animation: fadeUp .75s .39s cubic-bezier(.16,1,.3,1) both; }
        .f7 { animation: fadeUp .75s .45s cubic-bezier(.16,1,.3,1) both; }
        .f8 { animation: fadeUp .75s .51s cubic-bezier(.16,1,.3,1) both; }

        .sp-shimmer {
          background: linear-gradient(110deg,#fff 0%,#93c5fd 25%,#c4b5fd 50%,#93c5fd 75%,#fff 100%);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 6s linear infinite;
        }

        .sp-feature {
          display:flex; align-items:flex-start; gap:14px;
          padding:16px 18px; border-radius:16px;
          background:rgba(255,255,255,0.055);
          border:1px solid rgba(255,255,255,0.09);
          backdrop-filter:blur(16px);
          transition:all 0.26s cubic-bezier(.16,1,.3,1);
          cursor:default;
        }
        .sp-feature:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.15);
          transform:translateX(5px);
        }

        .sp-google {
          width:100%; display:flex; align-items:center; justify-content:center; gap:11px;
          height:52px; border-radius:14px;
          border:1.5px solid #e2e8f0; background:#fff;
          font-size:14.5px; font-weight:600; color:#1e293b;
          font-family:'DM Sans',sans-serif; cursor:pointer;
          transition:all 0.22s; box-shadow:0 1px 4px rgba(0,0,0,0.05);
        }
        .sp-google:hover {
          border-color:#bfcce8;
          box-shadow:0 4px 16px rgba(37,99,235,0.08);
          transform:translateY(-1px);
        }

        .sp-or {
          display:flex; align-items:center; gap:14px;
          color:#cbd5e1; font-size:11px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          font-family:'DM Sans',sans-serif;
        }
        .sp-or::before,.sp-or::after { content:''; flex:1; height:1px; background:#f0f4f8; }

        .sp-label {
          display:block; font-size:11.5px; font-weight:700;
          color:#475569; letter-spacing:0.07em; text-transform:uppercase;
          font-family:'DM Sans',sans-serif; margin-bottom:8px;
        }

        .sp-submit {
          width:100%; height:52px; border-radius:14px;
          background:#1e40af; color:#fff; border:none; cursor:pointer;
          font-size:15px; font-weight:700; font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; justify-content:center; gap:9px;
          letter-spacing:0.02em; transition:all 0.25s;
          position:relative; overflow:hidden;
          box-shadow:0 4px 18px rgba(30,64,175,0.38);
        }
        .sp-submit::before {
          content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
          transition:left 0.5s ease;
        }
        .sp-submit:hover::before { left:160%; }
        .sp-submit:hover { background:#1d4ed8; transform:translateY(-2px); box-shadow:0 10px 30px rgba(30,64,175,0.48); }
        .sp-submit:active { transform:translateY(0); }
        .sp-submit:disabled { opacity:0.65; cursor:not-allowed; transform:none; box-shadow:none; }

        /* Desktop: left panel visible, mobile header hidden */
        .sp-left       { display:flex !important; }
        .sp-m-header   { display:none !important; }

        @media (max-width: 900px) {
          .sp-left     { display:none !important; }
          .sp-m-header { display:block !important; animation: mHeaderIn 0.4s ease both; }
          .sp-right    { padding:0 !important; align-items:stretch !important; justify-content:flex-start !important; }
          .sp-form-wrap {
            width:100% !important; max-width:100% !important;
            padding:24px 20px 56px !important;
            animation: mFormIn 0.45s 0.1s ease both;
          }
        }
      `}</style>

      {/* ══════════════════════════════
           LEFT — Brand Panel (desktop)
      ══════════════════════════════ */}
      <div
        className="sp-left"
        style={{
          flex: "0 0 46%",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
        }}
      >
        {/* Cityscape */}
        <div
          className="sp-bg"
          style={{
            position: "absolute",
            inset: "-8%",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=90)",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />
        {/* Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(158deg,rgba(2,5,22,0.97) 0%,rgba(4,12,44,0.91) 44%,rgba(8,20,64,0.78) 78%,rgba(10,26,72,0.64) 100%)",
          }}
        />
        {/* Scanline texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.018,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent 0,transparent 3px,rgba(255,255,255,1) 3px,rgba(255,255,255,1) 4px)",
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 4 }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "11px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "14px",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              CM
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              City<span style={{ color: "#60a5fa" }}>Mate</span>
            </span>
          </a>
        </div>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 4 }}>
          <h2
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px,3vw,44px)",
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "18px",
            }}
          >
            Your city.
            <br />
            <span className="sp-shimmer">Your home base.</span>
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "15.5px",
              fontWeight: 400,
              lineHeight: 1.78,
              maxWidth: "340px",
              marginBottom: "36px",
              letterSpacing: "0.01em",
            }}
          >
            Sign up and unlock verified rooms, trusted local services, and
            hyper-local discovery — all in one place.{" "}
            <strong
              style={{ color: "rgba(255,255,255,0.76)", fontWeight: 600 }}
            >
              No brokers. No nonsense.
            </strong>
          </p>

          {/* Feature cards */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {features.map((f, i) => (
              <div key={i} className="sp-feature">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "11px",
                    flexShrink: 0,
                    background: `${f.color}1a`,
                    color: f.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      marginBottom: "3px",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "12px",
                      lineHeight: 1.6,
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    {f.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div style={{ position: "relative", zIndex: 4 }}>
          <p
            style={{
              color: "rgba(255,255,255,0.22)",
              fontSize: "11.5px",
              fontFamily: "'DM Sans',sans-serif",
              lineHeight: 1.6,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
           RIGHT — Signup Form
      ══════════════════════════════ */}
      <div
        className="sp-right"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          overflowY: "auto",
          position: "relative",
          flexDirection: "column",
        }}
      >
        {/* ── MOBILE HEADER ── */}
        <div
          className="sp-m-header"
          style={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
            height: "190px",
          }}
        >
          {/* Cityscape bg */}
          <div
            style={{
              position: "absolute",
              inset: "-6%",
              backgroundImage:
                "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85)",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
            }}
          />
          {/* Clean overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg,rgba(3,6,18,0.80) 0%,rgba(3,6,18,0.52) 55%,rgba(3,6,18,0.90) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              position: "absolute",
              top: "18px",
              left: "18px",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "10px",
              padding: "8px 14px",
              color: "rgba(255,255,255,0.85)",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'DM Sans',sans-serif",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>

          {/* Centred logo + tagline */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "12px",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                CM
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "21px",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                City<span style={{ color: "#60a5fa" }}>Mate</span>
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.48)",
                fontSize: "13px",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 400,
                margin: 0,
              }}
            >
              Create your free account
            </p>
          </div>
        </div>

        {/* ── FORM ── */}
        <div
          className="sp-form-wrap"
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "36px 24px 48px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Heading */}
          <div className="f1" style={{ marginBottom: "5px" }}>
            <h1
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 800,
                fontSize: "27px",
                color: "#0d1526",
                letterSpacing: "-1px",
                lineHeight: 1.12,
              }}
            >
              Create your account
            </h1>
          </div>
          <p
            className="f2"
            style={{
              color: "#7c8fa6",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.65,
              marginBottom: "28px",
            }}
          >
            Join CityMate — free, instant, no credit card.
          </p>

          {/* Google */}
          <div className="f3" style={{ marginBottom: "18px" }}>
            <button className="sp-google">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                style={{ flexShrink: 0 }}
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="f3 sp-or" style={{ marginBottom: "20px" }}>
            or sign up with email
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {/* Full name */}
            <div className="f4">
              <label className="sp-label">Full Name</label>
              <TextInput
                value={name}
                onChange={setName}
                error={nameErr}
                placeholder="Your full name"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
            </div>

            {/* Email */}
            <div className="f5">
              <label className="sp-label">Email Address</label>
              <TextInput
                value={email}
                onChange={setEmail}
                error={emailErr}
                placeholder="you@example.com"
                type="email"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                  </svg>
                }
              />
            </div>

            {/* Phone (optional) */}
            <div className="f5">
              <label
                className="sp-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                Phone
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#94a3b8",
                    letterSpacing: "0.05em",
                    background: "#f1f5f9",
                    padding: "2px 7px",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                  }}
                >
                  Optional
                </span>
              </label>
              <TextInput
                value={phone}
                onChange={setPhone}
                placeholder="+91 98765 43210"
                type="tel"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92" />
                  </svg>
                }
              />
            </div>

            {/* Password */}
            <div className="f6">
              <label className="sp-label">Password</label>
              <PasswordInput
                value={password}
                onChange={setPassword}
                error={passErr}
                placeholder="Create a password"
              />
              <PasswordStrengthBar password={password} />
            </div>

            {/* Confirm password */}
            <div className="f6">
              <label className="sp-label">Confirm Password</label>
              <PasswordInput
                value={confirm}
                onChange={setConfirm}
                error={confirmErr}
                placeholder="Repeat your password"
              />
            </div>

            {/* Submit */}
            <div className="f7" style={{ marginTop: "4px" }}>
              <button type="submit" className="sp-submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    >
                      <path
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeOpacity="0.25"
                      />
                      <path d="M21 12a9 9 0 00-9-9" />
                    </svg>
                    <span>Creating account…</span>
                  </>
                ) : (
                  <>
                    <span>Create my account</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <p
            className="f8"
            style={{
              textAlign: "center",
              marginTop: "22px",
              fontSize: "13.5px",
              color: "#7c8fa6",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: 700,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Sign in →
            </Link>
          </p>

          {/* Terms */}
          <p
            style={{
              textAlign: "center",
              marginTop: "14px",
              fontSize: "11.5px",
              color: "#b8c4d0",
              lineHeight: 1.7,
            }}
          >
            By creating an account, you agree to our{" "}
            <a
              href="#"
              style={{ color: "#94a3b8", textDecoration: "underline" }}
            >
              Terms
            </a>{" "}
            &amp;{" "}
            <a
              href="#"
              style={{ color: "#94a3b8", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}