import db from "../db/db";

interface Student {
  id: string;
  student_name: string;
  birth_date: string;
  father_name: string;
  mother_name: string;
  grade_id: string;
  section: string;
  admission_date: string;
}

export const insertStudent = (
  student: Student,
  callback: (err: Error | null) => void
) => {
  const sql = `
    INSERT INTO students (
      id,
      student_name,
      birth_date,
      father_name,
      mother_name,
      grade_id,
      section,
      admission_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    student.id,
    student.student_name,
    student.birth_date,
    student.father_name,
    student.mother_name,
    student.grade_id,
    student.section,
    student.admission_date,
  ];

  db.run(sql, values, function (err) {
    callback(err);
  });
};

export const getStudentsByGrade = (
  grade_id: string,
  callback: (err: Error | null, rows?: any[]) => void
) => {
  const sql = `SELECT * FROM students WHERE grade_id = ? AND is_active = 1`;

  db.all(sql, [grade_id], (err, rows) => {
    callback(err, rows);
  });
};
