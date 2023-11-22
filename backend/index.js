import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';
import logoutRoute from './routes/logout.js';
import profileRoute from './routes/profile.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('CONNECTED TO MONGODB');
} catch (error) {
  console.log('database error ', error);
}

app.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

app.listen(process.env.PORT, () =>
  console.log(`Backend is running on port ${process.env.PORT}`)
);
