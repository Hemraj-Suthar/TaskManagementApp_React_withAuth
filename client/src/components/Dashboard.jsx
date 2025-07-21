import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../store/authSlice';
import TaskAnalytics from './TaskAnalytics';
import TaskList from './TaskList';

const STATUS_OPTIONS = ["All", "Active", "Inactive"];

const Dashboard = () => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const user = useSelector(state => state.user);
    const [tasks, setTask] = useState([]);
    const [seacrchQuery, setSearchQuery] = useState("");
    const [view, setView] = useState("List");
    const [filterStatus, setFilterStatus] = useState("All");

    const handleView = () => {
        setView(prevView => prevView === "List" ? "Grid" : "List");
    }

    const getAllTasks = async () => {
        try {
            const response = await fetch(`${baseUrl}/task/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to create task: ${response.status}`);
            }
            const data = await response.json();
            setTask(data?.data);
        } catch (error) {
            console.log("Error in getAllTask ::", error);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    const handleStatus = async (id, status) => {
        try {
            const response = await fetch(`${baseUrl}/task/update-status/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: !status})
            });

            if (!response.ok) {
                throw new Error(`Failed to create task: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            console.log("Error in getAllTask ::", error);
        } finally {
            getAllTasks()
        }
    }

    const handleEdit = (id) => {
        navigate(`/add-task/${id}`)
    }

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/login")
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/task/delete-task/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Failed to delete task: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("Error in deleteTask ::", error);
        } finally {
            getAllTasks();
        }
    }

    const statusFiltered = filterStatus === "All" ? tasks : filterStatus === "Active" ? tasks.filter(task => task.completed) : tasks.filter(task => !task.completed);

    const filteredTasks = statusFiltered.filter(task => task.title.toLowerCase().includes(seacrchQuery.toLowerCase()));

    return (
        <div className='task-manager-wrapper px-6 py-6'>
            <div className='py-6 flex justify-between items-center'>
                <h2 className='text-3xl font-bold'>Task Management App</h2>
                <div className='flex gap-x-4 items-center'>
                    <p>User: {user.username}</p>
                    <button className='bg-gray-300 px-6 py-2 rounded-md' onClick={handleLogout}>Log out</button>
                </div>
            </div>
            
            <TaskAnalytics tasks={tasks}/>

            <div className='flex justify-between gap-x-6'>
                <div className='w-full'>
                    <input className="w-full border border-gray-200 px-4 py-2 rounded-md" placeholder='Seacrch Title' value={seacrchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
                <div className="w-full flex justify-between items-center gap-x-4">
                    <label className='w-max'>Filter: </label>
                    <select
                        className="w-full border border-gray-200 px-4 py-2 rounded-md"
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                        }}
                    >
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <TaskList view={view} tasks={tasks} filteredTasks={filteredTasks} handleView={handleView} handleStatus={handleStatus} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

export default Dashboard;