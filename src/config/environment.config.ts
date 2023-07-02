import path from 'path';
import dotenv from 'dotenv';

export const setEnvironment = () => {
  const envPath = path.join(__dirname, '../../.env');
  dotenv.config({ path: envPath });
};

export const getEnvironment = () => process.env.NODE_ENV || 'development';
