import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ResumePage } from './components/ResumePage'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
