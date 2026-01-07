import styled from 'styled-components'

const FooterComponent = styled.footer`
  color: white;
  background-image: url('/hero2.webp');
  background-size: cover;
  background-position: center;
  height: 10rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding-left: 0.7rem;
  padding-bottom: 0.3rem;
`

const FooterText = styled.p`
  margin-bottom: 5px;
  padding: 0px;
`

const Footer = () => {
  return (
    <FooterComponent>
      <FooterText>idazumba@gmail.com</FooterText>
      <FooterText style={{ fontSize: '1.3rem' }}>206-3380-0051</FooterText>
      <FooterText>Join the party!</FooterText>
    </FooterComponent>
  )
}
export default Footer
