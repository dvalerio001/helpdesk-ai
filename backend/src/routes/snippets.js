import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import auth from "../middlewares/auth.js";
import * as c from "../controllers/snippets.js";

const router = Router();

router.get("/", auth, c.listMine);

router.post(
  "/",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({
      // Align limits with your Mongoose model to avoid model-level rejections
      title: Joi.string().min(1).max(120).required(),
      content: Joi.string().min(1).max(5000).required(),
      // <-- allow optional tags (array of short strings)
      tags: Joi.array().items(Joi.string().trim().max(32)).max(10).optional(),
    }),
  }),
  c.create
);

router.delete(
  "/:id",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  c.remove
);

export default router;
