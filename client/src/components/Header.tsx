import styled from 'styled-components'

const HeaderComponent = styled.header`
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

const Header = () => {
  return <HeaderComponent></HeaderComponent>
}
export default Header
