# 📚 Frontend de Gestión de Estudiantes

Este es el frontend de una aplicación de gestión de estudiantes desarrollada con **Angular**, **Ionic** y **Bootstrap**. El sistema permite registrar usuarios, iniciar sesión, crear estudiantes y consultarlos por grado. La autenticación se maneja mediante **JWT**.

---

## 🚀 Tecnologías utilizadas

- [Angular 17](https://angular.io/)
- [Ionic Framework](https://ionicframework.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [JWT (Token de autenticación)](https://jwt.io/)

---

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/nombre-proyecto.git
   cd nombre-proyecto
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ionic serve
   ```

> Asegúrate de que tu backend esté corriendo en `http://localhost:4000`.

---

## 🧩 Funcionalidades

### ✅ Autenticación

- Registro de usuario
- Inicio de sesión
- Almacenamiento y validación del token JWT

### 🎓 Gestión de estudiantes

- Crear nuevo estudiante
- Consultar estudiantes por grado
- Cierre de sesión

---

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   └── create-student/
│   ├── pages/
│   │   └── login/
│   │   └── register/
│   │   └── students/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── student.service.ts
│   └── app-routing.module.ts
│   └── app.component.ts
│   └── app.module.ts
```

---

## 🔐 Seguridad

- Autenticación protegida por JWT.
- Navegación segura basada en estado de sesión.

---

## 🛠️ TODO / Mejoras futuras

- Validaciones de formulario más robustas
- Soporte para edición/eliminación de estudiantes
- Gestión de usuarios con roles
- Interfaz adaptativa con mejor diseño visual

---

## 📄 Licencia

Este proyecto no tiene licencia.

---

## ✍️ Autor

**Marlon Ralda**  
Desarrollador Fullstack | Seguridad Informática
