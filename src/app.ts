import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/users.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

export default app;
