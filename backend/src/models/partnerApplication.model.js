const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * PartnerApplication Schema
 * Stores multi-step onboarding data before admin approval.
 * Collection: partner_applications
 */
const partnerApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    basicInfo: {
      name: { type: String, trim: true },
      email: { type: String, lowercase: true, trim: true },
      mobile: { type: String, trim: true },
      profileImage: { type: String },
      password: { type: String },
      partnerType: {
        type: String,
        enum: [
          'plumber', 'electrician', 'transporter', 'cleaner',
          'mechanic', 'delivery_partner', 'carpenter', 'ac_technician', 'other',
        ],
      },
    },

    kyc: {
      aadharNumber: { type: String },
      aadharFrontImage: { type: String },
      aadharBackImage: { type: String },
      panNumber: { type: String },
    },

    address: {
      fullAddress: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },

    payment: {
      method: { type: String, enum: ['bank_transfer', 'upi'] },
      accountHolderName: { type: String },
      bankName: { type: String },
      branchName: { type: String },
      ifscCode: { type: String },
      upiId: { type: String },
    },

    additionalDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    stepCompleted: { type: Number, default: 1 },

    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected'],
      default: 'draft',
    },

    rejectionReason: { type: String },
  },
  {
    timestamps: true,
    collection: 'partner_applications',
  }
);

// --- Indexes ---
partnerApplicationSchema.index({ 'basicInfo.email': 1 }, { unique: true, sparse: true });
partnerApplicationSchema.index({ 'kyc.panNumber': 1 }, { sparse: true });
partnerApplicationSchema.index({ 'kyc.aadharNumber': 1 }, { sparse: true });
partnerApplicationSchema.index({ status: 1 });

// Hash password before saving if modified
partnerApplicationSchema.pre('save', async function (next) {
  if (this.isModified('basicInfo.password') && this.basicInfo?.password) {
    this.basicInfo.password = await bcrypt.hash(this.basicInfo.password, 12);
  }
  next();
});

module.exports = mongoose.model('PartnerApplication', partnerApplicationSchema);