import React from 'react'
import { useParams } from 'react-router-dom';

function SingleMovie() {
  const { id } = useParams();

  return (
    <div>
       const id this is home page {id} SinglePage
    </div>
  )
    
}

export default SingleMovie;