import React from 'react';
import Search from './Search';
import Movies from './Movies';

function Home() {

  return (
    <div className='text-5xl '>
      <Search />
      <Movies />
    </div>
  )
}

export default Home;