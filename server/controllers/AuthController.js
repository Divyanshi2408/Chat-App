import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

const raxAge = 3 * 24 * 60 * 60 * 1000; // 1 day

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_SECRET, {
        expiresIn: raxAge,
    });
}

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.create({ email, password });

        res.cookie('jwt', createToken(email, user._id), {
            httpOnly: true,
            maxAge: raxAge,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const auth = await compare(password,user.password);
        if (!auth) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.cookie('jwt', createToken(email, user._id), {
            httpOnly: true,
            maxAge: raxAge,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.userId);
        if(!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
   
        return res.status(201).json({
            message: 'User logged in successfully',
            user: {
                id: userData._id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: userData._id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        color: userData.color,
      },
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

import path from 'path';
import fs, { unlink } from 'fs';

export const addProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const date = Date.now();
        const uploadDir = 'upload/profile/';
        const fileExt = path.extname(req.file.originalname);
        const fileName = `${uploadDir}${date}-${req.file.originalname}`;
        
        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { image: fileName },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            image: updatedUser.image,
        });

    } catch (error) {
        console.error('Add profile image error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const removeProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (user.image) {
            unlinkSync(user.image);
        }

        user.image = null;
        await user.save();
        return res.status(200).json({
            message: 'Profile image removed successfully',
        
        });

    } catch (error) {
        console.error('Remove profile image error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

