import React from 'react';
import SearchAndFilter from './SearchAndFilter';
import Movies from './Movies';

function Home() {

  return (
    <div>
      {/* Search & Filter section */}
      <div id="search-section" className="bg-pink-50 py-10 ">
        <SearchAndFilter />
        <Movies />
      </div>
    </div>
  );
}

export default Home;