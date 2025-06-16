import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { insertStudent } from "../services/studentService";

export const createStudent = (req: Request, res: Response) => {
  const {
    student_name,
    birth_date,
    father_name,
    mother_name,
    grade_id,
    section,
    admission_date,
  } = req.body;

  if (
    !student_name ||
    !birth_date ||
    !father_name ||
    !mother_name ||
    !grade_id ||
    !section ||
    !admission_date
  ) {
    res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  const newStudent = {
    id: uuidv4(),
    student_name,
    birth_date,
    father_name,
    mother_name,
    grade_id,
    section,
    admission_date,
  };

  insertStudent(newStudent, (err) => {
    if (err) {
      console.error("Error insertando estudiante:", err.message);
      res.status(500).json({ message: "Error al guardar el alumno." });
    }
    res.status(201).json({ message: "Alumno creado correctamente ✅" });
  });
};
