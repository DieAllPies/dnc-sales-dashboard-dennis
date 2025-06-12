import { type ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

// Components
import { Box, Container, GridLegacy } from '@mui/material'
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from '@/components'

//Hooks
import { useFormValidation, usePost } from '@/hooks'

// Utils
import { jwtExpirationDateConverter, pxToRem } from '@/utils'

// Types
import type { DecodedJWT } from '@/types/decodedJwt'
import type { MessageProps } from '@/types/formComponents'
import type { LoginData, LoginPostData } from '@/types/loginData'

// Redux
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux'

function Login() {
  const navigate = useNavigate()
  const { email, message } = useSelector(
    (state: RootState) => state.createProfile
  )
  const inputs = [
    { type: 'email', placeholder: 'Email' },
    { type: 'password', placeholder: 'Senha' },
  ]
  const { data, loading, error, postData } = usePost<LoginData, LoginPostData>(
    'login'
  )
  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleMessage = (): MessageProps => {
    if (!error) return { msg: message ?? '', type: 'success' }
    switch (error) {
      case 401:
        return {
          msg: 'Email e/ou senha inválidos',
          type: 'error',
        }
      default:
        return {
          msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte.',
          type: 'error',
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sending login request...')
    await postData({
      email: String(formValues[0]),
      password: String(formValues[1]),
    })
    console.log('Request finished.')
  }

  useEffect(() => {
    if (data?.jwt_token) {
      const decoded: DecodedJWT = jwtDecode(data?.jwt_token)
      Cookies.set('Authorization', data?.jwt_token, {
        expires: jwtExpirationDateConverter(decoded.exp),
        secure: true,
      })
      console.log('DATA: ', data)
    }
    if (Cookies.get('Authorization')) navigate('/home')
  }, [data, navigate])

  useEffect(() => {
    if (email) {
      handleChange(0, email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  return (
    <>
      <Box>
        <GridLegacy container>
          <GridLegacy
            item
            xs={12}
            sm={6}
            sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <Logo height={41} width={100} />
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>Bem-vindo</StyledH1>
                <StyledP>Digite sua senha e email para entrar</StyledP>
              </Box>
              <FormComponent
                inputs={inputs.map((input, index) => ({
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || '',
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, (e.target as HTMLInputElement).value),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled: !formValid || loading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: loading ? 'Aguarde...' : 'Login',
                  },
                ]}
                message={handleMessage()}
              />
            </Container>
          </GridLegacy>
          <GridLegacy item sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BannerImage />
          </GridLegacy>
        </GridLegacy>
      </Box>
    </>
  )
}

export default Login
