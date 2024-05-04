import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/users.routes';
const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application
app.use('/api/v1/users', userRouter);

export default app;
