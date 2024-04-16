import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoute from './routes/apiRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);


app.use("/api/v1",apiRoute);

app.listen(3000, ()=> {
    console.log('Server is up and running');
})