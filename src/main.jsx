import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'

// ponytail: pathname check instead of a router, add react-router if more routes show up
const Page = window.location.pathname === '/privacy-policy' ? PrivacyPolicy : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
