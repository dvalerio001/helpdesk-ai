import { Router } from "express";
import auth from "../middlewares/auth.js";
import { me } from "../controllers/users.js";

const router = Router();

router.get("/me", auth, me);

export default router;
