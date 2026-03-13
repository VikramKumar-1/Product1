const nodemailer = require("nodemailer");

// ── Transporter ───────────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

// ── Base sender ───────────────────────────────────────────────────────────────
const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to,
    subject,
    html,
  });
};

// ── Templates ─────────────────────────────────────────────────────────────────
const sendPasswordResetEmail = ({ to, name, resetURL }) =>
  sendEmail({
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#111">
        <h2 style="margin-bottom:4px">Reset your password</h2>
        <p>Hi ${name},</p>
        <p>We received a password reset request for your account.
           This link expires in <strong>15 minutes</strong>.</p>
        <a href="${resetURL}"
           style="display:inline-block;margin:20px 0;padding:12px 28px;
                  background:#4f46e5;color:#fff;border-radius:6px;
                  text-decoration:none;font-weight:600;">
          Reset Password
        </a>
        <p style="color:#555;font-size:13px">
          Didn't request this? You can safely ignore this email.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="color:#999;font-size:12px">
          Or paste this link in your browser:<br/>
          <a href="${resetURL}" style="color:#4f46e5">${resetURL}</a>
        </p>
      </div>
    `,
  });

const sendPasswordChangedEmail = ({ to, name }) =>
  sendEmail({
    to,
    subject: "Your password was changed",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#111">
        <h2>Password changed</h2>
        <p>Hi ${name},</p>
        <p>Your password was successfully updated.</p>
        <p style="color:#c0392b">
          If you didn't make this change, please reset your password immediately
          or contact support.
        </p>
      </div>
    `,
  });

module.exports = { sendPasswordResetEmail, sendPasswordChangedEmail };