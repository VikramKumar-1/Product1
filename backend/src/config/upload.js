const multer = require('multer');
const path = require('path');
const AppError = require('../utils/AppError');

/**
 * Multer configuration for partner file uploads.
 * Files are stored locally during development.
 * Switch storage to S3 by replacing diskStorage with multer-s3.
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/partners/'); // ensure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Only JPEG, PNG, and WEBP images are allowed', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
});

/**
 * Fields accepted during different onboarding steps.
 */
const partnerOnboardingUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'aadharFrontImage', maxCount: 1 },
  { name: 'aadharBackImage', maxCount: 1 },
  { name: 'drivingLicenseImage', maxCount: 1 },
  { name: 'rcBookImage', maxCount: 1 },
  { name: 'insuranceImage', maxCount: 1 },
]);

module.exports = { upload, partnerOnboardingUpload };