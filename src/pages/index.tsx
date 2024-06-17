import React from 'react';
import Link from 'next/link';
import ToDoList from '../components/ToDoList';

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-serif">Welcome to the Todo App</h1>
      <Link href="/todo" className="mt-4">Go to the Todo list!</Link>
    </div>
  );
};

export default Home;


ajsdfl;adkjf