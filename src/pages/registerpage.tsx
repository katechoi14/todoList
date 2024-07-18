import React from 'react';
import RegisterForm from '../components/registerForm';

const RegisterPage = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-serif">Register</h1>
        <RegisterForm />
      </div>
    );
  };
  
  export default RegisterPage;