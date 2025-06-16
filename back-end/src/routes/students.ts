import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/verifyToken";

import { getStudentsByGrade } from "../services/studentService";
import { createStudent } from "../controllers/studentController";

const router = Router();

/**
 * @swagger
 * /crear-alumno:
 *   post:
 *     summary: Crear un nuevo alumno
 *     security:
 *       - bearerAuth: []
 *     tags: [Alumnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_name
 *               - birth_date
 *               - father_name
 *               - mother_name
 *               - grade
 *               - section
 *               - admission_date
 *             properties:
 *               student_name:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               father_name:
 *                 type: string
 *               mother_name:
 *                 type: string
 *               grade_id:
 *                 type: string
 *               section:
 *                 type: string
 *               admission_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Alumno creado correctamente
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/crear-alumno", verifyToken, createStudent);

/**
 * @swagger
 * /consultar-alumno/{grado}:
 *   get:
 *     summary: Obtener alumnos por grado
 *     security:
 *       - bearerAuth: []
 *     tags: [Alumnos]
 *     parameters:
 *       - name: grado
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Grado académico (ej. 1ro, 2do, etc.)
 *     responses:
 *       200:
 *         description: Lista de alumnos
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/consultar-alumno/:id_grado",
  verifyToken,
  (req: Request, res: Response) => {
    const { id_grado } = req.params;

    getStudentsByGrade(id_grado, (err, rows) => {
      if (err) {
        console.error("Error al obtener alumnos por grado:", err.message);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
      return res.json(rows);
    });
  }
);

export default router;
