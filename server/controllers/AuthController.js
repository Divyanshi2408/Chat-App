import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const raxAge = 3 * 24 * 60 * 60 * 1000; // 1 day

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_SECRET, {
        expiresIn: raxAge,
    });
}

export const signup = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }
        const user = await User.create({email, password});
        response.cookie('jwt', createToken(email, userId), {
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
                // firstName: user.firstName,
                // lastName: user.lastName,
                // image: user.image,
                profileSetup: user.profileSetup,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};