import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Nav'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/dash' element={<ProtectedRoute />}>
          <Route path='/dash' element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
