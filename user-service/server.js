import express from 'express';
import userRoutes from './userRoutes.js';
import { gracefulShutdown } from './userController.js';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(userRoutes);
app.listen(PORT, () => console.log(`User service is running on port ${PORT}`));


// shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown();
});
