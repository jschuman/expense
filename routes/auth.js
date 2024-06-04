const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth Routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect to a success page or perform any other action
    // res.redirect('/');
  }
);

module.exports = router;