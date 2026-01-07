import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'

const ErrorMessage = styled.p`
  color: red;
`

const ModalComponent = ({ text, variant, isSignupFlow }) => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navigate = useNavigate()

  const [state, setState] = useContext(UserContext)

  const handleClick = async () => {
    let response

    if (isSignupFlow) {
      const { data: signUpData } = await axios.post(
        'http://localhost:8000/auth/signup',
        {
          firstName,
          lastName,
          email,
          password,
        }
      )

      response = signUpData
    } else {
      const { data: loginData } = await axios.post(
        'http://localhost:8000/auth/login',
        {
          email,
          password,
        }
      )

      response = loginData
    }

    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg)
    }

    setState({
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

    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common[
      'authorization'
    ] = `Bearer ${response.data.token}`
    navigate('/dash')
  }

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size='lg'
        style={{ padding: '0.5rem 3rem' }}
      >
        {text}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignupFlow && (
            <>
              <InputGroup className='mb-3'>
                <InputGroup.Text>First Name</InputGroup.Text>
                <FormControl
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Last Name</InputGroup.Text>
                <FormControl
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>
            </>
            // <InputGroup className='mb-3'>
            //   <InputGroup.Text>Full Name</InputGroup.Text>
            //   <FormControl
            //     type='text'
            //     value={fullName}
            //     onChange={(e) => setFullName(e.target.value)}
            //   />
            // </InputGroup>
          )}

          <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalComponent
