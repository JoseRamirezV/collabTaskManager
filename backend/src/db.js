import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log('> Connected...'))
  .catch((err) =>
    console.log(`> Error while connecting to mongoDB : ${err.message}`)
  );
