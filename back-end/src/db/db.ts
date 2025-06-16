import sqlite3 from "sqlite3";
import path from "path";

const db = new sqlite3.Database(
  path.resolve(__dirname, "database.db"),
  (err) => {
    if (err) {
      console.error("Error conectando a SQLite", err.message);
    } else {
      console.log("SQLite conectado ✅");
    }
  }
);

db.serialize(() => {
  // Crear tabla de grados
  db.run(`
    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  // Tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT NOT NULL,
      is_active INTEGER DEFAULT 1
    )
  `);

  // Tabla de estudiantes
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      father_name TEXT NOT NULL,
      mother_name TEXT NOT NULL,
      grade_id INTEGER NOT NULL,
      section TEXT NOT NULL,
      admission_date TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (grade_id) REFERENCES grades(id)
    )
  `);

  // Insertar grados si no existen
  db.all("SELECT COUNT(*) AS count FROM grades", (err, rows) => {
    if (err) {
      console.error("Error consultando la tabla grades", err.message);
      return;
    }

    const result = rows as { count: number }[];
    if (result[0].count === 0) {
      db.run(`INSERT INTO grades (name) VALUES ('1ro'), ('2do'), ('3ro')`);
    }
  });
});

export default db;
