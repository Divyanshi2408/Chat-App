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
    // Ensure you have middleware that sets req.userId correctly before this
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    // Validate required fields
    if (!firstName || !lastName ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update the user in the DB
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      {
        new: true, // return updated document
        runValidators: true,
      }
    );

    // Check if user was not found
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send updated user info
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
