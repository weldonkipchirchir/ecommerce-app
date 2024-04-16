import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme.js'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './state'
import App from './App.jsx'

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
