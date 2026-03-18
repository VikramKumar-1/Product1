const mongoose = require('mongoose');

/**
 * PartnerReport Schema
 * Users can report partners for misconduct.
 * Collection: partner_reports
 */
const partnerReportSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
      required: true,
    },
    reportedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportType: {
      type: String,
      required: true,
      enum: ['late_service', 'fraud', 'misbehavior', 'fake_profile', 'other'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved'],
      default: 'pending',
    },
    adminNote: { type: String }, // admin can add notes when reviewing
  },
  {
    timestamps: true,
    collection: 'partner_reports',
  }
);

partnerReportSchema.index({ partnerId: 1 });
partnerReportSchema.index({ status: 1 });
partnerReportSchema.index({ reportedByUserId: 1 });

module.exports = mongoose.model('PartnerReport', partnerReportSchema);