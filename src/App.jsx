/**
 * App.jsx — Route Configuration
 * ------------------------------
 * Public routes:
 *   /                                       → Home (all portfolio sections)
 *   /projects/devpilot-ai                   → DevPilot AI detail page
 *   /projects/learning-management-system    → LMS detail page
 *
 * Reserved (Phase 3):
 *   /admin                                  → Admin dashboard (not built in Phase 1)
 *
 * All public routes share RootLayout (Lenis + Navbar + Footer).
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './pages/Home.jsx'
import DevPilotAI from './pages/projects/DevPilotAI.jsx'
import LearningMS from './pages/projects/LearningMS.jsx'
import HotelEvento from './pages/projects/HotelEvento.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public portfolio routes ──────────────────────────────── */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/devpilot-ai" element={<DevPilotAI />} />
          <Route path="/projects/learning-management-system" element={<LearningMS />} />
          <Route path="/projects/hotel-evento" element={<HotelEvento />} />
        </Route>

        {/*
          /admin — Phase 3 (Admin Dashboard)
          Protected admin route is added here in Phase 3.
          Not implemented in Phase 1.
        */}

        {/* ── 404 fallback ────────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
