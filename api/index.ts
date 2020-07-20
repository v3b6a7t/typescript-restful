/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as config from './config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Book from './models/bookModel';
import genericRoter from './router/generic';

const app = express();

(async () => {
    // Init Express
    app.set('port', config.PORT);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api/books', await genericRoter<typeof Book>(Book));
    // Init Mongoose
    mongoose.set('useNewUrlParser', true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(config.MONGODB_URI);
})();

const db = mongoose.connection;
db.on('error', console.error);
db.on('open', () => {
    app.listen(config.PORT, () => {
        console.log(`Server is litening on ${config.SERVER_URL}`);
    })
});




