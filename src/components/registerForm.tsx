import React, { useState } from 'react';
import axios from 'axios';
import loginpage from '../pages/loginpage';
import Link from 'next/link';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords are not the same!');
            return;
        }

        try {
            const response = await axios.post('/api/users', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            alert('Registration successful!');
        } catch (error) {
            console.error('Error registering:', error.response ? error.response.data : error.message);
            alert("Registration failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className='bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome!</h1>
                <form onSubmit={handleRegister}>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Email Address
                        </label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Confirm Password
                        </label>
                        <input 
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        />
                    </div>
                    <button type="submit" className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Create an Account!
                    </button>
                    <div>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/loginpage" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
