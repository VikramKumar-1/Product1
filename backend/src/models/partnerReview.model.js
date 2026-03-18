const mongoose = require('mongoose');

/**
 * PartnerReview Schema
 * Users rate and review partners (once per partner).
 * Collection: partner_reviews
 */
const partnerReviewSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    collection: 'partner_reviews',
  }
);

// One review per user per partner
partnerReviewSchema.index({ partnerId: 1, userId: 1 }, { unique: true });
partnerReviewSchema.index({ partnerId: 1 });

module.exports = mongoose.model('PartnerReview', partnerReviewSchema);