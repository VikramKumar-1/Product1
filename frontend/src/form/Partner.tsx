import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

/* ══════ TYPES ══════ */
type PartnerStep = 1 | 2 | 3 | 4 | 5;
interface PartnerFormData {
  fullName: string; email: string; phone: string; password: string; confirmPassword: string;
  serviceType: string; profilePhoto: File | null; address: string; city: string;
  state: string; pincode: string; aadhaarNumber: string; aadhaarFront: File | null;
  aadhaarBack: File | null; panNumber: string; paymentMethod: "upi" | "bank" | "";
  upiId: string; accountHolderName: string; bankName: string; bankBranch: string;
  accountNumber: string; ifscCode: string;
}
interface PartnerFormErrors { [key: string]: string | undefined }

const INDIAN_BANKS = [
  "State Bank of India (SBI)","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank",
  "Punjab National Bank (PNB)","Bank of Baroda","Canara Bank","Union Bank of India","Bank of India",
  "Central Bank of India","Indian Bank","IDBI Bank","Yes Bank","IndusInd Bank","Federal Bank",
  "RBL Bank","Bandhan Bank","IDFC First Bank","AU Small Finance Bank","Paytm Payments Bank",
  "Airtel Payments Bank","Fino Payments Bank","India Post Payments Bank (IPPB)","Other",
];

const INDIAN_CITIES = [
  "Agra","Ahmedabad","Amritsar","Aurangabad","Bengaluru","Bhopal","Bhubaneswar","Chandigarh",
  "Chennai","Coimbatore","Dehradun","Delhi","Dhanbad","Durgapur","Faridabad","Ghaziabad",
  "Gorakhpur","Gurugram","Guwahati","Gwalior","Haridwar","Howrah","Hyderabad","Indore",
  "Jaipur","Jalandhar","Jammu","Jamshedpur","Jodhpur","Kanpur","Kochi","Kolkata","Kota",
  "Kozhikode","Lucknow","Ludhiana","Madurai","Mangaluru","Meerut","Mumbai","Mysuru","Nagpur",
  "Nashik","Navi Mumbai","Noida","Patna","Pune","Raipur","Rajkot","Ranchi","Surat","Thane",
  "Thiruvananthapuram","Udaipur","Vadodara","Varanasi","Vijayawada","Visakhapatnam","Other",
];

const SERVICE_TYPES = [
  { id: "cleaning", label: "Home Cleaning", emoji: "🧹", color: "#0ea5e9" },
  { id: "plumbing", label: "Plumbing", emoji: "🔧", color: "#f59e0b" },
  { id: "electrician", label: "Electrician", emoji: "⚡", color: "#8b5cf6" },
  { id: "ac", label: "AC Repair", emoji: "❄️", color: "#06b6d4" },
  { id: "salon", label: "Salon & Beauty", emoji: "💇", color: "#ec4899" },
  { id: "pest", label: "Pest Control", emoji: "🛡️", color: "#16a34a" },
  { id: "laundry", label: "Laundry", emoji: "👕", color: "#3b82f6" },
  { id: "carpentry", label: "Carpentry", emoji: "🪚", color: "#b45309" },
  { id: "painting", label: "Painting", emoji: "🎨", color: "#e11d48" },
  { id: "appliance", label: "Appliances", emoji: "📺", color: "#0891b2" },
  { id: "movers", label: "Movers", emoji: "📦", color: "#d97706" },
  { id: "gardening", label: "Gardening", emoji: "🌿", color: "#15803d" },
  { id: "security", label: "CCTV", emoji: "📷", color: "#475569" },
  { id: "water", label: "Water Purifier", emoji: "💧", color: "#0284c7" },
  { id: "yoga", label: "Yoga & Fitness", emoji: "🧘", color: "#7c3aed" },
  { id: "cook", label: "Cook & Chef", emoji: "🍳", color: "#ea580c" },
];

/* ══════ HELPERS ══════ */
async function fetchStateFromPincode(pin: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0)
      return data[0].PostOffice[0].State as string;
    return null;
  } catch { return null; }
}

