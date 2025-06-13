import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './styles/'
import { AppThemeProvider } from './context/AppThemeProvider'
import { Provider } from 'react-redux'
import store from './redux/index'

/** lightTheme, darkTheme */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <GlobalStyle />
        <App />
      </AppThemeProvider>
    </Provider>
  </StrictMode>
)
