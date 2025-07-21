import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddTask = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const token = useSelector(state => state?.user?.token);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const getTask = async () => {
        try {
            const response = await fetch(`${baseUrl}/task/single-task/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to get task: ${response.status}`);
            }
            const data = await response.json();
            setTitle(data?.data?.title);
            setDescription(data?.data?.description)
        } catch (error) {
            console.log("Error in getTask ::", error);
        }
    }

    useEffect(() => {
        if (id != undefined) {
            getTask();
        }
    }, []);

    const handleTask = async () => {
        let url;
        if (id != undefined) {
            url = `${baseUrl}/task/edit-task/${id}`;
        } else {
            url = `${baseUrl}/task/create-task`;
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({title, description})
            })

            if (!response.ok) {
                throw new Error(`Failed to create task: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                navigate("/")
            }
        } catch (error) {
            console.log("Error in createTask ::", error);
        }
    }

    return (
        <div className='mt-8 w-[350px] mx-auto flex flex-col gap-y-8 p-8 border border-gray-300 rounded-md'>
            <h2 className='text-2xl font-bold'>Create Task</h2>
            <input className='p-2 border border-gray-400 rounded-md' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
            <input className='p-2 border border-gray-400 rounded-md' value={description} placeholder='Descriprion' onChange={(e) => setDescription(e.target.value)}/>
            <button className='p-2 bg-blue-400 rounded-md' onClick={handleTask}>{id != undefined ? "Update Task" : "Add Task"}</button>
        </div>
    )
}

export default AddTask;