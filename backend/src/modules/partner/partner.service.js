const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PartnerApplication = require('../../models/partnerApplication.model');
const Partner = require('../../models/partner.model');
const PartnerReview = require('../../models/partnerReview.model');
const PartnerReport = require('../../models/partnerReport.model');
const AppError = require('../../utils/AppError');
const User = require('../../models/User');

// ─── Validation helpers ───────────────────────────────────────────────────────

const AADHAR_REGEX = /^\d{12}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── STEP 1: Basic Registration ───────────────────────────────────────────────

const registerPartner = async (body, files) => {
  const { name, email, mobile, password, partnerType, userId } = body;

  if (!EMAIL_REGEX.test(email)) throw new AppError('Invalid email address', 400);
  if (!MOBILE_REGEX.test(mobile)) throw new AppError('Invalid mobile number', 400);
  if (!name || !partnerType) throw new AppError('All fields are required', 400);

  // If guest user, password is required
  if (!userId && !password) throw new AppError('Password is required', 400);

  const profileImage = files?.profileImage?.[0]?.path || null;

  const existing = await PartnerApplication.findOne({ 'basicInfo.email': email });

  let application;

  if (existing) {
    existing.basicInfo = { name, email, mobile, password, partnerType, profileImage };
    existing.stepCompleted = 1;
    existing.status = 'draft';
    application = await existing.save();
  } else {
    application = await PartnerApplication.create({
      userId: userId || null, // logged in user id or null for guest
      basicInfo: { name, email, mobile, password, partnerType, profileImage },
      stepCompleted: 1,
    });
  }

  return { applicationId: application._id, message: 'Basic info saved successfully' };
};
// ─── STEP 2: KYC Details ─────────────────────────────────────────────────────

const submitKyc = async ({ applicationId, aadharNumber, panNumber }, files) => {
  if (!AADHAR_REGEX.test(aadharNumber)) throw new AppError('Aadhar must be 12 digits', 400);
  if (!PAN_REGEX.test(panNumber)) throw new AppError('Invalid PAN format (e.g., ABCDE1234F)', 400);

  const [dupAadharApp, dupPanApp, dupAadharPartner, dupPanPartner] = await Promise.all([
    PartnerApplication.findOne({ 'kyc.aadharNumber': aadharNumber, _id: { $ne: applicationId } }),
    PartnerApplication.findOne({ 'kyc.panNumber': panNumber, _id: { $ne: applicationId } }),
    Partner.findOne({ 'kyc.aadharNumber': aadharNumber }),
    Partner.findOne({ 'kyc.panNumber': panNumber }),
  ]);

  if (dupAadharApp || dupAadharPartner) throw new AppError('Aadhar number already registered', 409);
  if (dupPanApp || dupPanPartner) throw new AppError('PAN number already registered', 409);

  const aadharFrontImage = files?.aadharFrontImage?.[0]?.path;
  const aadharBackImage = files?.aadharBackImage?.[0]?.path;

  if (!aadharFrontImage || !aadharBackImage) {
    throw new AppError('Aadhar front and back images are required', 400);
  }

  const application = await PartnerApplication.findByIdAndUpdate(
    applicationId,
    { kyc: { aadharNumber, aadharFrontImage, aadharBackImage, panNumber }, stepCompleted: 2 },
    { new: true, runValidators: true }
  );

  if (!application) throw new AppError('Application not found', 404);

  return { message: 'KYC details saved successfully' };
};

// ─── STEP 3: Address Details ──────────────────────────────────────────────────

const submitAddress = async ({ applicationId, fullAddress, city, state, pincode }) => {
  if (!fullAddress || !city || !state || !pincode) {
    throw new AppError('All address fields are required', 400);
  }

  const application = await PartnerApplication.findByIdAndUpdate(
    applicationId,
    { address: { fullAddress, city, state, pincode }, stepCompleted: 3 },
    { new: true }
  );

  if (!application) throw new AppError('Application not found', 404);

  return { message: 'Address saved successfully' };
};

// ─── STEP 4: Payment Details ──────────────────────────────────────────────────

