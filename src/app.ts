import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandle';

const app: Application = express();

app.use(express.json());

app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to tutor link ');
});

app.use(globalErrorHandler);

export const App = app;
