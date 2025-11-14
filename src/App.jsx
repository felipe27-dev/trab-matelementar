import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CirclePage from './pages/CirclePage';
import GraphPage from './pages/GraphPage';

function App() {
  return (
    <>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/circulo-trigonometrico" element={<CirclePage />} />
        <Route path="/criacao-graficos" element={<GraphPage />} /> 
      </Routes>
    </main>
    </>
  )
}

export default App
