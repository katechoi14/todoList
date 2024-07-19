import React from 'react';
import Link from 'next/link';
import LoginPage from './loginpage';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-serif">Welcome to the Todo App</h1>
      < LoginPage />
      <Link href='/registerpage'>Register!</Link>
    </div>
  );
};

export default Home;

