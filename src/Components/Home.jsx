import React from 'react';
import Movies from './Movies';
import SearchAndFilter from './SearchAndFilter';

function Home() {

  return (
    <div className='text-5xl '>
      <SearchAndFilter />
      <Movies />
    </div>
  )
}

export default Home;