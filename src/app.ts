import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application
app.use('/api/v1/', routes);

// test

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };

// testId();

app.use(globalErrorHandler);

export default app;
