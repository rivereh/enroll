import { Navbar, Nav, NavItem, NavLink, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context'

const NavbarComponent = () => {
  const [state, setState] = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null })
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <Navbar
      bg='dark'
      data-bs-theme='dark'
      collapseOnSelect
      expand='sm'
      className='bg-body-tertiary'
    >
      <Container>
        <Link className='navbar-brand d-inline-block align-top' to='/'>
          <img
            src='logo.webp'
            width='188'
            height='39'
            className='d-inline-block align-top'
          />
        </Link>
        {/* <Navbar.Brand href='#home'>
          <img
            src='logo.webp'
            width='30'
            height='30'
            className='d-inline-block align-top'
          />
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#features'>About</Nav.Link>
            <Link className='nav-link' to='/plans'>
              Pricing
            </Link>
          </Nav>
          {state.data && (
            <Nav>
              {localStorage.getItem('token') && (
                <Nav.Link className='nav-link' onClick={handleLogout}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavbarComponent
