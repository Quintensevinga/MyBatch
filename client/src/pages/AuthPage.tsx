import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/loginAndRegister/Login';
import Register from '../components/loginAndRegister/Register';

const AuthPage: React.FC = () => {

  localStorage.removeItem('accessToken');


  return (
    <div>
      <h1>Welcome to MyBatch!</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
