import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.Origin,
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true,
}));


// Serve static files
// app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));


app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
