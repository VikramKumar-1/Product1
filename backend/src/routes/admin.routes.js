const express = require('express');
const router = express.Router();

const controller = require('../modules/partner/partner.controller');
const authenticate = require('../middleware/authenticate');
const { adminOnly } = require('../middleware/partnerAuth.middleware');

// All admin routes require user authentication + admin role
router.use(authenticate, adminOnly);

/**
 * GET /admin/partner-applications
 * Query: ?status=pending&page=1&limit=20
 */
router.get('/partner-applications', controller.getPartnerApplications);

/**
 * PATCH /admin/partner/:id/approve
 * Moves application → partners collection
 */
router.patch('/partner/:id/approve', controller.approveApplication);

/**
 * PATCH /admin/partner/:id/reject
 * Body: { rejectionReason }
 */
router.patch('/partner/:id/reject', controller.rejectApplication);

/**
 * PATCH /admin/partner/:id/suspend
 */
router.patch('/partner/:id/suspend', controller.suspendPartner);

/**
 * PATCH /admin/partner/:id/activate
 */
router.patch('/partner/:id/activate', controller.activatePartner);

/**
 * PATCH /admin/partner/:id/badge
 * Body: { badge: 'verified' | 'ensured' | 'none' }
 */
router.patch('/partner/:id/badge', controller.assignBadge);

module.exports = router;