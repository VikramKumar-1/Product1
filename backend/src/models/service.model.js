const mongoose = require('mongoose');

/**
 * ServiceCategory Schema
 * Top-level categories (Plumbing, Electrician, Transport...).
 * Collection: service_categories
 */
const serviceCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String }, // icon URL or icon identifier
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'service_categories' }
);

serviceCategorySchema.index({ isActive: 1 });

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

// ─────────────────────────────────────────────

/**
 * Service Schema
 * Individual services within a category.
 * e.g. "Fix leaking pipe" under "Plumbing"
 * Collection: services
 */
const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceCategory',
      required: true,
    },
    basePrice: { type: Number, required: true, min: 0 },
    estimatedDuration: { type: Number }, // in minutes
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'services' }
);

serviceSchema.index({ categoryId: 1 });
serviceSchema.index({ isActive: 1 });

const Service = mongoose.model('Service', serviceSchema);

// ─────────────────────────────────────────────

/**
 * PartnerService Schema
 * Partners register which services they offer with custom price & area.
 * Collection: partner_services
 */
const partnerServiceSchema = new mongoose.Schema(
  {
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
    price: { type: Number, required: true, min: 0 }, // partner's custom price
    serviceArea: [{ type: String }], // list of cities / pincodes served
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'partner_services' }
);

partnerServiceSchema.index({ partnerId: 1 });
partnerServiceSchema.index({ serviceId: 1 });
partnerServiceSchema.index({ isAvailable: 1 });

const PartnerService = mongoose.model('PartnerService', partnerServiceSchema);

module.exports = { ServiceCategory, Service, PartnerService };