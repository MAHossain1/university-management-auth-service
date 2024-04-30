import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🚀 Database is connected successfully.');

    app.listen(config.port, () => {
      console.log(`University Management app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect with database', error);
  }
}

boostrap();
