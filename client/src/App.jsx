import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Nav'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectedRoutes'
import Plans from './pages/Plans'
import { QRCodeSVG } from 'qrcode.react'
import { UserContext } from './context'
import { useContext } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [state, setState] = useContext(UserContext)

  return (
    <BrowserRouter>
      {/* <QRCodeSVG value='http://idazumba.com/' />, */}
      <Navbar />
      {/* <Header /> */}
      <Routes>
        <Route
          path='/'
          element={state.data ? <Dashboard /> : <LandingPage />}
        ></Route>
        <Route path='/dash' element={<ProtectedRoute />}>
          <Route path='/dash' element={<Dashboard />}></Route>
        </Route>
        <Route path='/plans' element={<ProtectedRoute />}>
          <Route path='/plans' element={<Plans />}></Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
