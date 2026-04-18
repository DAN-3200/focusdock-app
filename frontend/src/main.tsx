import './tailwind.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PomodoroGadget } from './view/PomodoroGadget.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PomodoroGadget />
  </StrictMode>,
)
