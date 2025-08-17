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
      title: Joi.string().min(1).max(200).required(),
      content: Joi.string().min(1).required(),
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
