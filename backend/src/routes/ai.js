import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import auth from "../middlewares/auth.js";
import generate from "../controllers/ai.js"; // assumes default export

const router = Router();

router.post(
  "/generate",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({
      issue: Joi.string().min(5).required(),
    }),
  }),
  generate
);

export default router;
