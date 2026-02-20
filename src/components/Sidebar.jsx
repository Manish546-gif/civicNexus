import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Users, MessageCircle, FileText,
    Gamepad2, Zap, Trophy, Award, BarChart3,
    User, Settings, ShieldCheck, Flame, LogOut, MessageSquare
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Communities', path: '/communities' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: FileText, label: 'Forums', path: '/forums' },
    { icon: Gamepad2, label: 'Arena', path: '/games' },
    { icon: MessageSquare, label: 'Community Feed', path: '/feed' },
    { icon: Zap, label: 'Challenges', path: '/challenges' },
    { icon: Trophy, label: 'Rankings', path: '/leaderboard' },
    { icon: Award, label: 'Achievements', path: '/achievements' },
]

const adminItems = [
    { icon: ShieldCheck, label: 'Admin Terminal', path: '/admin-terminal' },
    { icon: BarChart3, label: 'System Analytics', path: '/admin-terminal' }, // Analytics is a tab in AdminCentral
]

export default function Sidebar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_BASE_URL, {
            transports: ['websocket'],
            forceNew: true
        })

        socket.on('new_message_notification', (data) => {
            // Only increment if not on chat page or for a room not currently viewed
            // Since Sidebar doesn't know the exact active channel in Chat.jsx easily,
            // we'll at least skip if sender is the current user.
            if (data.sender !== user?.name) {
                setUnreadCount(prev => prev + 1)
            }
        })

        return () => socket.disconnect()
    }, [user?.name])

    useEffect(() => {
        if (location.pathname === '/chat') {
            setUnreadCount(0)
        }
    }, [location.pathname])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const filteredNavItems = user?.role === 'admin' ? adminItems : navItems

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(0, 0, 0, 0.05)',
            zIndex: 50,
            position: 'relative',
        }}>
            {/* Logo */}
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px',
                        background: '#000',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <Zap size={20} color="white" fill="white" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.5px', color: '#000', lineHeight: 1 }}>HUB</div>
                        <div style={{ fontSize: '10px', color: 'rgba(0, 0, 0, 0.4)', fontWeight: 700, letterSpacing: '0.1em' }}>COMMUNITY</div>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
                {filteredNavItems.map(({ icon: Icon, label, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: isActive ? '#000' : 'rgba(0, 0, 0, 0.5)',
                            background: isActive ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                            transition: 'all 0.2s ease',
                        })}
                    >
                        <Icon size={18} />
                        <span style={{ flex: 1 }}>{label}</span>
                        {label === 'Chat' && unreadCount > 0 && (
                            <div style={{
                                width: '18px', height: '18px', borderRadius: '50%',
                                background: '#ef4444', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '10px', fontWeight: 900, boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                            }}>
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User */}
            <div style={{ padding: '16px', borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <div style={{
                    padding: '12px',
                    borderRadius: '16px',
                    background: 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    marginBottom: '12px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <div style={{
                            width: '36px', height: '36px',
                            borderRadius: '50%', background: '#000',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 800, fontSize: '14px'
                        }}>{user?.name?.charAt(0) || 'U'}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {user?.name || 'Explorer'}
                            </div>
                            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {user?.role === 'admin' ? 'System Administrator' : `Level ${user?.level || 1} · ${user?.rankName || 'Novice'}`}
                            </div>
                        </div>
                    </div>
                    {user?.role !== 'admin' && (
                        <div style={{ height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ width: `${(user?.xp % 500) / 5}%`, height: '100%', background: '#000', borderRadius: '99px' }} />
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        background: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '12px',
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'
                        e.currentTarget.style.color = '#ef4444'
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.1)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                        e.currentTarget.style.color = 'rgba(0,0,0,0.6)'
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'
                    }}
                >
                    <LogOut size={16} /> Logout Protocol
                </button>
            </div>
        </aside>
    )
}
