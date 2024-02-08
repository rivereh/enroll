import { useContext } from 'react'
import { UserContext } from '../context'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoute = () => {
  const [state] = useContext(UserContext)

  if (state.loading) return <div></div>

  return state.data ? <Outlet /> : <Navigate to='/' />
}
