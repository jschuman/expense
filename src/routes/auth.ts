import express, { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
const router: Router = express.Router();

// Google OAuth Routes
router.get('/google', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', 
  { 
    scope: ['profile', 'email'],
    state: encodeURIComponent(req.query.redirect as string || '/')
  })(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response) => {
    // Successful authentication, redirect or perform any other action
    const redirectUrl: string = decodeURIComponent(req.query.state as string || '/');
    res.redirect(redirectUrl);
  }
);

module.exports = router;