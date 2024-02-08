import { Container, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'
import axios from 'axios'

const DashComponent = styled.div`
  height: 100vh;
  background-color: rgb(53, 53, 53);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-top: 6rem;
  /* justify-content: center; */
  color: white;
`

const Dashboard = () => {
  const [state, setState] = useContext(UserContext)
  const [subscribed, setSubscribed] = useState('false')

  useEffect(() => {
    getSubscription()
  }, [])

  const getSubscription = async () => {
    const { data: response } = await axios.get('http://localhost:8000/auth/sub')
    setSubscribed(response)
  }

  const handleUnsubscribe = async () => {
    console.log(subscribed)
  }

  const handleResubscribe = async () => {
    // const { data: response } = await axios.get(
    //   'http://localhost:8000/subs/resubscribe'
    // )
    // console.log(response)
    console.log(subscribed)
  }

  return (
    <DashComponent>
      <h4>Hello, {state.data?.firstName}</h4>
      {/* <p>You are logged in as: {state.data?.email}</p> */}
      <h5 className='fnt'>
        Subscription Status: {subscribed ? 'Active' : 'Inactive'}
      </h5>
      <Button variant='primary' href='http://localhost:5173/plans'>
        Manage Subscription
      </Button>
    </DashComponent>
  )
}

export default Dashboard
