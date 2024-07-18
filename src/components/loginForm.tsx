import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users/login', { 
                email, password
            });
            setAccessToken(response.data.accessToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            alert('Login successful!');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed!');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email">Email:</label>
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
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            </div>
        <button className="w-full" type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
