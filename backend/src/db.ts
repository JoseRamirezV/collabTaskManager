import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL as string;

mongoose
  .connect(DB_URL)
  .then(() => console.log('> Connected...'))
  .catch((err) =>
    console.log(`> Error while connecting to mongoDB : ${err.message}`)
  );
