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

module.exports = { AddBooks };