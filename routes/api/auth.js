const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');
const { registerSchema, logInSchema } = require('../../models/JoiSchemas');
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
} = require('../../controllers/auth');
const {
  updateUserSubscriptionSchema,
} = require('../../models/JoiSchemas/user');

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', validateBody(logInSchema), login);
authRouter.post('/logout', authenticate, logout);

authRouter.post('/current', authenticate, getCurrentUser);
authRouter.patch(
  '/',
  authenticate,
  validateBody(updateUserSubscriptionSchema),
  updateUserSubscription
);

module.exports = authRouter;
