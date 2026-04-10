import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { AppError } from "../middleware/errorHandler.js";

const router = Router();

/**
 * POST /api/admin/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      throw new AppError(401, "Invalid credentials");
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  }
});

/**
 * GET /api/admin/auth/me — Verify current admin session
 */
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new AppError(401, "No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true },
    });

    if (!admin) throw new AppError(401, "Invalid token");

    res.json({ admin });
  } catch (error) {
    res.status(401).json({ error: "Invalid session" });
  }
});

export default router;
