import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import ModalComponent from './Modal'

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background: url('https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  /* background-position: center; */
`

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`

const Heading = styled.h1`
  font-size: 3rem;
`

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Zumba</Heading>
          <SubHeading>Workout while having fun with Zumba!</SubHeading>
          <ModalComponent text='Signup' variant='primary' isSignupFlow={true} />
          <ModalComponent
            text='Login'
            variant='secondary'
            isSignupFlow={false}
          />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  )
}
export default Hero
