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

//middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

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
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }
    // Hashear la contraseña
    const hashedPassword = await byscrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// obtener el usuario para el login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validamos que los campos no esten vacios
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    //buscar el usuario en la base de datos
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }
    const user = users[0];

    if (!user.password && user.provider === "google") {
      return res.status(401).json({
        message:
          "Esta cuenta fue creada con Google. Usa 'Continuar con Google'.",
      });
    }

    //comparar la contraseña
    const isPasswordValid = await byscrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    //login exitoso
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    res.status(500).json({ message: "Error al iniciar sesion" });
  }
});

// rutas para la autenticacion con google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user.id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      // Si es usuario nuevo, redirigir al login
      if (req.user.isNewUser) {
        return res.redirect(
          `http://localhost:5173/login?registered=true&message=${encodeURIComponent("Cuenta creada exitosamente con Google.")}`,
        );
      }

      res.redirect(`http://localhost:5173/auth-success?token=${token}`);
    } catch (error) {
      console.error("Error en callback de Google:", error);
      res.redirect("http://localhost:5173/login?error=auth_error");
    }
  },
);

// obtener categorias por usuario
app.get("/api/categories", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [categories] = await db.query(
      `SELECT id, name, icon, color, type, parent_id, created_at 
        FROM categories 
        WHERE user_id = ? 
        ORDER BY created_at DESC`,
      [userId],
    );

    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
});

//crear categorias
app.post("/api/categories", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, icon, color, type, parent_id } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "El nombre y tipo son obligatorios",
      });
    }

    // Verificar si ya existe una categoría con ese nombre para este usuario
    const [existing] = await db.query(
      "SELECT id FROM categories WHERE user_id = ? AND name = ?",
      [userId, name],
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "Ya existe una categoría con ese nombre",
      });
    }

    const [result] = await db.query(
      `INSERT INTO categories (user_id, name, icon, color, type, parent_id) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, name, icon || "📦", color || "#95A5A6", type, parent_id || null],
    );

    res.status(201).json({
      message: "Categoría creada exitosamente",
      category: {
        id: result.insertId,
        name,
        icon: icon || "📦",
        color: color || "#95A5A6",
        type,
        parent_id: parent_id || null,
      },
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ message: "Error al crear la categoría" });
  }
});

// Actualizar categoría
app.put("/api/categories/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;
    const { name, icon, color, type, parent_id } = req.body;

    // Verificar que la categoría pertenece al usuario
    const [category] = await db.query(
      "SELECT * FROM categories WHERE id = ? AND user_id = ?",
      [categoryId, userId],
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // Verificar que no exista otra categoría con el mismo nombre (excluyendo la actual)
    const [existing] = await db.query(
      "SELECT id FROM categories WHERE user_id = ? AND name = ? AND id != ?",
      [userId, name, categoryId],
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "Ya existe otra categoría con ese nombre",
      });
    }

    await db.query(
      `UPDATE categories 
       SET name = ?, icon = ?, color = ?, type = ?, parent_id = ? 
       WHERE id = ? AND user_id = ?`,
      [name, icon, color, type, parent_id || null, categoryId, userId],
    );

    res.json({ message: "Categoría actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
});

// Eliminar categoría
app.delete("/api/categories/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;

    console.log(
      "🗑️ Intentando eliminar categoría:",
      categoryId,
      "Usuario:",
      userId,
    );

    // Verificar que la categoría pertenece al usuario
    const [category] = await db.query(
      "SELECT * FROM categories WHERE id = ? AND user_id = ?",
      [categoryId, userId],
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await db.query("DELETE FROM categories WHERE id = ? AND user_id = ?", [
      categoryId,
      userId,
    ]);

    console.log("✅ Categoría eliminada exitosamente");

    res.json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
});

// Obtener transacciones por usuario
app.get("/api/transactions", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [transactions] = await db.query(
      `SELECT t.id, t.category_id, c.name as category_name, t.type, t.amount, t.description, t.payment_method, t.transaction_date, t.is_recurring, t.recurring_frequency, t.notes, t.created_at 
        FROM transactions t
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE t.user_id = ? 
        ORDER BY t.transaction_date DESC`,
      [userId],
    );
    res.json(transactions);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    res.status(500).json({ message: "Error al obtener las transacciones" });
  }
});

// crear transaccion
app.post("/api/transactions", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      category_id,
      type,
      amount,
      description,
      payment_method,
      transaction_date,
      is_recurring,
      recurring_frequency,
      notes,
    } = req.body;

    if (!category_id || !type || !amount || !transaction_date) {
      return res.status(400).json({
        message:
          "category_id, type, amount y transaction_date son obligatorios",
      });
    }
    if (amount <= 0) {
      return res.status(400).json({
        message: "El monto debe ser mayor que cero",
      });
    }

    const [result] = await db.query(
      `INSERT INTO transactions 
        (user_id, category_id, type, amount, description, payment_method, transaction_date, is_recurring, recurring_frequency, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        category_id,
        type,
        amount,
        description || null,
        payment_method || "cash",
        transaction_date,
        is_recurring || false,
        recurring_frequency || null,
        notes || null,
      ],
    );
    res.status(201).json({
      message: "Transacción creada exitosamente",
      transaction: {
        id: result.insertId,
        category_id,
        type,
        amount,
        description: description || null,
        payment_method: payment_method || "cash",
        transaction_date,
        is_recurring: is_recurring || false,
        recurring_frequency: recurring_frequency || null,
        notes: notes || null,
      },
    });
  } catch (error) {
    console.error("Error al crear la transacción:", error);
    res.status(500).json({ message: "Error al crear la transacción" });
  }
});

