import { useState } from "react";

const FOOTER_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

  .cmf * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes cmf-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    50%      { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
  }

  .cmf-link {
    color: #475569;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    line-height: 2;
    display: block;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.15s;
  }
  .cmf-link:hover { color: #2563eb; }

  .cmf-col-title {
    font-size: 11px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    margin-bottom: 14px;
    font-family: 'DM Sans', sans-serif;
  }

  .cmf-sub-input {
    flex: 1;
    background: #f1f5f9;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px 0 0 9px;
    padding: 11px 14px;
    font-size: 13px;
    color: #0f172a;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, background 0.2s;
    min-width: 0;
  }
  .cmf-sub-input::placeholder { color: #94a3b8; }
  .cmf-sub-input:focus {
    border-color: #2563eb;
    background: #eff6ff;
  }

  .cmf-sub-btn {
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 0 9px 9px 0;
    padding: 11px 18px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.18s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cmf-sub-btn:hover { background: #1d4ed8; }

  .cmf-social {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: #eff6ff;
    border: 1.5px solid #dbeafe;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #2563eb;
    text-decoration: none;
  }
  .cmf-social:hover {
    background: #2563eb;
    border-color: #2563eb;
    color: #fff;
    transform: translateY(-2px);
  }

  .cmf-app-btn {
    display: flex; align-items: center; gap: 10px;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 9px 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }
  .cmf-app-btn:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(37,99,235,0.1);
  }

  .cmf-trust {
    display: flex; align-items: flex-start; gap: 11px;
    padding: 11px 13px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1.5px solid #e2e8f0;
    transition: all 0.2s;
  }
  .cmf-trust:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
  }

  .cmf-divider {
    height: 1px;
    background: #e2e8f0;
  }

  .cmf-bottom-link {
    font-size: 12px;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .cmf-bottom-link:hover { color: #2563eb; }

  /* ── Accordion toggle (mobile only) ── */
  .cmf-acc-toggle {
    display: none;
  }

  /* ════════════════════════════════════
     RESPONSIVE BREAKPOINTS
  ════════════════════════════════════ */

  /* ── Tablet landscape ── */
  @media (max-width: 1024px) {
    .cmf-grid { grid-template-columns: repeat(3, 1fr) !important; }
  }

  /* ── Tablet portrait ── */
  @media (max-width: 768px) {
    .cmf-newsletter-inner {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 16px !important;
    }
    .cmf-newsletter-form {
      width: 100% !important;
      max-width: 100% !important;
    }
    .cmf-top     { flex-direction: column !important; gap: 32px !important; }
    .cmf-brand   { max-width: 100% !important; }
    .cmf-grid    { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
    .cmf-trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .cmf-bottom-row  { flex-direction: column !important; gap: 10px !important; text-align: center !important; }
    .cmf-bottom-links { flex-wrap: wrap !important; justify-content: center !important; gap: 12px !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 480px) {
    .cmf-grid { grid-template-columns: 1fr 1fr !important; gap: 0 !important; }

    /* Accordion columns */
    .cmf-col { border-bottom: 1px solid #e2e8f0; }
    .cmf-col-title {
      display: flex !important;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 14px 0;
      margin-bottom: 0 !important;
      user-select: none;
    }
    .cmf-col-title::after {
      content: '+';
      font-size: 18px;
      color: #2563eb;
      font-weight: 400;
      flex-shrink: 0;
    }
    .cmf-col.open .cmf-col-title::after { content: '−'; }
    .cmf-col-links { display: none; padding-bottom: 12px; }
    .cmf-col.open .cmf-col-links { display: block; }

    /* App + Contact col — always visible on mobile */
    .cmf-col-always .cmf-col-links { display: block !important; }
    .cmf-col-always .cmf-col-title { cursor: default; }
    .cmf-col-always .cmf-col-title::after { display: none; }

    /* Trust badges: single column on mobile */
    .cmf-trust-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }

    .cmf-stats-strip { padding: 14px !important; }
    .cmf-bottom-row  { flex-direction: column !important; gap: 10px !important; text-align: center !important; }
    .cmf-bottom-links { flex-wrap: wrap !important; justify-content: center !important; gap: 10px !important; }

    /* Full-width newsletter form */
    .cmf-newsletter-inner {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
    .cmf-newsletter-form {
      width: 100% !important;
      max-width: 100% !important;
      min-width: unset !important;
    }

    /* Grid: stack brand + accordion below */
    .cmf-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 360px) {
    .cmf-trust-grid { grid-template-columns: 1fr !important; }
    .cmf-app-btn { padding: 8px 10px !important; }
  }
`;

/* ── Accordion Column Component ── */
interface AccordionColProps {
  title: string;
  links: React.ReactNode;
  alwaysOpen?: boolean;
}

function AccordionCol({ title, links, alwaysOpen = false }: AccordionColProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`cmf-col${open ? " open" : ""}${alwaysOpen ? " cmf-col-always" : ""}`}>
      <div
        className="cmf-col-title"
        onClick={() => !alwaysOpen && setOpen(o => !o)}
      >
        {title}
      </div>
      <div className="cmf-col-links">
        {links}
      </div>
    </div>
  );
}

export default function CityMateFooter() {
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const handleSub = () => {
    if (!email.trim() || !email.includes("@")) return;
    setSubDone(true);
    setEmail("");
  };

  return (
    <footer className="cmf" style={{ background: "#fff", color: "#475569", fontFamily: "'DM Sans',sans-serif", borderTop: "1.5px solid #e2e8f0" }}>
      <style>{FOOTER_STYLES}</style>

      {/* ══ NEWSLETTER ══ */}
      <div style={{ background: "#eff6ff", borderBottom: "1.5px solid #dbeafe", padding: "24px" }}>
        <div className="cmf-newsletter-inner" style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", fontFamily: "'Sora',sans-serif", marginBottom: "3px" }}>
              📬 Stay in the Loop
            </div>
            <div style={{ fontSize: "12.5px", color: "#64748b" }}>
              Get exclusive deals, new service alerts & city updates
            </div>
          </div>
          {subDone ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#16a34a", fontWeight: 700, fontSize: "14px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              You're subscribed! 🎉
            </div>
          ) : (
            <div className="cmf-newsletter-form" style={{ display: "flex", flex: 1, maxWidth: "400px", minWidth: "240px" }}>
              <input className="cmf-sub-input" type="email" placeholder="Enter your email address"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSub()} />
              <button className="cmf-sub-btn" onClick={handleSub}>Subscribe</button>
            </div>
          )}
        </div>
      </div>

      {/* ══ MAIN LINKS ══ */}
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "44px 24px 36px" }}>
        <div className="cmf-top" style={{ display: "flex", gap: "48px" }}>

          {/* Brand */}
          <div className="cmf-brand" style={{ flexShrink: 0, minWidth: "200px", maxWidth: "230px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(37,99,235,0.3)", animation: "cmf-pulse 3s ease infinite", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2"  y="2"  width="9" height="9" rx="2" fill="#fff" opacity="0.95"/>
                  <rect x="13" y="2"  width="9" height="9" rx="2" fill="#fff" opacity="0.6"/>
                  <rect x="2"  y="13" width="9" height="9" rx="2" fill="#fff" opacity="0.6"/>
                  <rect x="13" y="13" width="9" height="9" rx="2" fill="#fff" opacity="0.95"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: 900, fontFamily: "'Sora',sans-serif", lineHeight: 1 }}>
                  <span style={{ color: "#0f172a" }}>City</span>
                  <span style={{ color: "#2563eb" }}>Mate</span>
                </div>
                <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Your City. Simplified.</div>
              </div>
            </div>

            <p style={{ fontSize: "12.5px", color: "#64748b", lineHeight: 1.75, marginBottom: "18px" }}>
              India's trusted platform for home services, verified PGs & daily needs. Available in 50+ cities.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { label: "Facebook",  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { label: "X/Twitter", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: "Instagram", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: "LinkedIn",  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { label: "YouTube",   icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg> },
              ].map(s => (
                <a key={s.label} href="#" className="cmf-social" title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Links grid — accordion on mobile */}
          <div className="cmf-grid" style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "28px" }}>

            <AccordionCol title="Services" links={
              <>
                {["Home Cleaning","AC Repair","Plumbing","Electrician","Carpentry","Pest Control","Painting","Deep Cleaning"].map(l => (
                  <a key={l} href="#" className="cmf-link">{l}</a>
                ))}
              </>
            }/>

            <AccordionCol title="Rooms & PG" links={
              <>
                {["Boys PG","Girls PG","1 BHK Flat","2 BHK Flat","Luxury Rooms","Short Stay","Co-Living","Hostel"].map(l => (
                  <a key={l} href="#" className="cmf-link">{l}</a>
                ))}
              </>
            }/>

            <AccordionCol title="Company" links={
              <>
                {["About Us","Careers","Press","Blog","City Coverage","Partner Program","Investor Relations","Sitemap"].map(l => (
                  <a key={l} href="#" className="cmf-link">{l}</a>
                ))}
              </>
            }/>

            <AccordionCol title="Support" links={
              <>
                {["Help Centre","Contact Us","Safety","Cancellation Policy","Refund Policy","Partner Support","Report Issue","FAQs"].map(l => (
                  <a key={l} href="#" className="cmf-link">{l}</a>
                ))}
              </>
            }/>

            {/* App + Contact: always open */}
            <AccordionCol alwaysOpen title="Get the App" links={
              <>
                <a href="#" className="cmf-app-btn" style={{ marginBottom: "8px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#16a34a"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                  <div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 600 }}>DOWNLOAD ON</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Play Store</div>
                  </div>
                </a>
                <a href="#" className="cmf-app-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563eb"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 600 }}>DOWNLOAD ON</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>App Store</div>
                  </div>
                </a>
                <div style={{ marginTop: "20px" }}>
                  <div className="cmf-col-title" style={{ cursor: "default" }}>Contact</div>
                  <a href="tel:+911800001234" className="cmf-link">📞 1800-000-1234</a>
                  <a href="mailto:support@citymate.in" className="cmf-link">✉️ support@citymate.in</a>
                  <a href="#" className="cmf-link">💬 Live Chat</a>
                </div>
              </>
            }/>
          </div>
        </div>
      </div>

      <div className="cmf-divider"/>

      {/* ══ TRUST BADGES ══ */}
      <div style={{ background: "#f8fafc", borderTop: "1.5px solid #e2e8f0", borderBottom: "1.5px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "28px 24px" }}>
          <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", fontFamily: "'Sora',sans-serif", marginBottom: "16px", letterSpacing: "-0.1px" }}>
            🛡️ Why Thousands Trust CityMate
          </div>
          <div className="cmf-trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "10px" }}>
            {[
              { icon: "✅", title: "100% Verified",   desc: "Background-checked professionals" },
              { icon: "💰", title: "Best Price",      desc: "Price match guarantee"            },
              { icon: "⚡", title: "60-Min Response", desc: "Fast & reliable service"          },
              { icon: "🔒", title: "Secure Payments", desc: "UPI, Cards — fully encrypted"     },
              { icon: "📞", title: "24/7 Support",    desc: "Always here to help you"          },
            ].map(b => (
              <div key={b.title} className="cmf-trust">
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>{b.title}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div style={{ background: "#2563eb" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 24px" }}>
          <div className="cmf-bottom-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif" }}>
              © 2025 CityMate Technologies Pvt. Ltd. · All rights reserved.
            </div>
            <div className="cmf-bottom-links" style={{ display: "flex", gap: "18px" }}>
              {["Privacy Policy","Terms of Service","Cookie Policy","Accessibility"].map(l => (
                <a key={l} href="#"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
                  {l}
                </a>
              ))}
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif" }}>
              🇮🇳 Made with ❤️ in India
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}