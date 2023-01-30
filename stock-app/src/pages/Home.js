import React, { useState } from 'react';
import Cards from '../components/Cards';
import Search from '../components/Search';

const Home = () => {
  const [searchString, setSearchString] = useState('')

  return (
    <div className='d-flex flex-column justify-content-start flex-grow-1 p-4'>
      <Search searchStringUpdated={setSearchString} />
      <Cards searchString={searchString}/>
    </div>
  );
}

export default Home;