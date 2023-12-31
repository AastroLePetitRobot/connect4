import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GameContextProvider } from './hooks/useGame'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>,
)

