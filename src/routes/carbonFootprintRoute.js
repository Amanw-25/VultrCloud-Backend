import { Router } from 'express';
import { calculateCarbonFootprint } from '../controllers/carbonFootprintController.js';
import getnewToken from '../middlewares/getnewToken.js';
import passport from 'passport';

const router = Router();

// Protected route to calculate carbon footprint
router.post(
  '/calculate',
  getnewToken, // Middleware to refresh tokens
  passport.authenticate('jwt', { session: false }), // JWT authentication
  calculateCarbonFootprint
);

export default router;