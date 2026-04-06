import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { GameHub } from './components/GameHub'
import { GamePlayer } from './components/GamePlayer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<GameHub />} />
          <Route path="/:gameId" element={<GamePlayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
