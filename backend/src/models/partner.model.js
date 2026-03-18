const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Partner Schema
 * Stores approved partners moved from partner_applications.
 * Collection: partners
 */

const partnerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {type: String, required: true, lowercase: true, unique: true },
        mobile: {type: String, required: true },
        password: { type: String, required: true },
        profileImage: { type: String },

        partnerType: {
            type: String,
            required: true,
             enum: [
            'plumber', 'electrician', 'transporter', 'cleaner',
             'mechanic', 'delivery_partner', 'carpenter', 'ac_technician', 'other',
          ],
        },

        kyc: {
            aadharNumber: { type: String, required: true, match: /^[0-9]{12}$/, unique: true },
            aadharFrontImage: { type: String, required: true },
            aadharBackImage: { type : String, required: true},
            panNumber: {
                 type: String ,
                required: true,
                match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                unique: true,
            },

        },
         address: {
         fullAddress: { type: String, required: true },
         city: { type: String, required: true },
         state: { type: String, required: true },
         pincode: { type: String, required: true },
       },

        payment: {
        method: { type: String, enum: ['bank_transfer', 'upi'] },
        accountHolderName: { type: String },
        bankName: { type: String },
        branchName: { type: String },
        ifscCode: { type: String },
        upiId: { type: String },
      },
       /**
     * Flexible partner-type-specific fields.
     * Allows new partner types without schema changes.
     */
    
        additionalDetails: {
        type: mongoose.Schema.Types.Mixed,
       default: {},
      },
 
     status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
     },
 
      verificationBadge: {
      type: String,
      enum: ['none', 'verified', 'ensured'],
      default: 'none',
     },
 
    // Ratings aggregated on review submission
     ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
     ratingCount: { type: Number, default: 0 },
     reviewCount: { type: Number, default: 0 },
 
     isOnline: { type: Boolean, default: false },
     isAvailable: { type: Boolean, default: true },
 
     serviceAreas: [{ type: String }],
 
     refreshToken: { type: String },
    },
     {
    timestamps: true,
    collection: 'partners',
    }
);

// --- Indexes ---
partnerSchema.index({ partnerType: 1 });
partnerSchema.index({ status: 1 });
partnerSchema.index({ 'address.city': 1 });
partnerSchema.index({ 'kyc.panNumber': 1 }, { unique: true});
partnerSchema.index({ 'kyc.aadharNumber': 1 }, { unique: true });
 
// Hash password before saving if modified
partnerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
 
// Compare password for login
partnerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
 
module.exports = mongoose.model('Partner', partnerSchema);