// actualizar transaccion
app.put("/api/transactions/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;
    const {
      category_id,
      type,
      amount,
      description,
      payment_method,
      transaction_date,
      is_recurring,
      recurring_frequency,
      notes,
    } = req.body;

    // Verificar que la transacción pertenece al usuario
    const [transaction] = await db.query(
      "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
      [transactionId, userId],
    );

    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    await db.query(
      `UPDATE transactions 
       SET category_id = ?, type = ?, amount = ?, description = ?, payment_method = ?, transaction_date = ?, is_recurring = ?, recurring_frequency = ?, notes = ?
        WHERE id = ? AND user_id = ?`,
      [
        category_id,
        type,
        amount,
        description || null,
        payment_method || "cash",
        transaction_date,
        is_recurring || false,
        recurring_frequency || null,
        notes || null,
        transactionId,
        userId,
      ],
    );
    res.json({ message: "Transacción actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la transacción:", error);
    res.status(500).json({ message: "Error al actualizar la transacción" });
  }
});

// eliminar transaccion
app.delete("/api/transactions/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;

    // Verificar que la transacción pertenece al usuario
    const [transaction] = await db.query(
      "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
      [transactionId, userId],
    );
    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    await db.query("DELETE FROM transactions WHERE id = ? AND user_id = ?", [
      transactionId,
      userId,
    ]);
    res.json({ message: "Transacción eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la transacción:", error);
    res.status(500).json({ message: "Error al eliminar la transacción" });
  }
});

// ===================== BUDGETS =====================

// Obtener presupuestos del usuario
app.get("/api/budgets", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [budgets] = await db.query(
      `SELECT b.id, b.name, b.category_id, c.name as category_name, 
              b.amount, b.period, b.start_date, b.end_date, b.alert_percentage,
              b.is_active, b.description, b.created_at 
       FROM budgets b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.user_id = ? AND b.is_active = TRUE
       ORDER BY b.start_date DESC`,
      [userId],
    );

    res.json(budgets);
  } catch (error) {
    console.error("Error al obtener presupuestos:", error);
    res.status(500).json({ message: "Error al obtener los presupuestos" });
  }
});

// Crear presupuesto
app.post("/api/budgets", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      category_id,
      amount,
      period,
      start_date,
      end_date,
      alert_percentage,
      is_active,
      description,
    } = req.body;

    if (!name || !amount || !start_date) {
      return res
        .status(400)
        .json({ message: "Nombre, monto y fecha de inicio son obligatorios" });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "El presupuesto debe ser mayor que cero" });
    }

    const [result] = await db.query(
      `INSERT INTO budgets (user_id, name, category_id, amount, period, start_date, end_date, alert_percentage, is_active, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        name,
        category_id || null,
        amount,
        period || "monthly",
        start_date,
        end_date || null,
        alert_percentage || 80,
        is_active !== undefined ? is_active : true,
        description || null,
      ],
    );

    res.status(201).json({
      message: "Presupuesto creado exitosamente",
      budget: {
        id: result.insertId,
        name,
        category_id: category_id || null,
        amount,
        period: period || "monthly",
        start_date,
        end_date: end_date || null,
        alert_percentage: alert_percentage || 80,
      },
    });
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    res.status(500).json({ message: "Error al crear el presupuesto" });
  }
});

// Actualizar presupuesto
app.put("/api/budgets/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;
    const {
      name,
      category_id,
      amount,
      period,
      start_date,
      end_date,
      alert_percentage,
      is_active,
      description,
    } = req.body;

    // Verificar que el presupuesto pertenece al usuario
    const [budget] = await db.query(
      "SELECT * FROM budgets WHERE id = ? AND user_id = ?",
      [budgetId, userId],
    );

    if (budget.length === 0) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    await db.query(
      `UPDATE budgets 
       SET name = ?, category_id = ?, amount = ?, period = ?, start_date = ?, end_date = ?, alert_percentage = ?, is_active = ?, description = ?
       WHERE id = ? AND user_id = ?`,
      [
        name,
        category_id || null,
        amount,
        period,
        start_date,
        end_date || null,
        alert_percentage,
        is_active,
        description || null,
        budgetId,
        userId,
      ],
    );

    res.json({ message: "Presupuesto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar presupuesto:", error);
    res.status(500).json({ message: "Error al actualizar el presupuesto" });
  }
});

// Eliminar presupuesto
app.delete("/api/budgets/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;

    // Verificar que el presupuesto pertenece al usuario
    const [budget] = await db.query(
      "SELECT * FROM budgets WHERE id = ? AND user_id = ?",
      [budgetId, userId],
    );

    if (budget.length === 0) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    await db.query("DELETE FROM budgets WHERE id = ? AND user_id = ?", [
      budgetId,
      userId,
    ]);

    res.json({ message: "Presupuesto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar presupuesto:", error);
    res.status(500).json({ message: "Error al eliminar el presupuesto" });
  }
});

// ruta donde correra el servidor
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
