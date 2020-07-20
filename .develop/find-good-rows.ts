import Book from '../api/models/bookModel'

(async () => {
    await Book
        .find({ author: { $exists: true, $not: { $size: 0 } } })
        .exec()
        .then(doc => console.log(doc[0].author))
        .catch(console.error)
})()
