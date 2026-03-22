const express = require('express');
const router = express.Router();

const controller = require('./partner.controller');
const { partnerOnboardingUpload } = require('../../config/upload');
const { partnerAuth } = require('../../middleware/partnerAuth.middleware');
const { adminOnly } = require('../../middleware/partnerAuth.middleware');
const optionalAuth = require('../../middleware/optionalAuth');
// Re-use existing user authentication middleware (adjust path as needed)
const authenticate = require('../../middleware/authenticate');

// ─── Partner Onboarding (user must be logged in) ──────────────────────────────

//router.post('/register', authenticate, partnerOnboardingUpload, controller.register);
//router.post('/verify-otp', authenticate, controller.verifyOtp);
/*router.post('/kyc', authenticate, partnerOnboardingUpload, controller.submitKyc);
router.post('/address', authenticate, controller.submitAddress);
router.post('/payment', authenticate, controller.submitPayment);
router.post('/additional-details', authenticate, partnerOnboardingUpload, controller.submitAdditionalDetails);
router.post('/submit', authenticate, controller.submitApplication);*/
// Onboarding — works for both guest and logged in user
const onboardingRouter = express.Router();
onboardingRouter.post('/register', optionalAuth, partnerOnboardingUpload, controller.register);
onboardingRouter.post('/kyc',                    partnerOnboardingUpload, controller.submitKyc);
onboardingRouter.post('/address',                                         controller.submitAddress);
onboardingRouter.post('/payment',                                         controller.submitPayment);
onboardingRouter.post('/additional-details',     partnerOnboardingUpload, controller.submitAdditionalDetails);
onboardingRouter.get('/application/:id',   controller.getApplication);
onboardingRouter.patch('/application/:id', controller.editApplication);
onboardingRouter.post('/submit',                                          controller.submitApplication);

// ─── Partner Dashboard Auth ───────────────────────────────────────────────────

router.post('/login', controller.login);
router.post('/logout', partnerAuth, controller.logout);

// ─── Reviews (requires user auth) ────────────────────────────────────────────

router.post('/:id/review', authenticate, controller.addReview);
router.put('/:id/review', authenticate, controller.updateReview);

// ─── Reports (requires user auth) ────────────────────────────────────────────

router.post('/:id/report', authenticate, controller.reportPartner);

// ─── Mount onboarding group ───────────────────────────────────────────────────
router.use('/', onboardingRouter); 

module.exports = router;