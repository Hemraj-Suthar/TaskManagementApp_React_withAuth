import { useState } from 'react'
import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard'
import AddTask from './components/AddTask';
import Signup from './components/SignUp';
import Login from './components/Login';

function App() {
  const token = useSelector(state => state?.user?.token);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path='/add-task' element={<AddTask/>}/>
        <Route path='/add-task/:id' element={<AddTask/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
