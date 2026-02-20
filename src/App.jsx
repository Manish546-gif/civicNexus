import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Communities from './pages/Communities'
import CommunityDetail from './pages/CommunityDetail'
import CreateCommunity from './pages/CreateCommunity'
import Chat from './pages/Chat'
import Forums from './pages/Forums'
import ForumThread from './pages/ForumThread'
import Games from './pages/Games'
import GameRoom from './pages/GameRoom'
import Challenges from './pages/Challenges'
import ChallengeDetail from './pages/ChallengeDetail'
import Leaderboard from './pages/Leaderboard'
import Achievements from './pages/Achievements'
import Feed from './pages/Feed'
import AdminLayout from './components/AdminLayout'
import AdminCentral from './pages/AdminCentral'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import LoadingScreen from './components/LoadingScreen'

function LoadingTransition({ children }) {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    // Show the loading screen briefly for each route change
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (loading) return <LoadingScreen />
  return children
}
function AppRoutes() {
  const { user } = useAuth()

  return (
    <LoadingTransition>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />

        {/* App Routes - protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/communities/create" element={<CreateCommunity />} />
            <Route path="/communities/:id" element={<CommunityDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/forums/:id" element={<ForumThread />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameRoom />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenges/:id" element={<ChallengeDetail />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/achievements" element={<Achievements />} />
          </Route>

          {/* Separate Admin Terminal Central */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin-terminal" element={<AdminCentral />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LoadingTransition>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
