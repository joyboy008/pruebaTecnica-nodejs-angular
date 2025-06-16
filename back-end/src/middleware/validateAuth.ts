// src/middleware/validateAuth.ts
import { Request, Response, NextFunction } from "express";
import { AuthBody } from "../types/auth";

export function validateAuthFields(
  req: Request<{}, {}, AuthBody>,
  res: Response,
  next: NextFunction
): void {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username y password son requeridos" });
    return;
  }

  next();
}
