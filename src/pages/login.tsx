import React from 'react';
import Link from 'next/link';
// import loginForm from './loginForm';

const Login = () => {
    return (
        <div>
            <div>
                <h1>Login</h1>
                <p>Need to create an account?{' '}
                    <Link href='/register'></Link>
                </p>
            </div> 
        </div>
    )
}

export default Login;