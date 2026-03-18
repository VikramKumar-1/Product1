import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/Uselogin";

/* ══════════════════════════════════════════
   PASSWORD FIELD
══════════════════════════════════════════ */
function PasswordField({
  value, onChange, error, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div style={{
        position: "relative", height: "52px", borderRadius: "14px",
        border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
        background: "#f8fafc", display: "flex", alignItems: "center",
        transition: "all 0.2s", overflow: "hidden",
      }}
        onFocusCapture={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
          (e.currentTarget as HTMLElement).style.background = "#fff";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px rgba(37,99,235,0.1)";
        }}
        onBlurCapture={e => {
          (e.currentTarget as HTMLElement).style.borderColor = error ? "#fca5a5" : "#e2e8f0";
          (e.currentTarget as HTMLElement).style.background = "#f8fafc";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        <div style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#b0bec9", pointerEvents: "none", display: "flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </div>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? "Enter your password"}
          style={{
            flex: 1, height: "100%", border: "none", background: "transparent", outline: "none",
            fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
            paddingLeft: "44px", paddingRight: "48px",
            letterSpacing: show ? "0.02em" : "0.1em",
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
          {show ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>
      {error && <p style={{ margin: "5px 0 0 2px", fontSize: "12px", color: "#ef4444", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════
   EMAIL FIELD
══════════════════════════════════════════ */
function EmailField({
  value, onChange, error, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <div style={{
        position: "relative", height: "52px", borderRadius: "14px",
        border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
        background: "#f8fafc", display: "flex", alignItems: "center",
        transition: "all 0.2s", overflow: "hidden",
      }}
        onFocusCapture={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
          (e.currentTarget as HTMLElement).style.background = "#fff";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px rgba(37,99,235,0.1)";
        }}
        onBlurCapture={e => {
          (e.currentTarget as HTMLElement).style.borderColor = error ? "#fca5a5" : "#e2e8f0";
          (e.currentTarget as HTMLElement).style.background = "#f8fafc";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        <div style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#b0bec9", pointerEvents: "none", display: "flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
          </svg>
        </div>
        <input
          type="email" value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? "you@example.com"}
          style={{
            flex: 1, height: "100%", border: "none", background: "transparent", outline: "none",
            fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
            paddingLeft: "44px", paddingRight: "16px",
          }}
        />
      </div>
      {error && <p style={{ margin: "5px 0 0 2px", fontSize: "12px", color: "#ef4444", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN LOGIN PAGE
══════════════════════════════════════════ */
export default function LoginPage() {
  const navigate = useNavigate();

  // ── hook ──
  const { login, loading, error: apiError } = useLogin();

  // ── local field state ──
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const showForgotHint = failedAttempts >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── client-side validation ──
    let valid = true;
    if (!/^\S+@\S+$/.test(emailVal)) {
      setEmailErr("Please enter a valid email");
      valid = false;
    } else {
      setEmailErr("");
    }
    if (passVal.length < 6) {
      setPassErr("Password must be at least 6 characters");
      valid = false;
    } else {
      setPassErr("");
    }
    if (!valid) return;

    // ── call hook → service → API ──
    await login({ email: emailVal, password: passVal });

    if (apiError) {
      setPassErr(apiError);
      setFailedAttempts(prev => prev + 1);
    } else {
      setFailedAttempts(0);
      navigate("/");
    }
  };

  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      color: "#3b82f6", glow: "rgba(59,130,246,0.18)",
      title: "Rooms made simple",
      body: "Browse PGs, apartments & co-living across every neighbourhood — no brokers, no hidden fees.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      color: "#8b5cf6", glow: "rgba(139,92,246,0.18)",
      title: "Services on demand",
      body: "Electricians, cleaners, tutors, chefs — book trusted professionals in minutes, not days.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
        </svg>
      ),
      color: "#06b6d4", glow: "rgba(6,182,212,0.18)",
      title: "Your city, understood",
      body: "Hyper-local intelligence built around Indian neighbourhoods — not just a global app transplanted here.",
    },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes heroPan {
          0%   { transform: scale(1.07) translate(0px,0px); }
          50%  { transform: scale(1.12) translate(-16px,-9px); }
          100% { transform: scale(1.09) translate(10px,6px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-300% center; }
          100% { background-position:300% center; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mHeaderIn {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes mFormIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hintSlideIn {
          from { opacity:0; transform:translateY(-8px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        .lp-bg { animation: heroPan 28s ease-in-out infinite alternate; }

        .f1 { animation: fadeUp .8s .05s cubic-bezier(.16,1,.3,1) both; }
        .f2 { animation: fadeUp .8s .14s cubic-bezier(.16,1,.3,1) both; }
        .f3 { animation: fadeUp .8s .22s cubic-bezier(.16,1,.3,1) both; }
        .f4 { animation: fadeUp .8s .30s cubic-bezier(.16,1,.3,1) both; }
        .f5 { animation: fadeUp .8s .37s cubic-bezier(.16,1,.3,1) both; }
        .f6 { animation: fadeUp .8s .44s cubic-bezier(.16,1,.3,1) both; }
        .f7 { animation: fadeUp .8s .52s cubic-bezier(.16,1,.3,1) both; }

        .cm-shimmer {
          background: linear-gradient(110deg,#fff 0%,#93c5fd 25%,#c4b5fd 50%,#93c5fd 75%,#fff 100%);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 6s linear infinite;
        }

        .cm-pillar {
          display:flex; align-items:flex-start; gap:16px;
          padding:18px 20px; border-radius:18px;
          background:rgba(255,255,255,0.055);
          border:1px solid rgba(255,255,255,0.09);
          backdrop-filter:blur(16px) saturate(1.2);
          transition:all 0.28s cubic-bezier(.16,1,.3,1);
          cursor:default;
        }
        .cm-pillar:hover {
          background:rgba(255,255,255,0.1);
          border-color:rgba(255,255,255,0.16);
          transform:translateX(6px);
        }

        .cm-google {
          width:100%; display:flex; align-items:center; justify-content:center; gap:11px;
          height:52px; border-radius:14px;
          border:1.5px solid #e2e8f0; background:#fff;
          font-size:14.5px; font-weight:600; color:#1e293b;
          font-family:'DM Sans',sans-serif; cursor:pointer;
          transition:all 0.22s;
          box-shadow:0 1px 4px rgba(0,0,0,0.05);
        }
        .cm-google:hover {
          border-color:#bfcce8;
          box-shadow:0 4px 16px rgba(37,99,235,0.08);
          transform:translateY(-1px);
        }

        .cm-or {
          display:flex; align-items:center; gap:14px;
          color:#cbd5e1; font-size:11px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          font-family:'DM Sans',sans-serif;
        }
        .cm-or::before,.cm-or::after {
          content:''; flex:1; height:1px; background:#f0f4f8;
        }

        .cm-submit {
          width:100%; height:52px; border-radius:14px;
          background:#1e40af;
          color:#fff; border:none; cursor:pointer;
          font-size:15px; font-weight:700; font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; justify-content:center; gap:9px;
          letter-spacing:0.02em; transition:all 0.25s;
          position:relative; overflow:hidden;
          box-shadow:0 4px 18px rgba(30,64,175,0.38);
        }
        .cm-submit::before {
          content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
          transition:left 0.5s ease;
        }
        .cm-submit:hover::before { left:160%; }
        .cm-submit:hover { background:#1d4ed8; transform:translateY(-2px); box-shadow:0 10px 30px rgba(30,64,175,0.48); }
        .cm-submit:active { transform:translateY(0); }
        .cm-submit:disabled { opacity:0.65; cursor:not-allowed; transform:none; box-shadow:none; }

        .cm-label {
          display:block; font-size:11.5px; font-weight:700;
          color:#475569; letter-spacing:0.07em; text-transform:uppercase;
          font-family:'DM Sans',sans-serif; margin-bottom:8px;
        }

        .cm-forgot-hint {
          animation: hintSlideIn 0.4s cubic-bezier(.16,1,.3,1) both;
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; border-radius: 14px;
          background: #fffbeb; border: 1.5px solid #fde68a;
          margin-top: 16px;
        }
        .cm-forgot-hint-link {
          color: #d97706; font-weight: 700; font-size: 13px;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
          white-space: nowrap; transition: color 0.18s;
        }
        .cm-forgot-hint-link:hover { color: #b45309; text-decoration: underline; }

        .lp-left     { display:flex !important; }
        .lp-m-header { display:none !important; }

        @media (max-width: 900px) {
          .lp-left { display:none !important; }
          .lp-m-header { display:block !important; animation: mHeaderIn 0.4s ease both; }
          .lp-right { padding: 0 !important; align-items: stretch !important; justify-content: flex-start !important; }
          .lp-form-wrap { width: 100% !important; max-width: 100% !important; padding: 28px 24px 48px !important; animation: mFormIn 0.45s 0.1s ease both; }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="lp-left" style={{
        flex: "0 0 50%", position: "relative", overflow: "hidden",
        flexDirection: "column", justifyContent: "space-between", padding: "48px 56px",
      }}>
        <div className="lp-bg" style={{
          position: "absolute", inset: "-8%",
          backgroundImage: "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=90)",
          backgroundSize: "cover", backgroundPosition: "center 35%",
        }} />
        <div style={{ position:"absolute",inset:0, background:"linear-gradient(158deg,rgba(2,5,22,0.96) 0%,rgba(4,12,44,0.9) 44%,rgba(8,20,64,0.77) 78%,rgba(10,26,72,0.62) 100%)" }} />
        <div style={{ position:"absolute",inset:0, background:"radial-gradient(ellipse 80% 55% at -8% 108%,rgba(37,99,235,0.48) 0%,transparent 52%)" }} />
        <div style={{ position:"absolute",inset:0, background:"radial-gradient(ellipse 55% 45% at 108% -5%,rgba(99,102,241,0.2) 0%,transparent 50%)" }} />

        <div style={{ position:"relative",zIndex:4 }}>
          <a href="/" style={{ display:"inline-flex",alignItems:"center",gap:"11px",textDecoration:"none" }}>
            <div style={{ width:"40px",height:"40px",borderRadius:"12px",background:"linear-gradient(145deg,#2563eb,#1e3a8a)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px" }}>CM</div>
            <span style={{ fontSize:"20px",fontWeight:800,color:"#fff",letterSpacing:"-0.5px" }}>
              City<span style={{ color:"#60a5fa" }}>Mate</span>
            </span>
          </a>
        </div>

        <div style={{ position:"relative",zIndex:4 }}>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:"clamp(30px,3.2vw,46px)",color:"#fff",lineHeight:1.08,letterSpacing:"-2px",margin:"0 0 20px 0" }}>
            Stop scrolling.<br />Start <span className="cm-shimmer">living better.</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.52)",fontSize:"16px",lineHeight:1.78,maxWidth:"360px",margin:"0 0 38px 0" }}>
            CityMate puts your entire city at your fingertips.{" "}
            <strong style={{ color:"rgba(255,255,255,0.78)",fontWeight:600 }}>No middlemen. No hassle. Just results.</strong>
          </p>
          <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
            {pillars.map((p, i) => (
              <div key={i} className="cm-pillar">
                <div style={{ width:"42px",height:"42px",borderRadius:"12px",flexShrink:0,background:p.glow,color:p.color,display:"flex",alignItems:"center",justifyContent:"center" }}>{p.icon}</div>
                <div>
                  <div style={{ color:"#fff",fontSize:"14px",fontWeight:700,marginBottom:"3px" }}>{p.title}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)",fontSize:"12.5px",lineHeight:1.58 }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT — FORM ── */}
      <div className="lp-right" style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        background: "#ffffff", overflowY: "auto", position: "relative", flexDirection: "column",
      }}>

        {/* Mobile header */}
        <div className="lp-m-header" style={{ width:"100%",position:"relative",overflow:"hidden",flexShrink:0,height:"200px" }}>
          <div style={{ position:"absolute",inset:"-6%",backgroundImage:"url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85)",backgroundSize:"cover",backgroundPosition:"center 40%" }} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(3,6,18,0.78) 0%,rgba(3,6,18,0.55) 55%,rgba(3,6,18,0.88) 100%)" }} />
          <button onClick={() => navigate(-1)} style={{ position:"absolute",top:"18px",left:"18px",zIndex:10,display:"flex",alignItems:"center",gap:"6px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:"10px",padding:"8px 14px",color:"rgba(255,255,255,0.85)",fontSize:"13px",fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",backdropFilter:"blur(12px)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div style={{ position:"absolute",inset:0,zIndex:5,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"10px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
              <div style={{ width:"38px",height:"38px",borderRadius:"11px",background:"#2563eb",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"13px" }}>CM</div>
              <span style={{ fontSize:"22px",fontWeight:800,color:"#fff",letterSpacing:"-0.5px" }}>City<span style={{ color:"#60a5fa" }}>Mate</span></span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lp-form-wrap" style={{ width:"100%",maxWidth:"390px",position:"relative",zIndex:2,padding:"40px 24px" }}>

          <div className="f1" style={{ marginBottom:"6px" }}>
            <h1 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:800,fontSize:"28px",color:"#0d1526",letterSpacing:"-1.1px",lineHeight:1.12,margin:0 }}>
              Welcome back
            </h1>
          </div>
          <p className="f2" style={{ color:"#7c8fa6",fontSize:"14.5px",lineHeight:1.65,margin:"0 0 32px 0" }}>
            Sign in to continue with CityMate.
          </p>

          <div className="f3" style={{ marginBottom:"20px" }}>
            <button className="cm-google">
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="f3 cm-or" style={{ marginBottom:"22px" }}>or continue with email</div>

          <form onSubmit={handleSubmit}>
            <div className="f4" style={{ marginBottom:"16px" }}>
              <label className="cm-label">Email address</label>
              <EmailField value={emailVal} onChange={setEmailVal} error={emailErr} placeholder="you@example.com" />
            </div>

            <div className="f5">
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px" }}>
                <label className="cm-label" style={{ marginBottom:0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize:"12.5px",color:"#2563eb",fontWeight:600,textDecoration:"none" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#1d4ed8")}
                  onMouseLeave={e=>(e.currentTarget.style.color="#2563eb")}
                >Forgot password?</Link>
              </div>
              <PasswordField value={passVal} onChange={setPassVal} error={passErr} placeholder="Enter your password" />
            </div>

            <div className="f6" style={{ marginTop:"26px" }}>
              <button type="submit" className="cm-submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:"spin 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
                      <path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    <span>Signing in…</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to CityMate</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </div>

            {showForgotHint && (
              <div className="cm-forgot-hint">
                <div style={{ width:"36px",height:"36px",borderRadius:"10px",background:"#fef3c7",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ margin:"0 0 3px 0",fontSize:"12.5px",fontWeight:700,color:"#92400e",fontFamily:"'DM Sans',sans-serif" }}>
                    Having trouble signing in?
                  </p>
                  <p style={{ margin:0,fontSize:"12px",color:"#a16207",fontFamily:"'DM Sans',sans-serif",lineHeight:1.5 }}>
                    {failedAttempts >= 3 ? "Too many failed attempts. " : "Incorrect password. "}
                    <Link to="/forgot-password" className="cm-forgot-hint-link">Reset your password →</Link>
                  </p>
                </div>
              </div>
            )}
          </form>

          <p className="f7" style={{ textAlign:"center",marginTop:"24px",fontSize:"13.5px",color:"#7c8fa6" }}>
            New to CityMate?{" "}
            <Link to="/signup" style={{ color:"#2563eb",fontWeight:700,textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget.style.textDecoration="underline")}
              onMouseLeave={e=>(e.currentTarget.style.textDecoration="none")}
            >Create a free account →</Link>
          </p>

          <p style={{ textAlign:"center",marginTop:"16px",fontSize:"11.5px",color:"#b8c4d0",lineHeight:1.7 }}>
            By continuing, you agree to our{" "}
            <a href="#" style={{ color:"#94a3b8",textDecoration:"underline" }}>Terms</a> &amp;{" "}
            <a href="#" style={{ color:"#94a3b8",textDecoration:"underline" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}