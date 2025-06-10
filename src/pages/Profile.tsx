import { useContext } from 'react'
import { CardComponent, Header, StyledH2, StyledButton } from '@/components'
import { AppThemeContext } from '@/context/AppThemeContext'
import { Container, GridLegacy } from '@mui/material'

import { logout } from '@/services'

function Profile() {
  const themeContext = useContext(AppThemeContext)
  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <GridLegacy container spacing={4}>
          <GridLegacy item xs={12} sm={6}>
            <CardComponent>Seus dados...</CardComponent>
          </GridLegacy>
          <GridLegacy item xs={12} sm={6}>
            <CardComponent>
              <StyledH2 className="mb-1">Definições de compra</StyledH2>
              <StyledButton
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{' '}
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
              </StyledButton>
              <StyledButton className="alert" onClick={logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </GridLegacy>
        </GridLegacy>
      </Container>
    </>
  )
}

export default Profile
