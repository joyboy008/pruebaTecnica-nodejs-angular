// src/routes/auth.ts
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const JWT_SECRET = "clave_secreta_super_segura";

interface AuthBody {
  username: string;
  password: string;
}

interface DBUser {
  id: number;
  username: string;
  password: string;
}

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/register",
  async (req: Request<{}, {}, AuthBody>, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, 10);
      const id = uuidv4();
      db.run(
        "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
        [id, username, hash],
        function (err) {
          if (err) {
            res
              .status(400)
              .json({ error: "Usuario ya existe o error al registrar" });
            return;
          }

          res.status(201).json({ message: "Usuario creado exitosamente" });
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *       400 401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", (req: Request<{}, {}, AuthBody>, res: Response): void => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, row) => {
      if (err || !row) {
        res.status(400).json({ error: "Usuario o password invalido!" });
        return;
      }

      const user = row as DBUser;
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Usuario o password invalido!" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    }
  );
});

export default router;
