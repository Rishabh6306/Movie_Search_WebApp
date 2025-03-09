import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SingleMovie from './Components/SingleMovie';
import Error from './Components/Error';
import LandingPage from './Components/LandingPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/home' element = {<Home />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App;