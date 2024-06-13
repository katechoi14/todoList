import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <Link href="/todo">Go to the Todo list!</Link>
    </div>
  );
};

export default Home;