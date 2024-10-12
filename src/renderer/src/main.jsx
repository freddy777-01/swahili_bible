import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeProvider from './utilities/theme-provider'

//TODO=> configure git actions
//TODO => put bible file and display on user interface
//TODO => look on data persistent or use sqlite.
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
)
