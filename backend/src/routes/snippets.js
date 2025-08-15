import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { listSnippets, createSnippet, deleteSnippet } from "../controllers/snippets.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, listSnippets);

router.post(
  "/",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().max(120).required(),
      body: Joi.string().max(5000).required(),
      tags: Joi.array().items(Joi.string().trim()).max(20).default([]),
    }),
  }),
  createSnippet
);

router.delete(
  "/:id",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteSnippet
);

export default router;