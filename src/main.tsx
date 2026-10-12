import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Always open the portfolio at Home after a full load or refresh. Browsers may
// restore the previous scroll position after the first render, so keep the
// initial reset active briefly while the page and its images settle. Navigation
// links continue to work normally once startup has finished.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const resetInitialScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
const isPortfolioReload = window.location.pathname === '/' && navigationEntry?.type === 'reload'

// A browser refresh from any portfolio section always restarts at Home. Normal
// navigation from Pricing keeps its hash so it can return to the source section.
if (isPortfolioReload && window.location.hash) {
  history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`)
}

if (!window.location.hash || isPortfolioReload) {
  resetInitialScroll()
  requestAnimationFrame(() => {
    resetInitialScroll()
    requestAnimationFrame(resetInitialScroll)
  })

  window.addEventListener('DOMContentLoaded', resetInitialScroll, { once: true })
  window.addEventListener('load', resetInitialScroll, { once: true })
  window.addEventListener('pageshow', resetInitialScroll, { once: true })
  window.setTimeout(resetInitialScroll, 150)
  window.setTimeout(resetInitialScroll, 500)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
