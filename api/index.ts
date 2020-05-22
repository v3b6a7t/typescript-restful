/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Book from './models/bookModel';
import roters from './routers';

const app = express();

(async () => {
    // Init Express
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.set('port', process.env.PORT || 3000);
    app.use('/api/books', await roters<typeof Book>(Book));
    // Init Mongoose
    mongoose.set('useNewUrlParser', true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set('useFindAndModify', false);
    await mongoose.connect('mongodb://localhost:27017/bookAPI');
})();

const db = mongoose.connection;
db.on('error', console.error);
db.on('open', () => {
    app.listen(app.get('port'), () => {
        console.log(`Server is litening on port ${app.get('port')}!`);
    })
});




