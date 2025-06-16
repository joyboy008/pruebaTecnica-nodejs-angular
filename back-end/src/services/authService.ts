// src/services/authService.ts
import db from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DBUser } from "../types/auth";

const JWT_SECRET = "clave_secreta_super_segura";

export function registerUser(
  username: string,
  password: string,
  callback: (err: Error | null) => void
) {
  bcrypt.hash(password, 10).then((hash) => {
    db.run(
      "INSERT INTO users (username, password, is_active) VALUES (?, ?, ?)",
      [username, hash, 1],
      (err) => callback(err)
    );
  });
}

export function loginUser(
  username: string,
  password: string,
  callback: (err: Error | null, token?: string) => void
) {
  db.get(
    "SELECT * FROM users WHERE username = ? AND is_active = 1",
    [username],
    async (err, row) => {
      if (err || !row) {
        callback(new Error("Credenciales inválidas"));
        return;
      }

      const user = row as DBUser;

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        callback(new Error("Credenciales inválidas"));
        return;
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      callback(null, token);
    }
  );
}
