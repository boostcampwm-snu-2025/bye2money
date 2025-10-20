import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Header from './header.jsx'
import InputBox from './inputbox.jsx'
import Logs from './logs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <InputBox />
    <Logs />
  </StrictMode>,
)
