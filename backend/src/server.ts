import app from './app';
import mongoose from 'mongoose';
import { env } from '@config/env';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    
    app.listen(env.PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${env.PORT}`);
      console.log(`✓ Environment: ${env.NODE_ENV}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
