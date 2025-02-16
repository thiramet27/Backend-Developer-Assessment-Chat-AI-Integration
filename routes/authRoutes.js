import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     description: Register a new user with email and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid data
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login a user to receive a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, JWT token received
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);


export default router;
