import express, { Request, Response } from 'express';

const app = express();

app.set('port', process.env.PORT || 3000)

app.get('/', (req: Request, res: Response) => {
    res.send("OK!");
});

app.listen(app.get('port'), () => {
    console.log(`Server is slitening on port ${app.get('port')}!`);
})