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