import Book from '../api/models/bookModel';
import Author from '../api/models/authorModel';



Author.findById('5f1d6bc474660e0ce948d013')
    .exec()
    .then(user => {
        if (user) {
            console.log(user);
            Book.updateMany({}, { $set: { authors: [user._id] } })
        }
    })
    .catch(console.error)

