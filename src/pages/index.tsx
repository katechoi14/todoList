import React from 'react';
import Link from 'next/link';
import ToDoList from '../components/ToDoList';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-serif">Welcome to the Todo App</h1>
      <Link href="/todo" className="mt-4">Go to the Todo list!</Link>
    </div>
  );
};

export default Home;


