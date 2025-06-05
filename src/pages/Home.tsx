import { AvatarsList, CardComponent, Header } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

function Home() {
  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 1',
      subtitle: currencyConverter(6242.64),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 2',
      subtitle: currencyConverter(3246.32),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 3',
      subtitle: currencyConverter(2346.84),
    },
  ]
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>Card</CardComponent>
        <CardComponent>
          <AvatarsList listData={mockListData} />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
