import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Main, Projects } from './pages';
import { AboutUs } from './pages/AboutUs';

function App() {
  return (
    <> {/* Fragment kullanıyoruz */}
      <NavBar /> 
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/AboutUs' element={<AboutUs/>} />
        <Route path='/Projects' element={<Projects/>} />
      </Routes>
    </>
  );
}

export default App;
