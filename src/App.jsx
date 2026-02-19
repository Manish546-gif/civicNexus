import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import Analytics from './pages/Analytics'
import AdminPanel from './pages/AdminPanel'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  const { user } = useAuth()

  return (
    <Router>
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
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
