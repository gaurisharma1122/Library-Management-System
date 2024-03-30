require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = (req, res, next) => {
    try {
        const authcookie = req.cookies.authcookie;
        const result = jwt.verify(authcookie, JWT_SECRET);
        if (result.error) {
            return res.status(411).json({
                message: "You are not authorised"
            })
        } else {
            req.userId = result.userId;
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const isAdminAuth = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const admin = await User.findOne({ _id: userId });
        if (admin && admin.isAdmin==true) {
            next();
        } else {
            return res.status(411).json({
                message: "You are not an admin"
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { userAuth, isAdminAuth };
