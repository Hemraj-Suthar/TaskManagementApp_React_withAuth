import Router from 'express'
import { createTask, updateStatus, deleteTaskById, editTaskById, getAllTasks, getTaskById } from '../controllers/task.controllers.js';
import verifyToken from '../middleware/verifyToken.js';

const taskRoutes = new Router();

taskRoutes.post('/create-task', verifyToken, createTask);
taskRoutes.post('/update-status/:id', updateStatus);
taskRoutes.get('/tasks', verifyToken, getAllTasks);
taskRoutes.get('/single-task/:id', getTaskById);
taskRoutes.post('/edit-task/:id', editTaskById);
taskRoutes.delete('/delete-task/:id', deleteTaskById);

export default taskRoutes; 
