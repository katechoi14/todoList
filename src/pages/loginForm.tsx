import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email, password
            });
            const { token } = response.data;
            localStorage.setItem('accessToken', token);
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                id="email"
                required
            />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            </div>
        <button className="w-full" type="submit">Login</button>
        {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;


