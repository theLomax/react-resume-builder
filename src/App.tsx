import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ResumePage } from './components/ResumePage'
import { SkillsTestPage } from './components/SkillsTestPage'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/"    element={<ResumePage />} />
        <Route path="/cv"  element={<ResumePage variantId="default" />} />
        <Route path="/test/skills" element={<SkillsTestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
