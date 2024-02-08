import styled from 'styled-components'
import { Container, Stack, Button } from 'react-bootstrap'
import ModalComponent from './Modal'

const HeroComponent = styled.header`
  /* padding: 5rem 0; */
  height: 10rem;
  background: url('/hero2.webp');
  background-color: rgb(53, 53, 53);
  background-size: cover;
  background-position: center;
`

const HeaderContainer = styled.div`
  background-color: rgb(53, 53, 53);
  height: 100vh;
  padding: 1rem 1rem;
  color: white;
  /* width: 32.5rem; */
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
    <>
      {/* <Container> */}
      {/* <Stack gap={10}> */}
      <HeroComponent></HeroComponent>
      <HeaderContainer>
        <Stack gap={3}>
          <Button
            variant='primary'
            size='lg'
            style={{ padding: '0.5rem 3rem', cursor: 'pointer' }}
            href='https://buy.stripe.com/test_7sI8ynaOg72K5tC144'
          >
            Buy Drop-in Class - $12
          </Button>
          {/* <Heading>Zumba</Heading> */}
          {/* <SubHeading>Workout while having fun with Zumba!</SubHeading> */}
          <ModalComponent text='Signup' variant='primary' isSignupFlow={true} />
          <ModalComponent
            text='Login'
            variant='secondary'
            isSignupFlow={false}
          />
        </Stack>
      </HeaderContainer>
      {/* </Container> */}
      {/* </Stack> */}
    </>
  )
}
export default Hero
