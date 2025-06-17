# 📚 Prueba Técnica Node.js + TypeScript

Este proyecto es una API REST construida con **Express**, **SQLite** y **TypeScript**, siguiendo buenas prácticas de arquitectura (controladores, servicios, middlewares). Incluye autenticación con JWT, encriptación de contraseñas con bcrypt y documentación con Swagger.

---

## 🚀 Rutas disponibles

### 🔐 Autenticación

- **POST** `/auth/register`  
  Crea un nuevo usuario.  
  Requiere:

  ```json
  {
    "username": "usuario",
    "password": "clave"
  }
  ```

- **POST** `/auth/login`  
  Autentica al usuario y retorna un token JWT.  
  Requiere los mismos campos que el registro.

---

### 🎓 Estudiantes

- **GET** `/consultar-alumno/{grade_id}`  
  Lista los estudiantes asignados a un grado (por ID numérico).

- **POST** `/crear-alumno`  
  Crea un nuevo estudiante.  
  Requiere autenticación con JWT.  
  Payload:
  ```json
  {
    "student_name": "Nombre del estudiante",
    "birth_date": "YYYY-MM-DD",
    "father_name": "Nombre del padre",
    "mother_name": "Nombre de la madre",
    "grade_id": 1,
    "section": "A",
    "admission_date": "YYYY-MM-DD"
  }
  ```

---

## 🛠️ Instalación

```bash
git clone https://github.com/joyboy008/pruebaTecnica-nodejs-angular.git
cd pruebaTecnica-nodejs-angular.git/back-end
npm install
npm run dev
```

La API estará corriendo en:  
👉 `http://localhost:4000`

---

## 📄 Documentación Swagger

Disponible en:  
🔗 `http://localhost:4000/api-docs`

---

## 🔒 Seguridad

- Contraseñas encriptadas con **bcrypt**.
- Protección de rutas mediante **JWT**.
- Validación de datos con middlewares.

---

## 🧪 Pruebas

Las pruebas unitarias y de integración serán implementadas en una siguiente fase del desarrollo.

---

## 📂 Estructura del proyecto

```
back-end/
├── controllers/
├── middleware/
├── routes/
├── services/
├── types/
├── docs/          # Swagger
├── db/
├── index.ts
```

**Marlon Ralda**  
Desarrollador Fullstack | Seguridad Informática
