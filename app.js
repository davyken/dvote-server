import createError from 'http-errors';  
import express from 'express';  
import path from 'path';  
import cookieParser from 'cookie-parser';  
import logger from 'morgan';  
import connectDB from './config/dbConfig.js';
import cors from 'cors';  
import dotenv from 'dotenv';
import fs from 'fs';


const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dotenv.config();   

const port = process.env.PORT || 5000; 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(path.resolve(), 'public')));

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to the Davyvote API!');
});

import usersRouter from './routes/users.js';  
import contestRouter from './routes/contests.js';

app.use('/users', usersRouter); 
app.use('/contests', contestRouter);

connectDB();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use((err, req, res, next) => {  
  console.error('Error details:', err); 
  res.status(err.status || 500).json({  
    error: {  
      message: err.message,  
      status: err.status || 500,  
    },  
  });  
});

app.listen(port, () => console.log(`Server Running on port ${port}`));  

export default app;
