import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRouter from './routers/bookRouter';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.use('/api', bookRouter);

mongoose.set('useNewUrlParser', true);
mongoose.set("useUnifiedTopology", true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/bookAPI');
const db = mongoose.connection;

db.on('error', console.error);
db.on('open', () => {
    app.listen(app.get('port'), () => {
        console.log(`Server is litening on port ${app.get('port')}!`);
    })
});




