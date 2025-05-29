import { Router } from 'express';
import multer from 'multer';
import { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
// import path from 'path';
// import fs from 'fs';

const authRoutes = Router();
const upload = multer({ dest: 'uploads/profile/' }); 



// Routes
authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.put('/update-profile', verifyToken, updateProfile);

authRoutes.post(
  '/add-profile-image',
  verifyToken,
  upload.single('profile-image'),
  addProfileImage
);

authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage);

export default authRoutes;
