import React from 'react';
import LoginForm from '../components/loginForm';

const LoginPage = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-serif">Login</h1>
        <LoginForm />
      </div>
    );
  };
  
  export default LoginPage;