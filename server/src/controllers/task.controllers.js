import { Task } from "../models/task.models.js";


const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: 'All fileds are required.',
        });
    }

    try {
        const newTask = new Task({ title, description, completed: false, userId });

        await newTask.save();

        res.status(201).json({
            success: true,
            message: 'Task created successfully.',
            data: newTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create the task. Please try again later.',
            error: error.message,
        });
    }
}

const updateStatus = async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { completed: status }, { new: true } );

        if (!task) {
             return res.status(404).json({
                success: false,
                message: 'Task not found.',
            });
        }
    
         return res.status(200).json({
            success: true,
            message: 'Task status changed successfully.',
            data: task,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update the task. Please try again later.',
            error: error.message,
        });
    }
}

const getAllTasks = async (req, res) => {
    const { status } = req.query;
    const userId = req.user.userId;  

    let filter = { userId };
    if (status && status !== "All") {
        filter.completed = status;
    };

    try {
        const tasks = await Task.find(filter);
    
        res.json({
            success: true,
            data: tasks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch the blogs. Please try again later.',
            error: error.message,
        });
    }
}

const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    
    try {
        const task = await Task.findOne({_id: taskId});

        if (task.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tasks found.',
            });
        }
    
        res.json({
            success: true,
            data: task,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch the blogs. Please try again later.',
            error: error.message,
        });
    }
}

const editTaskById = async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: 'All fileds are required.',
        });
    }
    try {
        const editedTask = await Task.findByIdAndUpdate(taskId, {title, description}, { new: true });

        if (!editedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: editedTask
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch the blogs. Please try again later.',
            error: error.message,
        });
    }
}

const deleteTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deleteTask = await Task.findOneAndDelete({ _id: taskId });

        if (!deleteTask) {
             return res.status(404).json({
                success: false,
                message: 'Task not found.',
            });
        }
    
         return res.status(200).json({
            success: true,
            message: 'Task deleted successfully.',
            data: deleteTask,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch the blogs. Please try again later.',
            error: error.message,
        });
    }
}

export { createTask, updateStatus, getAllTasks, getTaskById, editTaskById, deleteTaskById }