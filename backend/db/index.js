require('dotenv').config()
const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_STRING;

mongoose.connect(mongodb);

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        minLength: 8,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
