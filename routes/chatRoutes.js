import express from 'express';
import { sendMessage, getChatHistory, listConversations } from '../controllers/chatController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @swagger
 * /api/chat:
 *   post:
 *     description: Send a message to OpenAI and receive a response
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []  # This is where the token is included in the Swagger documentation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI response received successfully
 *       400:
 *         description: No message provided
 *       403:
 *         description: Rate limit exceeded
 */
router.post('/', authMiddleware, rateLimiter, sendMessage);

/**
 * @swagger
 * /api/chat/{conversationId}:
 *   get:
 *     description: Retrieve chat history of a specific conversation
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []  # This is where the token is included in the Swagger documentation
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         description: The ID of the conversation to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved conversation history
 *       404:
 *         description: Conversation not found
 */
router.get('/:conversationId', authMiddleware, getChatHistory);

/**
 * @swagger
 * /api/chat:
 *   get:
 *     description: List all the user's conversations
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []  # This is where the token is included in the Swagger documentation
 *     responses:
 *       200:
 *         description: List of conversations
 *       403:
 *         description: Unauthorized or rate limit exceeded
 */
router.get('/', authMiddleware, listConversations);

export default router;
