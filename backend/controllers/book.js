const { Book, Author } = require("../db");

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
        return res.status(200).json({
            books: books
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

const IssueBooks = (req, res) => {
    
}



module.exports = { AddBooks, GetAllBooks, UpdateBooks, DeleteBooks,PublishBooks,SearchBooks, IssueBooks };