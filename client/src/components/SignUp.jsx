import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            const response = await fetch(`${baseUrl}/user/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, email, password})
            });

            if (!response.ok) {
                throw new Error(`Failed to get task: ${response.status}`);
            }
            const data = await response.json();
            if (data?.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log("Error in signup ::", error);
        }
    }

    return (
        <div className='mt-8 w-[350px] mx-auto flex flex-col gap-y-8 p-8 border border-gray-300 rounded-md'>
            <h2 className='text-2xl font-bold'>Create Account</h2>
            <input className='p-2 border border-gray-400 rounded-md' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
            <input className='p-2 border border-gray-400 rounded-md' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <input className='p-2 border border-gray-400 rounded-md' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
            <button className='p-2 bg-blue-400 rounded-md' onClick={handleSignUp}>Sign up</button>
            <p className='text-sm text-center'>
                Alreday have an account?{' '}
                <Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
            </p>
        </div>
    )
}

export default Signup;