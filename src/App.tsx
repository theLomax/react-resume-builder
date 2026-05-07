import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { ResumePage } from './components/ResumePage'
import { SkillsTestPage } from './components/SkillsTestPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProjectPage } from './pages/ProjectPage'

function AppContent() {
	return (
		<>
			<Routes>
				<Route path="/"                   element={<Navigate to="/cv" replace />} />
				<Route path="/cv"                  element={<ResumePage variantId="default" />} />
				<Route path="/test/skills"         element={<SkillsTestPage />} />
				<Route path="/portfolio"           element={<PortfolioPage />} />
				<Route path="/portfolio/:slug"     element={<ProjectPage />} />
			</Routes>
		</>
	)
}

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	)
}

export default App
