const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth Routes
router.get('/google', (req, res, next) => {
  passport.authenticate('google', 
  { 
    scope: ['profile', 'email'],
    state: encodeURIComponent(req.query.redirect || '/')
  })(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect or perform any other action
    const redirectUrl = decodeURIComponent(req.query.state || '/');
    res.redirect(redirectUrl);
  }
);

module.exports = router;