import styled from 'styled-components'
import { Container, Stack, Button } from 'react-bootstrap'
import ModalComponent from './Modal'

const HeroComponent = styled.header`
  /* padding: 5rem 0; */
  height: 10rem;
  background: url('/header.webp');
  /* background: url('/hero2.webp'); */
  /* background-color: rgb(53, 53, 53); */
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding-left: 3rem;
  font-size: 1.4rem;
  /* font-family: Arial, Helvetica, sans-serif; */
  margin-bottom: 1rem;
`

const HeaderContainer = styled.div`
  /* background-color: rgb(53, 53, 53); */
  /* height: 100vh; */
  padding: 1rem 1rem;
  color: white;
  /* width: 32.5rem; */
`

const HeroText = styled.p`
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5px;
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
      <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
        <ModalComponent text='Login' variant='secondary' isSignupFlow={false} />
      </div>

      {/* <HeroComponent>
       
      </HeroComponent> */}
      <HeaderContainer>
        <Stack gap={1}>
          <h3>Try one class for $12</h3>
          <Button
            variant='primary'
            size='lg'
            style={{ padding: '0.5rem 3rem', cursor: 'pointer' }}
            href='https://buy.stripe.com/test_7sI8ynaOg72K5tC144'
          >
            Purchase One Class
          </Button>
          {/* <Heading>Zumba</Heading> */}
          {/* <SubHeading>Workout while having fun with Zumba!</SubHeading> */}
          <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            Or sign up for monthly subscription. Unlimited classes for
            $60/month!
          </p>
          <ModalComponent text='Signup' variant='primary' isSignupFlow={true} />
        </Stack>
      </HeaderContainer>
      {/* </Container> */}
      {/* </Stack> */}
    </>
  )
}
export default Hero
