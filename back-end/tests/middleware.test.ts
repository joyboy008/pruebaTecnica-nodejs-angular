import { NextFunction } from "express";
import verifyToken from "../src/middleware/auth"; // ajusta según tu ruta
import jwt from "jsonwebtoken";

describe("Middleware: verifyToken", () => {
  const JWT_SECRET = "clave_secreta_super_segura";

  const mockRequest = (header?: string) => ({
    headers: { authorization: header },
  });

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn() as NextFunction;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe responder con 401 si no se proporciona token", () => {
    const req = mockRequest(); // sin header
    const res = mockResponse();

    verifyToken(req as any, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token no proporcionado" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("debe responder con 403 si el token es inválido", () => {
    const req = mockRequest("Bearer token_invalido");
    const res = mockResponse();

    verifyToken(req as any, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token inválido o expirado",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("debe llamar next() y añadir req.user si el token es válido", (done) => {
    const payload = { id: 1, username: "user" };
    const token = jwt.sign(payload, JWT_SECRET);
    const req = mockRequest(`Bearer ${token}`) as any;
    const res = mockResponse();

    verifyToken(req, res, () => {
      try {
        expect(req.user?.id).toBe(1);
        expect(req.user?.username).toBe("user");
        expect(mockNext).not.toHaveBeenCalled(); // el next real fue llamado
        done(); // ✅ todo bien
      } catch (err) {
        done(err); // ❌ algo falló
      }
    });
  });
});
