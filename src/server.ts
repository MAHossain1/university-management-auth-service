import mongoose from 'mongoose';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import config from './config';

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('👌 Database is connected successfully.');

    app.listen(config.port, () => {
      logger.info(
        `🚀 University Management app listening on port ${config.port}`
      );
    });
  } catch (error) {
    errorLogger.error('🧐 Failed to connect with database', error);
  }
}

boostrap();
