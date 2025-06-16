// src/controllers/authController.ts
import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { AuthBody } from "../types/auth";

export function register(req: Request<{}, {}, AuthBody>, res: Response): void {
  const { username, password } = req.body;

  registerUser(username, password, (err) => {
    if (err) {
      res.status(400).json({ error: "Usuario ya existe o error al registrar" });
    } else {
      res.status(201).json({ message: "Usuario creado exitosamente" });
    }
  });
}

export function login(req: Request<{}, {}, AuthBody>, res: Response): void {
  const { username, password } = req.body;

  loginUser(username, password, (err, token) => {
    if (err || !token) {
      res.status(401).json({ error: "Usuario o password invalido!" });
    } else {
      res.json({ token });
    }
  });
}
