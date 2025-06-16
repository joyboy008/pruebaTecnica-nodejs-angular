// src/routes/auth.ts
import { Router } from "express";
import { validateAuthFields } from "../middleware/validateAuth";
import { login, register } from "../controllers/authController";

const router = Router();

router.post("/register", validateAuthFields, register);
router.post("/login", validateAuthFields, login);

export default router;
