const mongoose = require('mongoose');

/**
 * Booking Schema
 * Core transaction between user → service → partner.
 * Collection: bookings
 */
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
      default: 'pending',
    },

    serviceAddress: {
      fullAddress: { type: String, required: true },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },

    bookingTime: { type: Date, required: true },

    price: { type: Number, required: true, min: 0 },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },

    cancellationReason: { type: String },
    notes: { type: String }, // user instructions to partner
  },
  {
    timestamps: true,
    collection: 'bookings',
  }
);

bookingSchema.index({ userId: 1 });
bookingSchema.index({ partnerId: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ bookingTime: 1 });

module.exports = mongoose.model('Booking', bookingSchema);