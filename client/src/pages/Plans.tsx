import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { Card, Button } from 'react-bootstrap'

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`
const CardHeader = styled.div`
  width: 15rem;
  height: 15rem;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px 5px 0px 0px;
`

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 29, 19, 0.4);
`

const PriceText = styled.div`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.4);
`

const PriceSubText = styled.p`
  color: white;
  font-size: 1rem;
  text-align: center;
`

const Plans = () => {
  const [prices, setPrices] = useState<any[]>([])

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      'http://localhost:8000/subs/prices'
    )
    setPrices(response.data)
    console.log(response.data.reverse())
  }

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      'http://localhost:8000/subs/session',
      {
        priceId,
      }
    )

    window.location.href = response.url
  }

  const backgroundColors: any = {
    'Drop-in Class': 'rgb(77, 77, 77)',
    'Monthly Subscription': 'rgba(185, 42, 23, 0.8)',
  }

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any) => {
          return (
            <Card key={price.id}>
              <CardHeader
                style={{ backgroundColor: backgroundColors[price.nickname] }}
              >
                <PriceCircle>
                  <PriceText>
                    ${price.unit_amount / 100}
                    {price.type == 'recurring' && (
                      <PriceSubText>Monthly</PriceSubText>
                    )}
                  </PriceText>
                </PriceCircle>
              </CardHeader>
              <Card.Body
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Card.Title style={{ fontSize: '1.2rem' }}>
                  {price.nickname}
                </Card.Title>
                <Button
                  variant='primary'
                  onClick={() => createSession(price.id)}
                >
                  Purchase
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </CardsContainer>
    </Container>
  )
}
export default Plans
