const { Book, Author, User, IssuedBooks } = require("../db");

const AddBooks = async (req, res) => {
    try {
        const { title, description, authorsData, price, quantity, imageSrc } = req.body;
        const newBook = await Book.create({ title, description, authors: [], price, quantity, imageSrc });

        //using for of loop because it supports async operations
        for(const author of authorsData) {
            if (author.id) {
                const existingAuthor = await Author.findOneAndUpdate({ _id: author.id }, { $push: { books: newBook._id } }, { new: true });
                newBook.authors.push(existingAuthor._id);
            } else {
                const { firstName, lastName } = author;
                const newAuthor = await Author.create({ firstName, lastName, books: [newBook._id] });
                newBook.authors.push(newAuthor.id);
            }
        };

        await newBook.save();
        return res.status(200).json({
            message: "Book created successfully"
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const UpdateBooks = async (req, res) => {
    try {
        const { _id, ...updateBody } = req.body;
        const expectedUpdateFields = ['title', 'description', 'price', 'quantity', 'imageSrc'];
        for (const property of Object.keys(updateBody)) {
            if (!expectedUpdateFields.includes(property)) {
                delete updateBody[property];
            }
        }
        const book = await Book.findOneAndUpdate({ _id }, updateBody);
        return res.status(200).json({
            message: "Book updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const DeleteBooks = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedBook = await Book.deleteOne({ _id });
        return res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const PublishBooks = async (req, res) => {
    try {
        const { _id, publish } = req.body;
        if (typeof (publish) == 'boolean') {
            const book = await Book.updateOne({ _id }, { isPublished: publish });
            return res.status(200).json({
                message: `Book ${publish === true ? 'Published' : 'Unpublished'} successfully`
            });
        } else {
            return res.status(403).json({
                message: "Wrong value"
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const SearchBooks = async (req, res) => {
    
}

const GetAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (books) {
            return res.status(200).json({
                books: books
            });
        } else {
            return res.status(411).json({
                message: "no Data"
            });
        }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const requestForBookIssue = async (req, res) => {
    try {
        const { book_id, user_id, noOfDays } = req.body;
        const book = await Book.findById(book_id);
        const user = await User.findById(user_id);
        if (book && book.quantity > 0 && user) {
            const issuedBook = await IssuedBooks.create({ book_id, user_id, noOfDays });
            return res.status(200).json({
                message:"Requested for book issue successfully"
            })
        } else {
            return res.status(411).json({
                message: "Book or User doesn't exist"
            });
        }
            
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const approveRejectBookIssueRequest = async (req, res) => {
    try {
        const { _id, approve } = req.body;
        const updateBody = approve === true ? { issuedDate: new Date(), returnPending: 'Pending', approveStatus: true } : { issuedDate: null, returnPending: '/NA', approveStatus: false };
        const issuedBook = await IssuedBooks.findOneAndUpdate({ _id }, updateBody);
        if (approve === true) {
            const book = await Book.findOneAndUpdate({ _id: issuedBook.book_id }, { $inc: { quantity: -1 } });
        }
        return res.status(200).json({
            message: `${approve === true ? 'Book issued successfully' : 'Issue request rejected'}`

        });

    }   catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}





module.exports = { AddBooks, GetAllBooks, UpdateBooks, DeleteBooks, PublishBooks, SearchBooks, requestForBookIssue, approveRejectBookIssueRequest };