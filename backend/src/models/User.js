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
    role: {
      type: String,
      enum: ['user', 'partner', 'admin'],
      default: 'user'
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

    // ── Contact ───────────────────────────────────────────────
    mobile: {
      type: String,
      trim: true,
    },

    // ── Address (partner comes to this location) ──────────────
    address: {
      fullAddress: { type: String },
      city:        { type: String },
      state:       { type: String },
      pincode:     { type: String },
      landmark:    { type: String },
    },

    passwordResetToken:   String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// ── pre-save: hash password ───────────────────────────────────
userSchema.pre("save", async function() {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// ── instance method: compare password ────────────────────────
userSchema.methods.comparePassword = function(entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);