/* ══════ GLOBAL STYLES ══════ */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  input, textarea, button, select { font-family: 'Inter', sans-serif; }

  /* Tokens matching Navbar */
  :root {
    --blue: #2563eb;
    --blue-light: #eff6ff;
    --blue-border: #dbeafe;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    --border: #e5e7eb;
    --surface: #f9fafb;
    --white: #ffffff;
    --green: #16a34a;
    --green-light: #f0fdf4;
    --green-border: #bbf7d0;
    --red: #ef4444;
    --red-light: #fef2f2;
    --amber: #d97706;
    --amber-light: #fffbeb;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --shadow-blue: 0 4px 20px rgba(37,99,235,0.25);
  }

  @keyframes cm-fadeUp   { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
  @keyframes cm-slideIn  { from { opacity:0; transform:translateX(-12px) } to { opacity:1; transform:translateX(0) } }
  @keyframes cm-spin     { to { transform:rotate(360deg) } }
  @keyframes cm-pan      { 0%{transform:scale(1.04)} 50%{transform:scale(1.09) translate(-10px,-6px)} 100%{transform:scale(1.06) translate(8px,4px)} }
  @keyframes cm-pulse    { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.25)} }
  @keyframes cm-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes cm-checkIn  { from{opacity:0;transform:scale(.6)} to{opacity:1;transform:scale(1)} }
  @keyframes cm-stateIn  { from{opacity:0;transform:translateY(-6px);max-height:0} to{opacity:1;transform:translateY(0);max-height:90px} }
  @keyframes cm-otpIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cm-ringIn   { from{opacity:0;transform:scale(.7)} 60%{transform:scale(1.06)} to{opacity:1;transform:scale(1)} }
  @keyframes cm-draw     { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
  @keyframes cm-glow     { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.3)} 50%{box-shadow:0 0 0 10px rgba(37,99,235,0)} }
  @keyframes cm-kenBurns { from{transform:scale(1)} to{transform:scale(1.12)} }

  .cm-f1{animation:cm-fadeUp .55s .04s cubic-bezier(.16,1,.3,1) both}
  .cm-f2{animation:cm-fadeUp .55s .10s cubic-bezier(.16,1,.3,1) both}
  .cm-f3{animation:cm-fadeUp .55s .16s cubic-bezier(.16,1,.3,1) both}
  .cm-f4{animation:cm-fadeUp .55s .22s cubic-bezier(.16,1,.3,1) both}
  .cm-f5{animation:cm-fadeUp .55s .28s cubic-bezier(.16,1,.3,1) both}
  .cm-f6{animation:cm-fadeUp .55s .34s cubic-bezier(.16,1,.3,1) both}
  .cm-f7{animation:cm-fadeUp .55s .40s cubic-bezier(.16,1,.3,1) both}
  .cm-otp-in{animation:cm-otpIn .35s cubic-bezier(.16,1,.3,1) both}
  .cm-state-in{animation:cm-stateIn .38s cubic-bezier(.16,1,.3,1) both;overflow:hidden}
  .cm-skeleton{background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);background-size:200% 100%;animation:cm-shimmer 1.4s ease infinite}

  /* Input base */
  .cm-input-shell {
    position:relative; height:52px; border-radius:var(--radius-lg);
    border:1.5px solid var(--border); background:var(--surface);
    display:flex; align-items:center; transition:all .2s; overflow:hidden;
  }
  .cm-input-shell:focus-within {
    border-color:var(--blue); background:var(--white);
    box-shadow:0 0 0 4px rgba(37,99,235,.08);
  }
  .cm-input-shell.error { border-color:#fca5a5; }
  .cm-input-shell input, .cm-input-shell select, .cm-input-shell textarea {
    flex:1; height:100%; border:none; background:transparent; outline:none;
    font-size:14px; color:var(--text-primary); padding-left:44px; padding-right:16px;
    font-family:'Inter',sans-serif; min-width:0;
  }
  .cm-input-shell select { appearance:none; cursor:pointer; }
  .cm-input-icon {
    position:absolute; left:14px; top:50%; transform:translateY(-50%);
    color:#9ca3af; pointer-events:none; display:flex;
  }

  /* Field label */
  .cm-label {
    display:block; font-size:11px; font-weight:700; color:#6b7280;
    letter-spacing:.07em; text-transform:uppercase; font-family:'Inter',sans-serif;
    margin-bottom:7px;
  }
  .cm-error-msg {
    margin:5px 0 0 2px; font-size:12px; color:var(--red);
    display:flex; align-items:center; gap:4px; font-family:'Inter',sans-serif;
  }

  /* Pill button (primary) */
  .cm-btn-primary {
    width:100%; height:52px; border-radius:var(--radius-lg);
    background:var(--blue); color:#fff; border:none; cursor:pointer;
    font-size:14.5px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:all .25s; box-shadow:var(--shadow-blue);
    letter-spacing:.01em;
  }
  .cm-btn-primary:hover:not(:disabled) {
    background:#1d4ed8; transform:translateY(-2px);
    box-shadow:0 8px 28px rgba(37,99,235,.38);
  }
  .cm-btn-primary:disabled { background:#9ca3af; box-shadow:none; cursor:not-allowed; }

  /* Back button */
  .cm-btn-back {
    display:inline-flex; align-items:center; gap:6px; padding:7px 14px;
    border-radius:var(--radius-sm); background:var(--surface); border:1.5px solid var(--border);
    color:var(--text-secondary); font-size:13px; font-weight:600; cursor:pointer;
    text-decoration:none; transition:all .2s; font-family:'Inter',sans-serif;
  }
  .cm-btn-back:hover { background:var(--blue-light); border-color:var(--blue-border); color:var(--blue); transform:translateX(-2px); }

  /* Step pills */
  .cm-step-dot {
    width:28px; height:28px; border-radius:50%; display:flex; align-items:center;
    justify-content:center; transition:all .35s cubic-bezier(.16,1,.3,1); font-size:11px; font-weight:800;
  }

  /* Payment option card */
  .cm-pay-opt {
    border:1.5px solid var(--border); border-radius:var(--radius-lg);
    padding:16px; cursor:pointer; transition:all .2s;
    display:flex; align-items:center; gap:12px; background:var(--surface);
  }
  .cm-pay-opt:hover { border-color:#93c5fd; background:var(--blue-light); }
  .cm-pay-opt.active { border-color:var(--blue); background:var(--blue-light); box-shadow:0 0 0 3px rgba(37,99,235,.1); }

  /* Left panel */
  .cm-left { position:fixed; top:0; left:0; width:44%; height:100vh; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:44px 48px; z-index:10; }

  /* Right panel scroll */
  .cm-right { margin-left:44%; flex:1; display:flex; flex-direction:column; align-items:center; background:var(--white); height:100vh; overflow-y:auto; }

  /* Mobile header */
  .cm-mobile-header { display:none; }

  /* Responsive */
  @media(max-width:900px){
    html,body{overflow:auto;height:auto}
    .cm-left{display:none !important}
    .cm-mobile-header{display:flex !important;width:100%;position:relative;overflow:hidden;height:180px;flex-direction:column;flex-shrink:0}
    .cm-right{margin-left:0 !important;height:auto !important;overflow-y:visible !important}
    .cm-shell{width:100% !important;max-width:100% !important;padding:28px 20px 60px !important}
  }

  ::placeholder{color:#9ca3af}
`;

/* ══════ SMALL COMPONENTS ══════ */

function FieldLabel({ text, optional }: { text: string; optional?: boolean }) {
  return (
    <label className="cm-label">
      {text}
      {optional
        ? <span style={{ color: "#9ca3af", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}> (optional)</span>
        : <span style={{ color: "var(--blue)" }}>*</span>}
    </label>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="cm-error-msg">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {message}
    </p>
  );
}

function Spinner({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" style={{ animation: "cm-spin .75s linear infinite" }}>
      <path d="M21 12a9 9 0 11-18 0" />
    </svg>
  );
}

/* ══════ INPUT FIELD ══════ */
function Field({ label, value, onChange, placeholder, type = "text", icon, error, maxLength, readOnly, hint, optional }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
  type?: string; icon: React.ReactNode; error?: string; maxLength?: number;
  readOnly?: boolean; hint?: string; optional?: boolean;
}) {
  return (
    <div>
      <FieldLabel text={label} optional={optional} />
      <div className={`cm-input-shell${error ? " error" : ""}`}>
        <span className="cm-input-icon">{icon}</span>
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} maxLength={maxLength} readOnly={readOnly}
          style={{ letterSpacing: type === "password" ? ".1em" : undefined }} />
      </div>
      {error ? <FieldError message={error} /> : hint && <p style={{ margin: "5px 0 0 2px", fontSize: "11.5px", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>{hint}</p>}
    </div>
  );
}

/* ══════ PASSWORD FIELD ══════ */
function PasswordField({ label, value, onChange, error, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <FieldLabel text={label} />
      <div className={`cm-input-shell${error ? " error" : ""}`}>
        <span className="cm-input-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        </span>
        <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? "Enter password"} style={{ letterSpacing: show ? ".02em" : ".1em", paddingRight: "44px" }} />
        <button type="button" onClick={() => setShow(s => !s)}
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: "4px", borderRadius: "6px" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")} onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>
          {show
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
        </button>
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

/* ══════ SELECT FIELD ══════ */
function SelectField({ label, value, onChange, options, placeholder, icon, error }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
  placeholder: string; icon: React.ReactNode; error?: string;
}) {
  return (
    <div>
      <FieldLabel text={label} />
      <div className={`cm-input-shell${error ? " error" : ""}`}>
        <span className="cm-input-icon">{icon}</span>
        <select value={value} onChange={e => onChange(e.target.value)} style={{ color: value ? "var(--text-primary)" : "#9ca3af", paddingRight: "32px" }}>
          <option value="" disabled hidden>{placeholder}</option>
          {options.map(o => <option key={o} value={o} style={{ color: "#111827" }}>{o}</option>)}
        </select>
        <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9ca3af" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

/* ══════ TEXTAREA ══════ */
function TextareaField({ label, value, onChange, placeholder, error }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; error?: string;
}) {
  return (
    <div>
      <FieldLabel text={label} />
      <div className={`cm-input-shell${error ? " error" : ""}`}
        style={{ height: "auto", alignItems: "flex-start", padding: 0 }}
        onFocus={e => { const el = e.currentTarget; el.style.borderColor = "var(--blue)"; el.style.background = "var(--white)"; el.style.boxShadow = "0 0 0 4px rgba(37,99,235,.08)"; }}
        onBlur={e => { const el = e.currentTarget; el.style.borderColor = error ? "#fca5a5" : "var(--border)"; el.style.background = "var(--surface)"; el.style.boxShadow = "none"; }}>
        <span style={{ position: "absolute", left: "14px", top: "14px", color: "#9ca3af" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </span>
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ flex: 1, width: "100%", border: "none", background: "transparent", outline: "none", fontSize: "14px", color: "var(--text-primary)", padding: "14px 14px 14px 42px", resize: "none", height: "auto", fontFamily: "'Inter',sans-serif" }} />
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

/* ══════ OTP INPUT ══════ */
function OtpInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  const handleChange = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const arr = digits.map((x, idx) => idx === i ? d : x);
    onChange(arr.join("").replace(/ /g, ""));
    if (d && i < 5) refs[i + 1].current?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i]?.trim() && i > 0) refs[i - 1].current?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (p) { onChange(p); refs[Math.min(p.length, 5)].current?.focus(); }
    e.preventDefault();
  };

  return (
    <div>
      <FieldLabel text="Enter OTP" />
      <div style={{ display: "flex", gap: "8px" }}>
        {digits.map((d, i) => {
          const filled = d.trim() !== "";
          return (
            <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1}
              value={filled ? d : ""}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              onPaste={handlePaste}
              style={{
                width: "42px", height: "48px", flexShrink: 0, borderRadius: "10px",
                border: `1.5px solid ${error ? "#fca5a5" : filled ? "var(--blue)" : "var(--border)"}`,
                background: filled ? "var(--blue-light)" : "var(--surface)",
                textAlign: "center", fontSize: "17px", fontWeight: 800,
                color: "var(--text-primary)", outline: "none", transition: "all .2s", caretColor: "var(--blue)",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,.1)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = error ? "#fca5a5" : filled ? "var(--blue)" : "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          );
        })}
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

/* ══════ PROFILE PHOTO UPLOADER ══════ */
function ProfilePhotoUploader({ preview, onChange }: { preview: string | null; onChange: (file: File, url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [locked, setLocked] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setLocked(true);
    onChange(f, URL.createObjectURL(f));
  }, [onChange]);

  const handleClick = () => {
    if (locked) { setShowTip(true); setTimeout(() => setShowTip(false), 2500); return; }
    inputRef.current?.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div style={{ position: "relative" }}>
        <div
          onClick={handleClick}
          onDragOver={e => { if (locked) return; e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); if (!locked) { const f = e.dataTransfer.files[0]; if (f) handleFile(f); } }}
          style={{
            width: "104px", height: "104px", borderRadius: "50%",
            cursor: locked ? "not-allowed" : "pointer",
            border: `2.5px ${preview ? "solid" : "dashed"} ${drag ? "var(--blue)" : preview ? "var(--blue)" : "#fca5a5"}`,
            background: drag ? "var(--blue-light)" : preview ? "var(--blue-light)" : "var(--red-light)",
            position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all .22s", boxShadow: preview ? "0 0 0 4px rgba(37,99,235,.1)" : "0 0 0 3px rgba(239,68,68,.08)",
          }}
        >
          {preview ? (
            <>
              <img src={preview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "rgba(0,0,0,.4)", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: locked ? 1 : 0, transition: "opacity .2s",
              }}
                onMouseEnter={e => { if (!locked) e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={e => { if (!locked) e.currentTarget.style.opacity = "0"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {locked ? <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></> : <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>}
                </svg>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={drag ? "var(--blue)" : "#ef4444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", margin: "0 auto 4px" }}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span style={{ fontSize: "9px", fontWeight: 700, color: drag ? "var(--blue)" : "#ef4444", letterSpacing: ".06em", textTransform: "uppercase" }}>Required</span>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>

        {locked && (
          <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "22px", height: "22px", borderRadius: "50%", background: "#f59e0b", border: "2.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
        )}
        {showTip && (
          <div style={{ position: "absolute", bottom: "-44px", left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: "#fff", fontSize: "11px", fontWeight: 600, padding: "6px 12px", borderRadius: "8px", whiteSpace: "nowrap", zIndex: 10, boxShadow: "0 4px 14px rgba(0,0,0,.2)" }}>
            🔒 1 change allowed per month
          </div>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", margin: "0 0 2px 0" }}>
          Profile Photo <span style={{ color: "#ef4444" }}>*</span>
        </p>
        <p style={{ fontSize: "11px", color: locked ? "#f59e0b" : "var(--text-muted)", margin: 0, fontWeight: locked ? 600 : 400 }}>
          {locked ? "🔒 Changeable once/month" : "Clear face photo required"}
        </p>
      </div>
    </div>
  );
}

/* ══════ UPLOAD ZONE ══════ */
function UploadZone({ label, side, error, onChange }: { label: string; side: "front" | "back"; error?: string; onChange: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(f)); setLocked(true); onChange(f);
  }, [onChange]);

  const handleClick = () => {
    if (locked) { setShowTip(true); setTimeout(() => setShowTip(false), 2200); return; }
    inputRef.current?.click();
  };

  return (
    <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
      <FieldLabel text={label} />
      <div
        onClick={handleClick}
        onDragOver={e => { if (locked) return; e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); if (!locked) { const f = e.dataTransfer.files[0]; if (f) handleFile(f); } }}
        style={{
          borderRadius: "var(--radius-lg)",
          border: `1.5px ${locked ? "solid" : "dashed"} ${error ? "#fca5a5" : drag ? "var(--blue)" : preview ? "#22c55e" : "var(--border)"}`,
          background: drag ? "var(--blue-light)" : preview ? "var(--green-light)" : "var(--surface)",
          minHeight: "148px", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: locked ? "not-allowed" : "pointer",
          position: "relative", overflow: "hidden", transition: "all .2s",
        }}
      >
        {preview ? (
          <>
            <img src={preview} alt={label} style={{ width: "100%", height: "148px", objectFit: "cover", filter: "brightness(.88)" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.42)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "4px" }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <p style={{ color: "#fff", fontSize: "11px", fontWeight: 700, margin: 0 }}>Locked</p>
            </div>
            <div style={{ position: "absolute", top: "8px", right: "8px", background: "#16a34a", borderRadius: "6px", padding: "2px 8px", fontSize: "10px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "3px" }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Uploaded
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 14px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", margin: "0 auto 10px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={drag ? "var(--blue)" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {side === "front"
                  ? <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>
                  : <><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></>}
              </svg>
            </div>
            <p style={{ fontSize: "12.5px", fontWeight: 600, color: drag ? "var(--blue)" : "var(--text-secondary)", margin: "0 0 2px" }}>{drag ? "Drop here!" : "Click or drag"}</p>
            <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>PNG, JPG up to 10 MB</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>
      {showTip && (
        <div style={{ position: "absolute", bottom: "-40px", left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: "#fff", fontSize: "11px", fontWeight: 600, padding: "6px 12px", borderRadius: "8px", whiteSpace: "nowrap", zIndex: 20 }}>
          🔒 Cannot be changed
        </div>
      )}
      {error && <FieldError message={error} />}
    </div>
  );
}

/* ══════ STEP PILLS ══════ */
function StepPills({ step }: { step: PartnerStep }) {
  const steps = [{ n: 1, label: "Personal" }, { n: 2, label: "Address" }, { n: 3, label: "KYC" }, { n: 4, label: "Payment" }, { n: 5, label: "Review" }];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
      {steps.map((s, i) => {
        const done = step > s.n, active = step === s.n;
        return (
          <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "initial" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div className="cm-step-dot" style={{
                background: done ? "#22c55e" : active ? "var(--blue)" : "var(--surface)",
                border: `2px solid ${done ? "#22c55e" : active ? "var(--blue)" : "var(--border)"}`,
                color: done || active ? "#fff" : "#9ca3af",
                boxShadow: active ? "0 0 0 3px rgba(37,99,235,.12)" : "none",
              }}>
                {done
                  ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span style={{ fontSize: "11px", fontWeight: 800 }}>{s.n}</span>}
              </div>
              <span style={{ fontSize: "9px", fontWeight: 700, color: done ? "#22c55e" : active ? "var(--blue)" : "#9ca3af", textTransform: "uppercase", letterSpacing: ".05em", whiteSpace: "nowrap" }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: "2px", margin: "0 3px 16px", background: done ? "#22c55e" : "var(--border)", transition: "background .35s" }} />}
          </div>
        );
      })}
    </div>
  );
}

/* ══════ PINCODE FIELD ══════ */
function PincodeField({ value, onChange, stateValue, onStateDetected, error, stateError }: {
  value: string; onChange: (v: string) => void; stateValue: string;
  onStateDetected: (state: string) => void; error?: string; stateError?: string;
}) {
  const [fetching, setFetching] = useState(false);
  const [failed, setFailed] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length === 6) {
      debounceRef.current = setTimeout(async () => {
        setFailed(false); setFetching(true);
        const state = await fetchStateFromPincode(value);
        setFetching(false);
        if (state) { onStateDetected(state); setFailed(false); }
        else { onStateDetected(""); setFailed(true); }
      }, 400);
    } else {
      debounceRef.current = setTimeout(() => { onStateDetected(""); setFailed(false); setFetching(false); }, 0);
    }
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <FieldLabel text="Pincode" />
        <div className={`cm-input-shell${error ? " error" : ""}`}>
          <span className="cm-input-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </span>
          <input type="tel" value={value} maxLength={6}
            onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 6); onChange(v); }}
            placeholder="e.g. 400001" style={{ letterSpacing: ".08em", paddingRight: "40px" }} />
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            {fetching && <Spinner color="#2563eb" />}
            {!fetching && stateValue && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            )}
            {!fetching && failed && value.length === 6 && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            )}
          </span>
        </div>
        {error ? <FieldError message={error} />
          : failed && value.length === 6 && (
            <p style={{ margin: "5px 0 0 2px", fontSize: "11.5px", color: "#f59e0b", fontWeight: 600 }}>
              Pincode not found — enter state manually
            </p>
          )}
      </div>

      {(stateValue || failed) && value.length === 6 && (
        <div className="cm-state-in" style={{ marginTop: "14px" }}>
          <FieldLabel text="State" />
          <div className="cm-input-shell" style={{ borderColor: stateValue ? "#22c55e" : "var(--border)", background: stateValue ? "var(--green-light)" : "var(--surface)" }}>
            <span className="cm-input-icon" style={{ color: stateValue ? "#16a34a" : "#9ca3af" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <input type="text" value={stateValue} readOnly={!failed}
              onChange={e => { if (failed) onStateDetected(e.target.value); }}
              placeholder="State will appear here"
              style={{ color: stateValue ? "#16a34a" : "var(--text-primary)", fontWeight: stateValue ? 700 : 400, paddingRight: stateValue ? "110px" : "16px" }} />
            {stateValue && !failed && (
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "3px", background: "#dcfce7", borderRadius: "6px", padding: "2px 8px" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#15803d" }}>Auto-detected</span>
              </span>
            )}
          </div>
          {stateError && <FieldError message={stateError} />}
        </div>
      )}
    </div>
  );
}

/* ══════ REVIEW ROW ══════ */
function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</p>
        <p style={{ margin: "3px 0 0", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", wordBreak: "break-all" }}>{value || "—"}</p>
      </div>
    </div>
  );
}

/* ══════ INFO BANNER ══════ */
function Banner({ icon, text, variant = "blue" }: { icon: React.ReactNode; text: React.ReactNode; variant?: "blue" | "green" | "amber" | "red" }) {
  const colors: Record<string, { bg: string; border: string; color: string }> = {
    blue: { bg: "var(--blue-light)", border: "var(--blue-border)", color: "#1d4ed8" },
    green: { bg: "var(--green-light)", border: "var(--green-border)", color: "#166534" },
    amber: { bg: "var(--amber-light)", border: "#fde68a", color: "#92400e" },
    red: { bg: "var(--red-light)", border: "#fca5a5", color: "#991b1b" },
  };
  const c = colors[variant];
  return (
    <div style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "var(--radius-md)", padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <span style={{ color: c.color, flexShrink: 0, marginTop: "1px" }}>{icon}</span>
      <p style={{ fontSize: "12.5px", color: c.color, fontWeight: 500, lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  );
}

/* ══════ LEFT PANEL ══════ */
const LEFT_DATA = [
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=90", pos: "center 20%", accent: "#60a5fa", rgb: "37,99,235", glowA: "rgba(37,99,235,.55)", glowB: "rgba(14,165,233,.20)", badge: "Step 1 — Personal Info", h1: "Build your", h2: "trusted profile.", sub: "Your name, photo and email are the first things customers see.", stat: "Partners with complete profiles get ", statB: "2.8× more bookings.", cards: [{ ico: "👤", t: "Profile photo builds trust", b: "Customers are 3× more likely to book with a clear photo." }, { ico: "✉️", t: "Verified email gets you noticed", b: "OTP-verified partners rank higher in search results." }, { ico: "📈", t: "Zero commission — first month", b: "New partners keep 100% of earnings for their first month." }] },
  { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=90", pos: "center 55%", accent: "#a78bfa", rgb: "124,58,237", glowA: "rgba(124,58,237,.50)", glowB: "rgba(167,139,250,.18)", badge: "Step 2 — Your Location", h1: "Serve your", h2: "neighbourhood.", sub: "Customers search by city. Precise location = faster bookings.", stat: "Partners in top cities see jobs within ", statB: "minutes of going live.", cards: [{ ico: "📍", t: "Hyperlocal matching", b: "We match you with customers in your exact area." }, { ico: "🚗", t: "Doorstep service requests", b: "Enable on-site visits so customers book you directly." }, { ico: "📊", t: "City-level demand insights", b: "See which services are trending near you." }] },
  { img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=90", pos: "center 40%", accent: "#34d399", rgb: "16,185,129", glowA: "rgba(16,185,129,.45)", glowB: "rgba(52,211,153,.18)", badge: "Step 3 — Aadhaar KYC", h1: "Your identity,", h2: "100% secure.", sub: "KYC takes under 2 minutes and unlocks your Verified badge.", stat: "Verified partners earn ", statB: "41% more per month on average.", cards: [{ ico: "🔒", t: "AES-256 encryption", b: "Your Aadhaar data is encrypted and never shared." }, { ico: "✅", t: "Verified badge unlocked", b: "Complete KYC to get the blue Verified badge customers trust." }, { ico: "♾️", t: "One-time process", b: "Done once, valid for the lifetime of your account." }] },
  { img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=90", pos: "center 35%", accent: "#fb923c", rgb: "234,88,12", glowA: "rgba(234,88,12,.45)", glowB: "rgba(251,146,60,.18)", badge: "Step 4 — Payment Setup", h1: "Get paid", h2: "instantly.", sub: "Earnings land in your account the moment a job is done.", stat: "Average partner earns ", statB: "₹28,000/month in their first quarter.", cards: [{ ico: "⚡", t: "Instant UPI payouts", b: "Real-time transfers — money hits your account within seconds." }, { ico: "🏦", t: "Bank-grade security", b: "All transactions via RBI-approved rails with 256-bit SSL." }, { ico: "💯", t: "Zero deduction — month one", b: "Your first month is commission-free. Keep everything." }] },
  { img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=90", pos: "center 30%", accent: "#facc15", rgb: "202,138,4", glowA: "rgba(202,138,4,.42)", glowB: "rgba(250,204,21,.16)", badge: "Step 5 — Final Review", h1: "Almost", h2: "there! 🎉", sub: "One last look before you go live — you're almost done.", stat: "Applications reviewed within ", statB: "24–48 hours — usually faster.", cards: [{ ico: "👁️", t: "Review before you submit", b: "Once submitted, changes require contacting support." }, { ico: "⏱️", t: "Fast approval — 24 hrs", b: "Most applications are reviewed and approved quickly." }, { ico: "📞", t: "Welcome call from us", b: "After approval, expect a call from our onboarding team." }] },
];

function LeftPanel({ step }: { step: PartnerStep }) {
  const d = LEFT_DATA[step - 1];
  return (
    <div className="cm-left">
      {/* BG Image */}
      <div key={`bg-${step}`} style={{ position: "absolute", inset: "-8%", backgroundImage: `url(${d.img})`, backgroundSize: "cover", backgroundPosition: d.pos, animation: "cm-pan 28s ease-in-out infinite alternate, cm-kenBurns 28s ease-in-out infinite alternate" }} />
      {/* Overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,rgba(1,4,20,.96) 0%,rgba(3,10,40,.90) 40%,rgba(5,15,50,.76) 75%,rgba(6,18,55,.58) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 55% at -5% 108%,${d.glowA} 0%,transparent 55%)`, transition: "background .6s" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 45% at 108% -3%,${d.glowB} 0%,transparent 52%)`, transition: "background .6s" }} />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 4 }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            {/* Grid icon matching Navbar */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </div>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-.5px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            City<span style={{ color: d.accent }}>Mate</span>
          </span>
          <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,.4)", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "5px", padding: "2px 7px" }}>Partners</span>
        </Link>
      </div>

      {/* Content */}
      <div key={`c-${step}`} style={{ position: "relative", zIndex: 4, animation: "cm-fadeUp .5s cubic-bezier(.16,1,.3,1) both" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: `rgba(${d.rgb},.18)`, border: `1px solid rgba(${d.rgb},.35)`, borderRadius: "50px", padding: "5px 13px", marginBottom: "22px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: d.accent, display: "inline-block", animation: "cm-pulse 2s ease infinite" }} />
          <span style={{ fontSize: "10.5px", fontWeight: 700, color: d.accent, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d.badge}</span>
        </div>

        {/* Headline */}
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: "#fff", lineHeight: 1.12, letterSpacing: "-1.5px", margin: "0 0 12px" }}>
          {d.h1}<br />
          <span style={{ background: `linear-gradient(110deg,#fff 0%,${d.accent} 40%,#fff 80%)`, backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "cm-shimmer 5s linear infinite" }}>{d.h2}</span>
        </h2>

        <p style={{ color: "rgba(255,255,255,.48)", fontSize: "14px", lineHeight: 1.75, maxWidth: "320px", margin: "0 0 6px", fontFamily: "'Inter',sans-serif" }}>{d.sub}</p>
        <p style={{ color: "rgba(255,255,255,.26)", fontSize: "12.5px", maxWidth: "300px", margin: "0 0 24px", fontFamily: "'Inter',sans-serif" }}>
          {d.stat}<strong style={{ color: "rgba(255,255,255,.7)", fontWeight: 600 }}>{d.statB}</strong>
        </p>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {d.cards.map((c, i) => (
            <div key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 14px", borderRadius: "14px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(14px)", transition: "all .25s cubic-bezier(.16,1,.3,1)", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.09)"; e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = `rgba(${d.rgb},.28)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; }}
            >
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: `rgba(${d.rgb},.18)`, border: `1px solid rgba(${d.rgb},.28)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px" }}>{c.ico}</div>
              <div>
                <p style={{ color: "#fff", fontSize: "12.5px", fontWeight: 700, margin: "0 0 2px", fontFamily: "'Inter',sans-serif" }}>{c.t}</p>
                <p style={{ color: "rgba(255,255,255,.36)", fontSize: "11px", lineHeight: 1.55, margin: 0, fontFamily: "'Inter',sans-serif" }}>{c.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 4 }}>
        <p style={{ color: "rgba(255,255,255,.22)", fontSize: "11px", fontFamily: "'Inter',sans-serif", margin: 0 }}>
          🔒 Your data is protected under our <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

/* ══════ SECTION CARD ══════ */
function SectionCard({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <p style={{ margin: 0, fontSize: "11px", fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".08em" }}>{title}</p>
        {onEdit && (
          <button onClick={onEdit}
            style={{ background: "none", border: "1px solid var(--border)", cursor: "pointer", color: "var(--blue)", fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "var(--radius-sm)", transition: "all .15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--blue-light)"; e.currentTarget.style.borderColor = "var(--blue-border)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}>
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ══════ MAIN ══════ */
export default function Partner(): React.ReactElement {
  const navigate = useNavigate();
  const [step, setStep] = useState<PartnerStep>(1);
  const [animKey, setAnimKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const INIT: PartnerFormData = {
    fullName: "", email: "", phone: "", password: "", confirmPassword: "", serviceType: "",
    profilePhoto: null, address: "", city: "", state: "", pincode: "",
    aadhaarNumber: "", aadhaarFront: null, aadhaarBack: null, panNumber: "",
    paymentMethod: "", upiId: "", accountHolderName: "", bankName: "",
    bankBranch: "", accountNumber: "", ifscCode: "",
  };
  const [form, setForm] = useState<PartnerFormData>(INIT);
  const [errors, setErrors] = useState<PartnerFormErrors>({});
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCD, setResendCD] = useState(0);

  const setField = (k: keyof PartnerFormData, v: string | File) => setForm(f => ({ ...f, [k]: v }));
  const clearErr = (k: string) => setErrors(e => ({ ...e, [k]: undefined }));
  const goStep = (n: PartnerStep) => { setAnimKey(k => k + 1); setStep(n); setErrors({}); };

  const startCD = () => {
    setResendCD(30);
    const iv = setInterval(() => setResendCD(p => { if (p <= 1) { clearInterval(iv); return 0; } return p - 1; }), 1000);
  };

  const handleSendOtp = () => {
    if (!form.email.trim()) { setErrors(e => ({ ...e, email: "Email address is required" })); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrors(e => ({ ...e, email: "Enter a valid email address" })); return; }
    setOtpLoading(true);
    setTimeout(() => { setOtpLoading(false); setOtpSent(true); setOtpValue(""); startCD(); }, 1200);
  };
  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) { setErrors(e => ({ ...e, otp: "Please enter the 6-digit OTP" })); return; }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      if (otpValue === "000000") setErrors(e => ({ ...e, otp: "Invalid OTP. Please try again." }));
      else { setOtpVerified(true); setErrors(e => ({ ...e, otp: undefined })); }
    }, 900);
  };

  /* Validation */
  const v1 = () => {
    const e: PartnerFormErrors = {};
    if (!form.profilePhoto) e.profilePhoto = "Profile photo is required";
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    else if (form.fullName.trim().length < 3) e.fullName = "At least 3 characters required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!otpVerified) e.otp = "Please verify your email with OTP first";
    if (!form.serviceType) e.serviceType = "Please select your service type";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Must be at least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e); return !Object.keys(e).length;
  };
  const v2 = () => {
    const e: PartnerFormErrors = {};
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city) e.city = "City is required";
    if (!form.pincode.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    if (!form.state.trim()) e.state = "State is required";
    setErrors(e); return !Object.keys(e).length;
  };
  const v3 = () => {
    const e: PartnerFormErrors = {};
    if (!form.aadhaarNumber.trim()) e.aadhaarNumber = "Aadhaar number is required";
    else if (!/^\d{12}$/.test(form.aadhaarNumber.replace(/\s/g, ""))) e.aadhaarNumber = "Enter a valid 12-digit Aadhaar number";
    if (!form.aadhaarFront) e.aadhaarFront = "Please upload the front side of your Aadhaar";
    if (!form.aadhaarBack) e.aadhaarBack = "Please upload the back side of your Aadhaar";
    if (form.panNumber.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase())) e.panNumber = "Enter a valid PAN (e.g. ABCDE1234F)";
    setErrors(e); return !Object.keys(e).length;
  };
  const v4 = () => {
    const e: PartnerFormErrors = {};
    if (!form.paymentMethod) { e.paymentMethod = "Please select a payment method"; setErrors(e); return false; }
    if (form.paymentMethod === "upi") {
      if (!form.upiId.trim()) e.upiId = "UPI ID is required";
      else if (!/^[\w.\-_]{3,}@[\w]{3,}$/.test(form.upiId)) e.upiId = "Enter a valid UPI ID (e.g. name@upi)";
    } else {
      if (!form.accountHolderName.trim()) e.accountHolderName = "Account holder name is required";
      if (!form.bankName) e.bankName = "Please select your bank";
      if (!form.bankBranch.trim()) e.bankBranch = "Bank branch name is required";
      if (!form.accountNumber.trim()) e.accountNumber = "Account number is required";
      else if (!/^\d{9,18}$/.test(form.accountNumber)) e.accountNumber = "Enter a valid account number";
      if (!form.ifscCode.trim()) e.ifscCode = "IFSC code is required";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase())) e.ifscCode = "Enter a valid IFSC code";
    }
    setErrors(e); return !Object.keys(e).length;
  };

  const handleNext = () => {
    if (step === 1 && v1()) goStep(2);
    else if (step === 2 && v2()) goStep(3);
    else if (step === 3 && v3()) goStep(4);
    else if (step === 4 && v4()) goStep(5);
    else if (step === 5) { setSubmitLoading(true); setTimeout(() => { setSubmitLoading(false); setSubmitted(true); }, 1600); }
  };

  const handleReset = () => {
    setSubmitted(false); setStep(1); setAnimKey(0); setForm(INIT); setErrors({});
    setOtpSent(false); setOtpValue(""); setOtpVerified(false); setOtpLoading(false); setResendCD(0); setProfilePreview(null);
  };

  /* ══════ SUCCESS ══════ */
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Inter',sans-serif" }}>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ textAlign: "center", maxWidth: "480px", width: "100%", animation: "cm-fadeUp .6s cubic-bezier(.16,1,.3,1) both" }}>
          {/* Avatar ring */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div style={{ position: "relative", animation: "cm-ringIn .55s .1s cubic-bezier(.16,1,.3,1) both" }}>
              <div style={{ width: "88px", height: "88px", borderRadius: "50%", overflow: "hidden", border: "3px solid var(--blue)", boxShadow: "0 0 0 5px rgba(37,99,235,.12), 0 8px 28px rgba(37,99,235,.2)", animation: "cm-glow 2.5s 1s ease-in-out infinite" }}>
                {profilePreview
                  ? <img src={profilePreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>}
              </div>
              <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "26px", height: "26px", borderRadius: "50%", background: "#22c55e", border: "2.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", animation: "cm-checkIn .4s .6s cubic-bezier(.16,1,.3,1) both", opacity: 0 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 100, animation: "cm-draw .5s .7s cubic-bezier(.16,1,.3,1) both" }}><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "26px", color: "var(--text-primary)", letterSpacing: "-.8px", margin: "0 0 8px" }}>Application submitted! 🎉</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, margin: "0 0 24px" }}>
            Our team will verify your details and reach out within <strong style={{ color: "var(--blue)" }}>24–48 hours</strong>.
          </p>

          {/* Info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
            {[
              { label: "Name", val: form.fullName, icon: "👤" },
              { label: "Phone", val: `+91 ${form.phone}`, icon: "📱" },
              { label: "City", val: form.city, icon: "📍" },
            ].map(({ label, val, icon }) => (
              <div key={label} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "12px 8px" }}>
                <span style={{ fontSize: "18px", display: "block", marginBottom: "4px" }}>{icon}</span>
                <p style={{ margin: 0, fontSize: "9.5px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</p>
                <p style={{ margin: "2px 0 0", fontSize: "11.5px", fontWeight: 700, color: "var(--text-primary)", wordBreak: "break-all" }}>{val}</p>
              </div>
            ))}
          </div>

          <Banner variant="blue" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            text={<>Verification in progress — email update within 48 hours at <strong>{form.email}</strong></>} />

          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button onClick={() => navigate("/")} className="cm-btn-primary" style={{ flex: 1 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Home
            </button>
            <button onClick={handleReset}
              style={{ flex: 1, height: "52px", borderRadius: "var(--radius-lg)", background: "var(--surface)", color: "var(--text-secondary)", border: "1.5px solid var(--border)", cursor: "pointer", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--blue-light)"; e.currentTarget.style.color = "var(--blue)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Step header meta */
  const stepIcons = [
    { color: "#2563eb", bg: "var(--blue-light)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: "Personal Information", sub: "Your name, phone, email and profile photo." },
    { color: "#7c3aed", bg: "#faf5ff", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, title: "Your Address", sub: "Enter your pincode to auto-detect your state." },
    { color: "#16a34a", bg: "var(--green-light)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>, title: "Aadhaar Verification", sub: "Upload clear photos of both sides of your Aadhaar." },
    { color: "#ea580c", bg: "#fff7ed", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: "Payment Details", sub: "How you want to receive your earnings." },
    { color: "#ca8a04", bg: "#fefce8", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>, title: "Review & Confirm", sub: "Make sure everything looks correct before submitting." },
  ];
  const sm = stepIcons[step - 1];

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", display: "flex", height: "100vh", overflow: "hidden", position: "fixed", inset: 0 }}>
      <style>{GLOBAL_STYLES}</style>
      <LeftPanel step={step} />

      <div className="cm-right">
        {/* Mobile header */}
        <div className="cm-mobile-header" style={{ position: "relative", overflow: "hidden", height: "175px", flexShrink: 0, flexDirection: "column" }}>
          <div style={{ position: "absolute", inset: "-6%", backgroundImage: "url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=85)", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,6,18,.85) 0%,rgba(3,6,18,.5) 55%,rgba(3,6,18,.92) 100%)" }} />
          <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 10 }}>
            {step === 1
              ? <Link to="/" className="cm-btn-back" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", color: "rgba(255,255,255,.9)", backdropFilter: "blur(10px)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back
                </Link>
              : <button onClick={() => goStep((step - 1) as PartnerStep)} className="cm-btn-back" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", color: "rgba(255,255,255,.9)", backdropFilter: "blur(10px)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> Back
                </button>}
          </div>
          <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </div>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-.5px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>City<span style={{ color: "#60a5fa" }}>Mate</span></span>
            </div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: "12px", margin: 0 }}>Partner Registration</p>
          </div>
        </div>

        {/* Form shell */}
        <div className="cm-shell" key={animKey} style={{ width: "100%", maxWidth: "440px", padding: "52px 0 80px" }}>

          {/* Back btn desktop */}
          <div className="cm-f1" style={{ marginBottom: "24px" }}>
            {step === 1
              ? <Link to="/" className="cm-btn-back">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back to Home
                </Link>
              : <button className="cm-btn-back" onClick={() => goStep((step - 1) as PartnerStep)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>}
          </div>

          <div className="cm-f2"><StepPills step={step} /></div>

          {/* Step header */}
          <div className="cm-f3" style={{ marginBottom: "28px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: sm.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: sm.color, boxShadow: `0 4px 14px ${sm.color}22` }}>
              {sm.icon}
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "24px", color: "var(--text-primary)", letterSpacing: "-.8px", margin: "0 0 6px" }}>{sm.title}</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", lineHeight: 1.65, margin: 0 }}>{sm.sub}</p>
          </div>

          {/* ══ STEP 1 ══ */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="cm-f4" style={{ background: "var(--surface)", border: `1.5px solid ${errors.profilePhoto ? "#fca5a5" : "var(--border)"}`, borderRadius: "var(--radius-xl)", padding: "20px 16px" }}>
                <ProfilePhotoUploader preview={profilePreview} onChange={(f, url) => { setProfilePreview(url); setField("profilePhoto", f); clearErr("profilePhoto"); }} />
                {errors.profilePhoto && <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: "12px", color: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {errors.profilePhoto}
                </p>}
              </div>

              <div className="cm-f5">
                <Field label="Full Name" value={form.fullName} onChange={v => { setField("fullName", v); clearErr("fullName"); }} placeholder="e.g. Rajesh Kumar Sharma" error={errors.fullName}
                  icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} />
              </div>

              {/* Phone */}
              <div className="cm-f5">
                <FieldLabel text="Phone Number" />
                <div className={`cm-input-shell${errors.phone ? " error" : ""}`}>
                  <div style={{ display: "flex", alignItems: "center", paddingLeft: "12px", paddingRight: "10px", borderRight: "1.5px solid var(--border)", height: "30px", flexShrink: 0, gap: "5px" }}>
                    <span style={{ fontSize: "12px" }}>🇮🇳</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#6b7280" }}>+91</span>
                  </div>
                  <input type="tel" value={form.phone} maxLength={10}
                    onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 10); setField("phone", v); clearErr("phone"); }}
                    placeholder="9876543210" style={{ paddingLeft: "12px", letterSpacing: ".04em" }} />
                </div>
                {errors.phone && <FieldError message={errors.phone} />}
              </div>

              {/* Service type */}
              <div className="cm-f5">
                <FieldLabel text="Service Type" />
                <div className={`cm-input-shell${errors.serviceType ? " error" : ""}`}>
                  <span className="cm-input-icon" style={{ color: form.serviceType ? (SERVICE_TYPES.find(s => s.id === form.serviceType)?.color ?? "#9ca3af") : "#9ca3af", fontSize: "15px" }}>
                    {form.serviceType ? SERVICE_TYPES.find(s => s.id === form.serviceType)?.emoji
                      : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>}
                  </span>
                  <select value={form.serviceType} onChange={e => { setField("serviceType", e.target.value); clearErr("serviceType"); }} style={{ color: form.serviceType ? "var(--text-primary)" : "#9ca3af", paddingRight: "32px" }}>
                    <option value="" disabled hidden>Select your service</option>
                    {SERVICE_TYPES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9ca3af" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
                {errors.serviceType && <FieldError message={errors.serviceType} />}
              </div>

              <div className="cm-f6"><PasswordField label="Password" value={form.password} onChange={v => { setField("password", v); clearErr("password"); }} placeholder="Create a password" error={errors.password} /></div>
              <div className="cm-f6"><PasswordField label="Confirm Password" value={form.confirmPassword} onChange={v => { setField("confirmPassword", v); clearErr("confirmPassword"); }} placeholder="Repeat your password" error={errors.confirmPassword} /></div>

              {/* Email + OTP */}
              <div className="cm-f6">
                <FieldLabel text="Email Address" />
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div className={`cm-input-shell${errors.email ? " error" : ""}`} style={{ borderColor: otpVerified ? "#22c55e" : undefined, background: otpVerified ? "var(--green-light)" : undefined }}>
                      <span className="cm-input-icon" style={{ color: otpVerified ? "#22c55e" : "#9ca3af" }}>
                        {otpVerified
                          ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                      </span>
                      <input type="email" value={form.email} readOnly={otpVerified}
                        onChange={e => { if (!otpVerified) { setField("email", e.target.value); clearErr("email"); setOtpSent(false); setOtpValue(""); } }}
                        placeholder="e.g. rajesh@example.com"
                        style={{ color: otpVerified ? "#16a34a" : "var(--text-primary)", fontWeight: otpVerified ? 600 : 400 }} />
                    </div>
                    {errors.email && <FieldError message={errors.email} />}
                    {otpVerified && <p style={{ margin: "4px 0 0 2px", fontSize: "11.5px", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Email verified
                    </p>}
                  </div>
                  {!otpVerified && (
                    <button type="button" onClick={handleSendOtp} disabled={otpLoading || resendCD > 0}
                      style={{ height: "52px", borderRadius: "var(--radius-lg)", background: otpLoading || resendCD > 0 ? "var(--surface)" : "var(--blue)", color: otpLoading || resendCD > 0 ? "#9ca3af" : "#fff", border: `1.5px solid ${otpLoading || resendCD > 0 ? "var(--border)" : "var(--blue)"}`, cursor: otpLoading || resendCD > 0 ? "not-allowed" : "pointer", fontSize: "12.5px", fontWeight: 700, padding: "0 14px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0, transition: "all .2s" }}>
                      {otpLoading ? <Spinner color="#9ca3af" /> : resendCD > 0 ? `${resendCD}s` : otpSent
                        ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>Resend</>
                        : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send OTP</>}
                    </button>
                  )}
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="cm-otp-in" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Banner variant="blue"
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                    text={<>OTP sent to <strong>{form.email}</strong>. Check your inbox.</>} />
                  <OtpInput value={otpValue} onChange={v => { setOtpValue(v); clearErr("otp"); }} error={errors.otp} />
                  <button type="button" onClick={handleVerifyOtp} disabled={otpLoading || otpValue.length !== 6}
                    style={{ width: "100%", height: "48px", borderRadius: "var(--radius-lg)", background: otpLoading || otpValue.length !== 6 ? "var(--surface)" : "#0ea5e9", color: otpLoading || otpValue.length !== 6 ? "#9ca3af" : "#fff", border: "none", cursor: otpLoading || otpValue.length !== 6 ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", transition: "all .2s", boxShadow: otpLoading || otpValue.length !== 6 ? "none" : "0 4px 16px rgba(14,165,233,.3)" }}>
                    {otpLoading ? <><Spinner /> Please wait…</> : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Verify OTP</>}
                  </button>
                </div>
              )}
              {errors.otp && !otpSent && <FieldError message={errors.otp} />}

              <div className="cm-f7">
                <button className="cm-btn-primary" onClick={handleNext}>
                  Continue <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 2 ══ */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="cm-f4"><TextareaField label="Full Address" value={form.address} onChange={v => { setField("address", v); clearErr("address"); }} placeholder="House/Shop no., Street, Landmark…" error={errors.address} /></div>

              <div className="cm-f5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <SelectField label="City" value={form.city} onChange={v => { setField("city", v); clearErr("city"); }} options={INDIAN_CITIES} placeholder="Select city" error={errors.city}
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>} />
                <PincodeField value={form.pincode} onChange={v => { setField("pincode", v); clearErr("pincode"); clearErr("state"); }}
                  stateValue={form.state} onStateDetected={s => { setField("state", s); clearErr("state"); }}
                  error={errors.pincode} stateError={errors.state} />
              </div>

              <div className="cm-f5">
                <Banner variant="amber"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                  text="Address should match your Aadhaar card for smooth verification." />
              </div>

              <div className="cm-f6">
                <button className="cm-btn-primary" onClick={handleNext}>
                  Continue <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 3 ══ */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="cm-f3">
                <Banner variant="green"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                  text={<><strong>Your data is encrypted & secure</strong><br />AES-256 encrypted. Only used for KYC — never shared.</>} />
              </div>

              {/* Aadhaar number */}
              <div className="cm-f4">
                <FieldLabel text="Aadhaar Number" />
                <div className={`cm-input-shell${errors.aadhaarNumber ? " error" : ""}`}>
                  <span className="cm-input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></span>
                  <input type="text" inputMode="numeric"
                    value={form.aadhaarNumber.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})(\d{1,4})?(\d{1,4})?/, (_: string, a: string, b?: string, c?: string) => [a, b, c].filter(Boolean).join(" "))}
                    maxLength={14}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const r = e.target.value.replace(/\D/g, "").slice(0, 12); setField("aadhaarNumber", r); clearErr("aadhaarNumber"); }}
                    placeholder="XXXX XXXX XXXX"
                    style={{ letterSpacing: ".12em", fontWeight: 600, paddingRight: "40px" }} />
                  {form.aadhaarNumber.length === 12 && (
                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                  )}
                </div>
                {errors.aadhaarNumber ? <FieldError message={errors.aadhaarNumber} /> : <p style={{ margin: "4px 0 0 2px", fontSize: "11.5px", color: "var(--text-muted)" }}>12-digit number — XXXX XXXX XXXX</p>}
              </div>

              <div className="cm-f5" style={{ display: "flex", gap: "12px" }}>
                <UploadZone label="Aadhaar Front" side="front" error={errors.aadhaarFront} onChange={f => { setField("aadhaarFront", f); clearErr("aadhaarFront"); }} />
                <UploadZone label="Aadhaar Back" side="back" error={errors.aadhaarBack} onChange={f => { setField("aadhaarBack", f); clearErr("aadhaarBack"); }} />
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".07em" }}>PAN Card (optional)</span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              </div>

              {/* PAN */}
              <div className="cm-f5">
                <FieldLabel text="PAN Number" optional />
                <div className={`cm-input-shell`} style={{ borderColor: form.panNumber && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase()) ? "#22c55e" : errors.panNumber ? "#fca5a5" : "var(--border)", background: form.panNumber && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase()) ? "var(--green-light)" : "var(--surface)" }}>
                  <span className="cm-input-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
                  <input type="text" value={form.panNumber} maxLength={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10); setField("panNumber", v); clearErr("panNumber"); }}
                    placeholder="e.g. ABCDE1234F" style={{ letterSpacing: ".12em", fontWeight: 600, paddingRight: "110px" }} />
                  {form.panNumber && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase()) && (
                    <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "3px", background: "#dcfce7", borderRadius: "6px", padding: "2px 8px" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#15803d" }}>Valid</span>
                    </span>
                  )}
                </div>
                {errors.panNumber ? <FieldError message={errors.panNumber} /> : <p style={{ margin: "4px 0 0 2px", fontSize: "11.5px", color: "var(--text-muted)" }}>5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)</p>}
              </div>

              {/* Tips */}
              <div className="cm-f6" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px" }}>
                <p style={{ fontSize: "10.5px", fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "8px" }}>Tips for faster verification</p>
                {["All 4 corners clearly visible", "Text is sharp and readable", "No glare or flash reflections", "Plain, well-lit background"].map(t => (
                  <p key={t} style={{ fontSize: "12.5px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px", fontWeight: 500 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </p>
                ))}
              </div>

              <div className="cm-f7">
                <button className="cm-btn-primary" onClick={handleNext}>
                  Continue <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 4 ══ */}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="cm-f4">
                <FieldLabel text="Payment Method" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[{ id: "upi", label: "UPI", sub: "Instant transfer", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                    { id: "bank", label: "Bank Transfer", sub: "Direct to account", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> }
                  ].map(opt => (
                    <div key={opt.id} className={`cm-pay-opt${form.paymentMethod === opt.id ? " active" : ""}`}
                      onClick={() => { setField("paymentMethod", opt.id); clearErr("paymentMethod"); }}>
                      <div style={{ width: "34px", height: "34px", borderRadius: "var(--radius-sm)", background: form.paymentMethod === opt.id ? "var(--blue-light)" : "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: form.paymentMethod === opt.id ? "var(--blue)" : "#9ca3af", transition: "all .2s" }}>{opt.icon}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: form.paymentMethod === opt.id ? "#1e40af" : "var(--text-primary)" }}>{opt.label}</p>
                        <p style={{ margin: "1px 0 0", fontSize: "11px", color: "var(--text-muted)" }}>{opt.sub}</p>
                      </div>
                      {form.paymentMethod === opt.id && (
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {errors.paymentMethod && <FieldError message={errors.paymentMethod} />}
              </div>

              {form.paymentMethod === "upi" && (
                <div className="cm-f5" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Banner variant="blue"
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                    text="Enter your UPI ID exactly as registered (e.g. name@okicici)" />
                  <Field label="UPI ID" value={form.upiId} onChange={v => { setField("upiId", v); clearErr("upiId"); }} placeholder="e.g. rajesh@okicici" error={errors.upiId}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} />
                </div>
              )}

              {form.paymentMethod === "bank" && (
                <div className="cm-f5" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Field label="Account Holder Name" value={form.accountHolderName} onChange={v => { setField("accountHolderName", v); clearErr("accountHolderName"); }} placeholder="As printed on passbook" error={errors.accountHolderName}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} />
                  <SelectField label="Bank Name" value={form.bankName} onChange={v => { setField("bankName", v); clearErr("bankName"); }} options={INDIAN_BANKS} placeholder="Select your bank" error={errors.bankName}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>} />
                  <Field label="Bank Branch" value={form.bankBranch} onChange={v => { setField("bankBranch", v); clearErr("bankBranch"); }} placeholder="e.g. Connaught Place, New Delhi" error={errors.bankBranch}
                    icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <Field label="Account Number" value={form.accountNumber} type="password" maxLength={18}
                      onChange={v => { if (/^\d{0,18}$/.test(v)) { setField("accountNumber", v); clearErr("accountNumber"); } }}
                      placeholder="••••••••" error={errors.accountNumber}
                      icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>} />
                    <Field label="IFSC Code" value={form.ifscCode} maxLength={11}
                      onChange={v => { setField("ifscCode", v.toUpperCase()); clearErr("ifscCode"); }}
                      placeholder="e.g. SBIN0001234" error={errors.ifscCode}
                      icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>} />
                  </div>
                </div>
              )}

              <div className="cm-f6">
                <button className="cm-btn-primary" onClick={handleNext}>
                  {form.paymentMethod ? "Continue to Review" : "Continue"} <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 5 — Review ══ */}
          {step === 5 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="cm-f3">
                <Banner variant="amber"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                  text={<><strong>Read Carefully</strong> — Once submitted, changes require contacting support.</>} />
              </div>

              {/* Profile photo card */}
              {profilePreview && (
                <div className="cm-f4">
                  <SectionCard title="Profile Photo" onEdit={() => goStep(1)}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", border: "2.5px solid var(--blue)", flexShrink: 0 }}>
                        <img src={profilePreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "5px" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        Photo uploaded & ready
                      </p>
                    </div>
                  </SectionCard>
                </div>
              )}

              <div className="cm-f4">
                <SectionCard title="Personal Info" onEdit={() => goStep(1)}>
                  <ReviewRow label="Full Name" value={form.fullName} />
                  <ReviewRow label="Phone Number" value={`+91 ${form.phone}`} />
                  <ReviewRow label="Email Address" value={form.email} />
                  <ReviewRow label="Service Type" value={(() => { const s = SERVICE_TYPES.find(x => x.id === form.serviceType); return s ? `${s.emoji} ${s.label}` : ""; })()} />
                  <div style={{ padding: "8px 0" }}>
                    <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".06em" }}>Email</p>
                    <p style={{ margin: "2px 0 0", fontSize: "13px", fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "5px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Verified
                    </p>
                  </div>
                </SectionCard>
              </div>

              <div className="cm-f5">
                <SectionCard title="Address" onEdit={() => goStep(2)}>
                  <ReviewRow label="Full Address" value={form.address} />
                  <ReviewRow label="City" value={form.city} />
                  <ReviewRow label="Pincode" value={form.pincode} />
                  <ReviewRow label="State" value={form.state} />
                </SectionCard>
              </div>

              <div className="cm-f5">
                <SectionCard title="Aadhaar KYC" onEdit={() => goStep(3)}>
                  <ReviewRow label="Aadhaar Number" value={form.aadhaarNumber ? form.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3") : "—"} />
                  {form.panNumber && <ReviewRow label="PAN Number" value={form.panNumber} />}
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    {[{ label: "Front Side", file: form.aadhaarFront }, { label: "Back Side", file: form.aadhaarBack }].map(({ label, file }) => (
                      <div key={label} style={{ flex: 1, background: file ? "var(--green-light)" : "var(--red-light)", border: `1px solid ${file ? "var(--green-border)" : "#fca5a5"}`, borderRadius: "var(--radius-sm)", padding: "8px", textAlign: "center" }}>
                        <p style={{ margin: 0, fontSize: "9.5px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</p>
                        <p style={{ margin: "3px 0 0", fontSize: "12.5px", fontWeight: 700, color: file ? "#16a34a" : "var(--red)" }}>{file ? "✓ Uploaded" : "Missing"}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              <div className="cm-f6">
                <SectionCard title="Payment" onEdit={() => goStep(4)}>
                  <ReviewRow label="Method" value={form.paymentMethod === "upi" ? "UPI" : "Bank Transfer"} />
                  {form.paymentMethod === "upi"
                    ? <ReviewRow label="UPI ID" value={form.upiId} />
                    : <><ReviewRow label="Account Holder" value={form.accountHolderName} /><ReviewRow label="Bank" value={form.bankName} /><ReviewRow label="Branch" value={form.bankBranch} /><ReviewRow label="Account Number" value={form.accountNumber ? `••••${form.accountNumber.slice(-4)}` : ""} /><ReviewRow label="IFSC Code" value={form.ifscCode} /></>}
                </SectionCard>
              </div>

              <div className="cm-f7">
                <Banner variant="amber"
                  icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  text={<>By submitting, you confirm all information is <strong>accurate and genuine</strong>. False info may result in account suspension.</>} />
              </div>

              <div className="cm-f7">
                <button className="cm-btn-primary" onClick={handleNext} disabled={submitLoading}>
                  {submitLoading ? <><Spinner />Please wait…</> : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Confirm & Submit Application</>}
                </button>
              </div>
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "#9ca3af", lineHeight: 1.7 }}>
            🔒 Secured with end-to-end encryption &nbsp;·&nbsp;
            <a href="#" style={{ color: "#9ca3af", textDecoration: "underline" }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}