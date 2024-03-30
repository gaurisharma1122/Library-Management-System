require('dotenv').config()
const zod = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require('../db');

const UserSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const UserSchema = zod.object({
            firstName: zod.string(),
            lastName: zod.string(),
            email: zod.string().email(),
            password: zod.string().min(8)
        });
        const result = UserSchema.safeParse({ firstName, lastName, email, password });
        if (result.error) {
            return res.status(411).json({
                message: `Incorrect inputs: ${result.error}`
            }); 
        }
        const newUser = await User.create({ firstName, lastName, email, password });
        return res.status(200).json({
            message: "User created successfully"
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const UserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userSchema = zod.object({
            email: zod.string().email(),
            password: zod.string().min(8)
        });
        const result = userSchema.safeParse({ email, password });
        if (result.error) {
            return res.status(411).json({
                message: `Incorrect inputs: ${result.error}`
            }); 
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(411).json({
                message: `Incorrect credentials`
            });
        }
        const jwt_token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.status(200).json({
            message: "User logged in successfully",
            token: jwt_token
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { UserSignup, UserSignin };