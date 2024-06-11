import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import router from './app/routes';
const app: Application = express();

//parsers

app.use(express.json());
app.use(cors());

//applications routes
app.use('/api', router);

//Test route
const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
  Promise.reject();
};
app.get('/', test);

export default app;
