
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import referralRouter from './routes/referral.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/referral', referralRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Referral API is running' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});