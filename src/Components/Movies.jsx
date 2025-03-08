import React from 'react';
import { useGlobalContext } from '../Context';

function Movies() {
  const { movie, isLoading, isError } = useGlobalContext(); // ✅ सही से destructure करें

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError.show) {
    return <h1>{isError.mess}</h1>;
  }

  return (
    <>
      <h1>{movie?.Title}</h1> 
    </>
  );
}

export default Movies;