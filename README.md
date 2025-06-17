# Sistema de Gestión de Estudiantes

Este proyecto es una aplicación completa para registrar y consultar estudiantes por grado académico. Está dividido en dos partes: un backend con Node.js y TypeScript, y un frontend con Angular + Ionic. Ambos módulos están desacoplados pero funcionan en conjunto mediante una API con autenticación JWT.

## 📁 Estructura del Proyecto

```
/raiz-del-proyecto/
│
├── backend/
│   └── README.md          # Instrucciones específicas del backend
│   └── src/
│       └── controllers/
│       └── routes/
│       └── middlewares/
│       └── database/
│       └── app.ts
│
├── frontend/
│   └── README.md          # Instrucciones específicas del frontend
│   └── src/
│       └── app/
│       └── assets/
│       └── environments/
│
└── README.md              # Este archivo
```

## 🚀 Tecnologías Utilizadas

- **Backend:**

  - Node.js + Express
  - TypeScript
  - JWT (Autenticación)
  - Bcrypt (Hash de contraseñas)
  - SQLite (Base de datos ligera)

- **Frontend:**
  - Angular 17
  - Ionic Framework
  - Bootstrap (solo algunos estilos)
  - Angular Router
  - Servicios HTTP y LocalStorage para manejo de sesión

## ✅ Funcionalidades

### Backend:

- Registro e inicio de sesión de usuarios
- Middleware para autenticación con JWT
- Crear estudiante
- Consultar estudiantes por `grade_id`

### Frontend:

- Registro e inicio de sesión
- Manejo de sesión y rutas protegidas
- Formulario para crear estudiantes
- Consultar estudiantes por grado (select con 6 opciones)
- Visualización de mensajes de éxito y error

## 🛠️ Instalación y Ejecución

### Backend

```bash
cd backend
npm install
npm run dev
```

- Puerto por defecto: `http://localhost:4000`
- Endpoints principales:
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /crear-alumno` (protegido con JWT)
  - `GET /consultar-alumno/:grade_id` (protegido con JWT)

### Frontend

```bash
cd frontend
npm install
ionic serve
```

- Acceso vía navegador: `http://localhost:5173` (o puerto asignado por Vite)

## 🔐 Autenticación

- Al iniciar sesión, se guarda el JWT en `localStorage`.
- Las rutas protegidas se muestran solo si hay token presente.
- Se añade el token en el encabezado `Authorization: Bearer <token>` para las peticiones protegidas.

## ✍️ Autor

**Marlon Ralda**  
Desarrollador Fullstack | Seguridad Informática
Prueba técnica
