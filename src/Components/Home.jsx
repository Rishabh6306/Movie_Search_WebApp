import React from 'react';
import { useGlobalContext } from '../../Context';

function Home() {

  const myname = useGlobalContext();

    return (
        <div className='text-5xl '>
          Hello {myname}
        </div>
    )
}

export default Home;