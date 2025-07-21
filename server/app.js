import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './src/routes/task.routes.js';
import userRoutes from './src/routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Database'))
.catch((err) => console.log('MongoDB connection error:', err));

// Basic route
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);


// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});