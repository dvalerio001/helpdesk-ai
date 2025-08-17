import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { signup, signin } from "../controllers/auth.js";

const router = Router();

router.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).max(50).optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  signup
);

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  signin
);

export default router;
