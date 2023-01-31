import { createRoles } from './libs/initialSetup';
import mongoose, { ConnectOptions } from 'mongoose';
mongoose.set('strictQuery', false);
export const connectToDatBase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/test',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      } as ConnectOptions
    );
    console.log('Database is connected');
    createRoles();
  } catch (error) {
    console.log(error);
  }
};
