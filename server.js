import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

import { swaggerSpec, swaggerUi } from './swagger.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({
  origin: '*',
}));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
