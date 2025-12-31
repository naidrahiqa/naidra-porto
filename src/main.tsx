import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialize fresh data if needed (for first-time load or after updates)
// You can comment out these lines after first load if you want to keep your data
const isFirstLoad = !localStorage.getItem('portfolio_initialized');
if (isFirstLoad) {
  // Clear old data and let storage.ts initialize with fresh defaults
  localStorage.removeItem('portfolio_projects');
  localStorage.removeItem('portfolio_settings');
  localStorage.setItem('portfolio_initialized', 'true');
  console.log('🎌 Portfolio initialized with fresh data for Faqih Ardian Syah!');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
