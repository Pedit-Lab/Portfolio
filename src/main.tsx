import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Always open the portfolio at Home after a full load or refresh. Navigation
// links can still scroll to sections normally during the current visit.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

if (window.location.hash) {
  history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`)
}

window.scrollTo(0, 0)
window.addEventListener('pageshow', () => window.scrollTo(0, 0), { once: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
