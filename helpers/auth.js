
function ensureAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(`/auth/google?redirect=${encodeURIComponent(req.originalUrl)}`);
}

module.exports = {
  ensureAuthenticated
};