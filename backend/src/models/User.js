const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Name is required"],
      trim:     true,
    },
    email: {
      type:      String,
      required:  [true, "Email is required"],
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:      String,
      minlength: [6, "Password must be at least 6 characters"],
      select:    false,
    },
    googleId: {
      type:   String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type:    String,
      default: "",
    },
    authProvider: {
      type:    String,
      enum:    ["local", "google"],
      default: "local",
    },
    isVerified: {
      type:    Boolean,
      default: false,
    },
    passwordResetToken:   String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// ── pre-save: hash password ───────────────────────────────────
// Use async WITHOUT next — Mongoose handles promise automatically
userSchema.pre("save", async function() {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// ── instance method: compare password ────────────────────────
userSchema.methods.comparePassword = function(entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);