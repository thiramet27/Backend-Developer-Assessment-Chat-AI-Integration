import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Routes
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Swagger setup
import { swaggerSpec, swaggerUi } from './swagger.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
