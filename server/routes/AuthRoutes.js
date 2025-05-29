import { Router } from 'express';
import multer from 'multer';
import { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import path from 'path';
import fs from 'fs';

const authRoutes = Router();

// Create upload directory if not exists
const uploadDir = 'upload/profile';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// Routes
authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.put('/update-profile', verifyToken, updateProfile);

authRoutes.post(
  '/add-profile-image',
  verifyToken,
  upload.single('profile-image'), // Now this works
  addProfileImage
);

authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage);

export default authRoutes;
