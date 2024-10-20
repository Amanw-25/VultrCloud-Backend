// routes/carbonFootprintChatRoutes.js
import { Router } from 'express';
import { chatWithMistralAI } from '../controllers/carbonFootprintChatController.js';
import getnewToken from '../middlewares/getnewToken.js';
import passport from 'passport';

const router = Router();

// Protected route to chat with Mistral AI about carbon footprint
router.post(
  '/chat',
  getnewToken, // Middleware to refresh tokens
  passport.authenticate('jwt', { session: false }), // JWT authentication
  chatWithMistralAI // Controller to handle the chat logic
);

export default router;
