import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/db.js";
import byscrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import "./config/passport.js";

dotenv.config(); // esto carga las variables de entorno desde el archivo .env

const app = express(); // crea una instancia de la aplicación Express

app.use(cors()); // habilita CORS para permitir solicitudes desde otros dominios
app.use(express.json()); // middleware para parsear JSON en las solicitudes entrantes
app.use(passport.initialize()); // inicializa passport

//ruta para registar usuarios
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validar que todos los campos estén llenos
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }
    // Hashear la contraseña
    const hashedPassword = await byscrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Inicia Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(`http://localhost:5173/auth-success?token=${token}`);
  }
);

// ruta donde correra el servidor
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
