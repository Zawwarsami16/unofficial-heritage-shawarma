import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/unofficial-heritage-shawarma">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

if (typeof window.__loaderDone === 'function') {
  requestAnimationFrame(() => requestAnimationFrame(window.__loaderDone))
}
