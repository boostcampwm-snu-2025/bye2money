import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "dayjs/locale/en";
import "dayjs/locale/ko";

import App from './app/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
