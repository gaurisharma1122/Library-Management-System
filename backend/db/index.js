require('dotenv').config();
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

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        maxLength: 100
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    authors: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    imageSrc: {
        type: String,
        require: true
    },
    isPublished: {
        type: Boolean,
        require: true,
        default: false
    }

});

const AuthorSchema = new mongoose.Schema({
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
    books: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
        require: true
    }
});

const IssuedBooksSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    issuedDate: {
        type: Date,
        require: true,
        default: getCurrentDate()
    },
    returnDate: {
        type: Date,
        require: true,
    },
    returnPending: {
        type: Boolean,
        require: true,
        default: true,
    }
});

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: January is 0
    const day = currentDate.getDate();
    return (`${year}-${month}-${day}`);
}

const User = mongoose.model('User', UserSchema);
const Book = mongoose.model('Book', BookSchema);
const Author = mongoose.model('Author', AuthorSchema);
const IssuedBooks = mongoose.model('IssuedBooks', IssuedBooksSchema);

module.exports = { User, Book, Author, IssuedBooks };