const submitPayment = async ({ applicationId, method, ...paymentFields }) => {
  if (!['bank_transfer', 'upi'].includes(method)) {
    throw new AppError('Invalid payment method. Choose bank_transfer or upi', 400);
  }

  let payment = { method };

  if (method === 'bank_transfer') {
    const { accountHolderName, bankName, branchName, ifscCode } = paymentFields;
    if (!accountHolderName || !bankName || !branchName || !ifscCode) {
      throw new AppError('All bank details are required', 400);
    }
    if (!IFSC_REGEX.test(ifscCode)) throw new AppError('Invalid IFSC code format', 400);
    payment = { ...payment, accountHolderName, bankName, branchName, ifscCode };
  } else {
    const { upiId } = paymentFields;
    if (!upiId) throw new AppError('UPI ID is required', 400);
    payment = { ...payment, upiId };
  }

  const application = await PartnerApplication.findByIdAndUpdate(
    applicationId,
    { payment, stepCompleted: 4 },
    { new: true }
  );

  if (!application) throw new AppError('Application not found', 404);

  return { message: 'Payment details saved successfully' };
};

// ─── STEP 5: Additional Details (Dynamic) ────────────────────────────────────

const submitAdditionalDetails = async ({ applicationId, ...details }, files) => {
  const application = await PartnerApplication.findById(applicationId);
  if (!application) throw new AppError('Application not found', 404);

  if (files?.drivingLicenseImage?.[0]) {
    details.drivingLicenseImage = files.drivingLicenseImage[0].path;
  }
  if (files?.rcBookImage?.[0]) {
    details.rcBookImage = files.rcBookImage[0].path;
  }
  if (files?.insuranceImage?.[0]) {
    details.insuranceImage = files.insuranceImage[0].path;
  }

  application.additionalDetails = details;
  application.stepCompleted = 5;
  await application.save();

  return { message: 'Additional details saved successfully' };
};

// ─── STEP 6: Final Submit ─────────────────────────────────────────────────────

const submitApplication = async ({ applicationId }) => {
  const application = await PartnerApplication.findById(applicationId);
  if (!application) throw new AppError('Application not found', 404);

  if (application.stepCompleted < 5) {
    throw new AppError(
      `Please complete all steps. You have completed step ${application.stepCompleted} of 5.`,
      400
    );
  }

  if (application.status !== 'draft') {
    throw new AppError('Application already submitted', 400);
  }

  application.status = 'pending';
  await application.save();

  return { message: 'Application submitted for review. We will notify you once approved.' };
};

// ─── Partner Login ────────────────────────────────────────────────────────────

