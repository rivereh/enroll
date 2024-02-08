import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  data: {
    id: string
    firstName: string
    lastName: string
    email: string
    customerStripeId: string
    subscribed: boolean
  } | null
  error: string | null
  loading: boolean
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, error: null }, () => {}])

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  })

  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get('http://localhost:8000/auth/me')

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          customerStripeId: response.data.user.customerStripeId,
          subscribed: response.data.user.subscribed,
        },
        loading: false,
        error: null,
      })
    } else if (response.data && response.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      })
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      })
    }
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
