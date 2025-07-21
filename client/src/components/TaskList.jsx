import React from 'react'
import { useNavigate } from 'react-router-dom';

const TaskList = ({view, tasks, filteredTasks, handleView, handleStatus, handleEdit, handleDelete}) => {
    const navigate = useNavigate();

    return (
        <div className=''>
            <div className='py-6 flex justify-between items-center'>
                <div className='my-8 text-2xl font-bold'>Tasks {filteredTasks.length} of {tasks.length}</div>
                <div className='flex gap-x-4'>
                    <button className='bg-gray-300 px-6 py-2 rounded-md' onClick={handleView}>{view === "Grid" ? "List" : "Grid"} View</button>
                    <button className='bg-gray-300 px-6 py-2 rounded-md' onClick={() => navigate("/add-task")}>Add Task</button>
                </div>
            </div>
            <div className={`gap-8 ${view === "List" ? "flex flex-col" : "grid grid-cols-3"}`}>
                {filteredTasks.map(task => (
                    <div className='w-full px-8 py-4 border border-gray-300 rounded-md' key={task._id}>
                        <h4 className='text-xl font-bold'>{task.title}</h4>
                        <p className='my-2'>{task.description}</p>
                        <button className={`mb-3 px-3 py-1/2 rounded-md ${task.completed ? "bg-green-500" : "bg-gray-300"}`} onClick={() => handleStatus(task._id, task.completed)}>{task.completed ? "Active" : "Inactive"}</button>
                        <div className='flex gap-x-4'>
                            <button className="bg-yellow-300 px-4 py-1 rounded-md" onClick={() => handleEdit(task._id)}>Edit</button>
                            <button className="bg-red-500 text-white px-4 py-1 rounded-md" onClick={() => handleDelete(task._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskList;