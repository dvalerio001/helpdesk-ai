import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { signup, signin, getMe } from "../controllers/auth.js";
import auth from "../middlewares/auth.js";

const router = Router();

// Public
router.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).max(40).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  signup
);

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  signin
);

// Protected
router.get("/users/me", auth, getMe);

export default router;