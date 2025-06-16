import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import studentRoutes from "./routes/students";
import { setupSwagger } from "./docs/swagger";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", studentRoutes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
