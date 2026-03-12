/**
 * Eliminates try/catch boilerplate in route handlers.
 * Any rejected promise is forwarded straight to next(err),
 * which the global error handler will catch.
 *
 * Usage:
 *   router.post('/register', catchAsync(authController.register));
 */
const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = catchAsync;