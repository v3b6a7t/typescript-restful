import Book from '../api/models/bookModel';
import Author from '../api/models/authorModel';

Book
    .find({})
    .exec()
    .then(books => {
        books.map(book => {
            Author
                .find({ _id: { $in: book.author } })
                .exec()
                .then(authors => {
                    authors.map(author => {
                        // Author.update({ _id: author._id }, { $addToSet: { "book.$": book._id } })
                        delete author.book;
                        author.book = Array(book._id)
                        author.save()
                            .then(() => {
                                console.log(`"${book.title} (${book._id})" --> ${author.name} ${author.lastname} (${author._id})`)
                            })
                            .catch(console.error)
                    })
                })
        })
    })
    .catch(console.error)
