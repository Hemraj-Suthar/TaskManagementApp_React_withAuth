import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch(`${baseUrl}/user/log-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });

            if (!response.ok) {
                throw new Error(`Failed to get task: ${response.status}`);
            }
            const data = await response.json();
            
            if (data?.success) {
                dispatch(login(data.user));
                navigate("/");
            }
        } catch (error) {
            console.log("Error in login ::", error);
        }
    }

    return (
        <div className='mt-8 w-[350px] mx-auto flex flex-col gap-y-8 p-8 border border-gray-300 rounded-md'>
            <h2 className='text-2xl font-bold'>Login</h2>
            <input className='p-2 border border-gray-400 rounded-md' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
            <input className='p-2 border border-gray-400 rounded-md' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button className='p-2 bg-blue-400 rounded-md' onClick={handleLogin}>Login</button>
            <p className='text-sm text-center'>
                Don't have an account?{' '}
                <Link to="/signup" className='text-blue-600 hover:underline'>Sign up</Link>
            </p>
        </div>
    )
}

export default Login;