const loginPartner = async ({ email, password }) => {
  if (!email || !password) throw new AppError('Email and password are required', 400);

  const partner = await Partner.findOne({ email }).select('+password');
  if (!partner) throw new AppError('Invalid credentials', 401);

  if (partner.status === 'suspended') {
    throw new AppError('Your account has been suspended. Contact support.', 403);
  }

  const isMatch = await partner.comparePassword(password);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  const accessToken = jwt.sign(
    { id: partner._id, role: 'partner' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { id: partner._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  partner.refreshToken = refreshToken;
  await partner.save({ validateBeforeSave: false });

  return {
    accessToken,
    refreshToken,
    partner: {
      id: partner._id,
      name: partner.name,
      email: partner.email,
      partnerType: partner.partnerType,
      verificationBadge: partner.verificationBadge,
      ratingAverage: partner.ratingAverage,
    },
  };
};

const logoutPartner = async (partnerId) => {
  await Partner.findByIdAndUpdate(partnerId, { refreshToken: null });
  return { message: 'Logged out successfully' };
};

// ─── Review System ────────────────────────────────────────────────────────────

const addReview = async ({ partnerId, userId, rating, reviewText }) => {
  if (!rating || rating < 1 || rating > 5) throw new AppError('Rating must be between 1 and 5', 400);

  const partner = await Partner.findById(partnerId);
  if (!partner) throw new AppError('Partner not found', 404);

  const existing = await PartnerReview.findOne({ partnerId, userId });
  if (existing) throw new AppError('You have already reviewed this partner', 409);

  await PartnerReview.create({ partnerId, userId, rating, reviewText });

  const newCount = partner.ratingCount + 1;
  const newAvg = ((partner.ratingAverage * partner.ratingCount) + rating) / newCount;

  partner.ratingCount = newCount;
  partner.reviewCount = newCount;
  partner.ratingAverage = Math.round(newAvg * 10) / 10;
  await partner.save({ validateBeforeSave: false });

  return { message: 'Review submitted successfully' };
};

const updateReview = async ({ partnerId, userId, rating, reviewText }) => {
  if (rating && (rating < 1 || rating > 5)) throw new AppError('Rating must be between 1 and 5', 400);

  const review = await PartnerReview.findOne({ partnerId, userId });
  if (!review) throw new AppError('Review not found', 404);

  const oldRating = review.rating;
  review.rating = rating || review.rating;
  review.reviewText = reviewText || review.reviewText;
  await review.save();

  const partner = await Partner.findById(partnerId);
  if (partner && partner.ratingCount > 0) {
    const newAvg =
      ((partner.ratingAverage * partner.ratingCount) - oldRating + review.rating) /
      partner.ratingCount;
    partner.ratingAverage = Math.round(newAvg * 10) / 10;
    await partner.save({ validateBeforeSave: false });
  }

  return { message: 'Review updated successfully' };
};

// ─── Report System ────────────────────────────────────────────────────────────

const reportPartner = async ({ partnerId, userId, reportType, description }) => {
  const validTypes = ['late_service', 'fraud', 'misbehavior', 'fake_profile', 'other'];
  if (!validTypes.includes(reportType)) throw new AppError('Invalid report type', 400);

  const partner = await Partner.findById(partnerId);
  if (!partner) throw new AppError('Partner not found', 404);

  await PartnerReport.create({
    partnerId,
    reportedByUserId: userId,
    reportType,
    description,
  });

  return { message: 'Report submitted successfully' };
};

// ─── Admin Services ───────────────────────────────────────────────────────────

const getPartnerApplications = async ({ status, page = 1, limit = 20 }) => {
  const filter = {};
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    PartnerApplication.find(filter)
      .select('-basicInfo.password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    PartnerApplication.countDocuments(filter),
  ]);

  return { applications, total, page: Number(page), pages: Math.ceil(total / limit) };
};



const rejectApplication = async (applicationId, rejectionReason) => {
  const application = await PartnerApplication.findById(applicationId);
  if (!application) throw new AppError('Application not found', 404);
  if (application.status !== 'pending') {
    throw new AppError('Only pending applications can be rejected', 400);
  }

  application.status = 'rejected';
  application.rejectionReason = rejectionReason;
  await application.save();

  return { message: 'Application rejected' };
};

const suspendPartner = async (partnerId) => {
  const partner = await Partner.findByIdAndUpdate(
    partnerId,
    { status: 'suspended' },
    { new: true }
  );
  if (!partner) throw new AppError('Partner not found', 404);
  return { message: 'Partner suspended' };
};

const activatePartner = async (partnerId) => {
  const partner = await Partner.findByIdAndUpdate(
    partnerId,
    { status: 'active' },
    { new: true }
  );
  if (!partner) throw new AppError('Partner not found', 404);
  return { message: 'Partner activated' };
};

const assignBadge = async (partnerId, badge) => {
  if (!['verified', 'ensured', 'none'].includes(badge)) {
    throw new AppError('Invalid badge. Choose verified, ensured, or none', 400);
  }
  const partner = await Partner.findByIdAndUpdate(
    partnerId,
    { verificationBadge: badge },
    { new: true }
  );
  if (!partner) throw new AppError('Partner not found', 404);
  return { message: `Badge '${badge}' assigned to partner` };
};

module.exports = {
  registerPartner,
  submitKyc,
  submitAddress,
  submitPayment,
  submitAdditionalDetails,
  submitApplication,
  loginPartner,
  logoutPartner,
  addReview,
  updateReview,
  reportPartner,
  getPartnerApplications,
  approveApplication,
  rejectApplication,
  suspendPartner,
  activatePartner,
  assignBadge,
};