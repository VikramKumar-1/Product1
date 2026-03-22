const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');
const partnerService = require('./partner.service');

// ─── Onboarding ───────────────────────────────────────────────────────────────

/**
 * POST /api/partners/register
 * Step 1: Basic info + OTP dispatch
 * User must be logged in — userId taken from JWT token
 */
exports.register = catchAsync(async (req, res) => {
  // If user is logged in, attach their id and prefill their info
  const userId = req.user?._id || null;

  const result = await partnerService.registerPartner(
    { ...req.body, userId },
    req.files
  );
  sendSuccess(res, 201, result);
});

/**
 * POST /api/partners/verify-otp
 * Step 2: OTP verification
 */
/*exports.verifyOtp = catchAsync(async (req, res) => {
  const result = await partnerService.verifyOtp(req.body);
  sendSuccess(res, 200, result);
});*/

/**
 * POST /api/partners/kyc
 * Step 3: KYC documents
 */
/*exports.submitKyc = catchAsync(async (req, res) => {
  const result = await partnerService.submitKyc(req.body, req.files);
  sendSuccess(res, 200, result);
});*/
exports.submitKyc = catchAsync(async (req, res) => {
   // trim all keys to handle accidental spaces from form-data
  
  console.log('BODY:', req.body);
  console.log('FILES:', req.files);
  const result = await partnerService.submitKyc(req.body, req.files);
  sendSuccess(res, 200, result);
});

/**
 * POST /api/partners/address
 * Step 4: Address details
 */
exports.submitAddress = catchAsync(async (req, res) => {
  const result = await partnerService.submitAddress(req.body);
  sendSuccess(res, 200, result);
});

/**
 * POST /api/partners/payment
 * Step 5: Payment method
 */
exports.submitPayment = catchAsync(async (req, res) => {
  const result = await partnerService.submitPayment(req.body);
  sendSuccess(res, 200, result);
});

/**
 * POST /api/partners/additional-details
 * Step 6: Partner-type-specific details
 */
exports.submitAdditionalDetails = catchAsync(async (req, res) => {
  const result = await partnerService.submitAdditionalDetails(req.body, req.files);
  sendSuccess(res, 200, result);
});

// for preview before submitting API - get('/application/:id',
exports.getApplication = catchAsync(async (req, res) => {
  const result = await partnerService.getApplication(req.params.id);
  sendSuccess(res, 200, result);
});
// in preview edit API - patch('/application/:id'
exports.editApplication = catchAsync(async (req, res) => {
  const result = await partnerService.editApplication(req.params.id, req.body);
  sendSuccess(res, 200, result);
});

/**
 * POST /api/partners/submit
 * Step 7: Final submission → status = pending
 */
exports.submitApplication = catchAsync(async (req, res) => {
  const result = await partnerService.submitApplication(req.body);
  sendSuccess(res, 200, result);
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * POST /api/partners/login
 */
exports.login = catchAsync(async (req, res) => {
  const result = await partnerService.loginPartner(req.body);
  sendSuccess(res, 200, result);
});

/**
 * POST /api/partners/logout
 * Requires partnerAuth middleware (sets req.partner)
 */
exports.logout = catchAsync(async (req, res) => {
  const result = await partnerService.logoutPartner(req.partner._id);
  sendSuccess(res, 200, result);
});

// ─── Reviews ──────────────────────────────────────────────────────────────────

/**
 * POST /api/partners/:id/review
 * Requires user authentication
 */
exports.addReview = catchAsync(async (req, res) => {
  const result = await partnerService.addReview({
    partnerId: req.params.id,
    userId: req.user._id,
    ...req.body,
  });
  sendSuccess(res, 201, result);
});

/**
 * PUT /api/partners/:id/review
 */
exports.updateReview = catchAsync(async (req, res) => {
  const result = await partnerService.updateReview({
    partnerId: req.params.id,
    userId: req.user._id,
    ...req.body,
  });
  sendSuccess(res, 200, result);
});

// ─── Reports ──────────────────────────────────────────────────────────────────

/**
 * POST /api/partners/:id/report
 * Requires user authentication
 */
exports.reportPartner = catchAsync(async (req, res) => {
  const result = await partnerService.reportPartner({
    partnerId: req.params.id,
    userId: req.user._id,
    ...req.body,
  });
  sendSuccess(res, 201, result);
});

// ─── Admin ────────────────────────────────────────────────────────────────────

exports.getPartnerApplications = catchAsync(async (req, res) => {
  const result = await partnerService.getPartnerApplications(req.query);
  sendSuccess(res, 200, result);
});

exports.approveApplication = catchAsync(async (req, res) => {
  const result = await partnerService.approveApplication(req.params.id);
  sendSuccess(res, 200, result);
});

exports.rejectApplication = catchAsync(async (req, res) => {
  const result = await partnerService.rejectApplication(req.params.id, req.body.rejectionReason);
  sendSuccess(res, 200, result);
});

exports.suspendPartner = catchAsync(async (req, res) => {
  const result = await partnerService.suspendPartner(req.params.id);
  sendSuccess(res, 200, result);
});

exports.activatePartner = catchAsync(async (req, res) => {
  const result = await partnerService.activatePartner(req.params.id);
  sendSuccess(res, 200, result);
});

exports.assignBadge = catchAsync(async (req, res) => {
  const result = await partnerService.assignBadge(req.params.id, req.body.badge);
  sendSuccess(res, 200, result);
});