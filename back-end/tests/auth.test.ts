import request from "supertest";
import app from "../src/index"; // asegúrate de exportar tu app sin listen()

describe("POST /auth/register", () => {
  it("debería registrar un nuevo usuario y responder con status 201", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: "testuser_" + Date.now(), // para evitar duplicados
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Usuario creado exitosamente");
  });

  it("debería fallar si el usuario ya existe", async () => {
    const username = "usuario_existente_" + Date.now();

    // Primero creamos el usuario
    await request(app).post("/auth/register").send({
      username,
      password: "password123",
    });

    // Intentamos registrarlo otra vez
    const res = await request(app).post("/auth/register").send({
      username,
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /auth/login", () => {
  const username = "loginuser_" + Date.now();
  const password = "mypassword";

  beforeAll(async () => {
    // Registrar el usuario antes de probar login
    await request(app).post("/auth/register").send({ username, password });
  });

  it("debería hacer login exitosamente y devolver un token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  it("debería fallar si la contraseña es incorrecta", async () => {
    const res = await request(app).post("/auth/login").send({
      username,
      password: "incorrecta",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Usuario o password invalido!");
  });
});
