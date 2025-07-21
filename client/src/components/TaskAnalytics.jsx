import React from 'react'

const TaskAnalytics = ({tasks}) => {
    const activeTask = tasks.filter(task => task.completed).length;
    const inactiveTask = tasks.filter(task => !task.completed).length;

    return (
        <div className='flex gap-x-8 my-6'>
            <div className='border border-gray-300 rounded-md w-100 px-8 py-6'>
                <div className='mb-4 text-xl'>Total Tasks</div>
                <h4 className='text-xl font-bold'>{tasks.length}</h4>
            </div>
            <div className='border border-gray-300 rounded-md w-100 px-8 py-6'>
                <div className='mb-4 text-xl'>Active Tasks</div>
                <h4 className='text-xl font-bold'>{activeTask}</h4>
            </div>
            <div className='border border-gray-300 rounded-md w-100 px-8 py-6'>
                <div className='mb-4 text-xl'>Inactive Tasks</div>
                <h4 className='text-xl font-bold'>{inactiveTask}</h4>
            </div>
        </div>
    )
}

export default TaskAnalytics;
