import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import generate from "../controllers/ai.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post(
  "/generate",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({ issue: Joi.string().min(5).required() }),
  }),
  generate
);

export default router;
