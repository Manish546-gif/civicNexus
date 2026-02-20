import { Link } from 'react-router-dom'
import {
    Zap, Flame, Trophy, Users, MessageCircle, Star,
    TrendingUp, CheckCircle2, Clock, ArrowRight, Gamepad2, BarChart3, Plus
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const recentChallenges = [
    { title: 'Binary Search Tree', category: 'Coding', xp: 50, status: 'completed', time: '2h ago' },
    { title: 'Climate Data Quiz', category: 'Knowledge', xp: 30, status: 'completed', time: '1d ago' },
    { title: 'Sorting Algorithm', category: 'Coding', xp: 75, status: 'in-progress', time: 'Active' },
    { title: 'Civic Rights MCQ', category: 'Knowledge', xp: 25, status: 'pending', time: 'Daily' },
]

const activityFeed = [
    { avatar: 'S', user: 'Sarah K.', action: 'solved the Fibonacci challenge', time: '3m ago', xp: '+50 XP' },
    { avatar: 'J', user: 'James L.', action: 'created game server "Algo Masters"', time: '12m ago', xp: '' },
    { avatar: 'M', user: 'Maya P.', action: 'posted in Climate Action forum', time: '18m ago', xp: '' },
    { avatar: 'R', user: 'Raj S.', action: 'joined EduTech Community', time: '24m ago', xp: '+10 XP' },
    { avatar: 'A', user: 'Aisha T.', action: 'earned the "Streak Master" badge', time: '1h ago', xp: '+25 XP' },
]

const topCommunities = [
    { emoji: '🎓', name: 'EduTech Alliance', members: '1.2k', activity: 'High' },
    { emoji: '🌱', name: 'Climate Hackers', members: '890', activity: 'High' },
    { emoji: '🏛️', name: 'Civic Leaders Hub', members: '640', activity: 'Med' },
    { emoji: '💻', name: 'CodeCraft Pro', members: '2.1k', activity: 'High' },
]

export default function Dashboard() {
    const { user } = useAuth()

    const statsCards = [
        { icon: Zap, label: 'XP Points', value: (user?.xp || 0).toLocaleString(), change: `Lvl ${user?.level || 1}`, color: '#000' },
        { icon: Flame, label: 'Day Streak', value: `${user?.streak || 0} days`, change: 'Current active', color: '#f97316' },
        { icon: Trophy, label: 'Professional Rank', value: user?.rankName || 'Novice', change: 'Live status', color: '#000' },
        { icon: Users, label: 'Member Status', value: user?.role === 'admin' ? 'Admin' : 'Citzen', change: 'Authenticated', color: '#000' },
    ]

    return (
        <div style={{ color: '#000' }}>
            {/* Header / Welcome Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-1.5px', marginBottom: '8px', color: '#000' }}>
                        Welcome, {user?.name || 'Explorer'}
                    </h2>
                    <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '15px', fontWeight: 700 }}>
                        Global Node ID: <span style={{ color: '#000' }}>{user?.id?.slice(-8).toUpperCase() || 'INITIALIZING'}</span> · Status: <span style={{ color: '#10b981' }}>Active</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        padding: '12px 24px', borderRadius: '14px', background: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.02)', color: '#000', fontSize: '14px', fontWeight: 800,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        <BarChart3 size={16} /> Audit Stats
                    </button>
                    <Link to="/communities/create" style={{
                        padding: '12px 24px', borderRadius: '14px', background: '#000',
                        color: '#fff', fontSize: '14px', fontWeight: 900, textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }}>
                        <Plus size={16} /> New Hub
                    </Link>
                </div>
            </div>

            {/* Performance Overview */}
            <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '24px', marginBottom: '32px',
                display: 'flex', alignItems: 'center', gap: '48px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tier Expansion Progress</span>
                        <span style={{ fontSize: '13px', color: '#000', fontWeight: 900 }}>{user?.xp % 500} / 500 XP</span>
                    </div>
                    <div style={{ height: '12px', background: 'rgba(0,0,0,0.03)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${((user?.xp % 500) / 500) * 100}%`, height: '100%', background: '#000', borderRadius: '99px', transition: 'width 1s ease' }} />
                    </div>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '40px', fontWeight: 950, color: '#000', lineHeight: 1 }}>{Math.floor(((user?.xp % 500) / 500) * 100)}%</div>
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Node Resonance</div>
                </div>
            </div>

            {/* Core Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {statsCards.map(card => (
                    <div key={card.label} style={{
                        padding: '32px 24px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '14px',
                                background: 'rgba(0,0,0,0.04)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <card.icon size={20} color="#000" strokeWidth={2.5} />
                            </div>
                            <span style={{
                                fontSize: '10px', fontWeight: 900,
                                color: card.color === '#f97316' ? '#fff' : '#000',
                                background: card.color === '#f97316' ? '#f97316' : 'rgba(0,0,0,0.05)',
                                padding: '4px 10px', borderRadius: '8px', textTransform: 'uppercase'
                            }}>
                                {card.change}
                            </span>
                        </div>
                        <div style={{ fontSize: '36px', fontWeight: 950, marginBottom: '4px', color: '#000', letterSpacing: '-1.5px' }}>{card.value}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{card.label}</div>
                    </div>
                ))}
            </div>

            {/* Main Operational View */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', marginBottom: '32px' }}>
                {/* Active Assignments */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '28px', padding: '32px', backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h3 style={{ fontWeight: 950, fontSize: '20px', letterSpacing: '-0.5px' }}>Active Assignments</h3>
                        <Link to="/challenges" style={{ fontSize: '13px', color: 'rgba(0,0,0,0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
                            MASTER REPOSITORY <ArrowRight size={14} />
                        </Link>
                    </div>
                    {recentChallenges.map((c, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '20px',
                            padding: '20px 0',
                            borderBottom: i < recentChallenges.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '16px',
                                background: 'white', border: '1px solid rgba(0,0,0,0.03)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, boxShadow: '0 4px 8px rgba(0,0,0,0.01)'
                            }}>
                                {c.status === 'completed' ? <CheckCircle2 size={24} color="#10b981" /> : c.status === 'in-progress' ? <Clock size={24} color="#f97316" /> : <Zap size={24} color="rgba(0,0,0,0.1)" />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px', color: '#000' }}>{c.title}</div>
                                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{c.category} · LAST ACTION: {c.time}</div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: '16px', fontWeight: 950, color: c.status === 'completed' ? '#000' : 'rgba(0,0,0,0.2)' }}>+{c.xp} XP</div>
                                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.05em' }}>{c.status}</div>
                            </div>
                        </div>
                    ))}
                    <Link to="/challenges" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                        marginTop: '32px', padding: '16px',
                        background: '#000', borderRadius: '18px',
                        color: '#fff', fontSize: '15px', textDecoration: 'none', fontWeight: 900,
                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                    }}>
                        Initialize Today&apos;s Mission <Zap size={16} fill="#fff" />
                    </Link>
                </div>

                {/* Network Feed */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '28px', padding: '32px', backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <h3 style={{ fontWeight: 950, fontSize: '20px', marginBottom: '32px', letterSpacing: '-0.5px' }}>Network Feed</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {activityFeed.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '16px',
                            }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.04)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '15px', fontWeight: 950, flexShrink: 0, color: '#000'
                                }}>{item.avatar}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#000' }}>
                                        <span style={{ fontWeight: 900 }}>{item.user}</span>{' '}
                                        <span style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 600 }}>{item.action}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                                        <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 800 }}>{item.time.toUpperCase()}</span>
                                        {item.xp && <span style={{ fontSize: '12px', fontWeight: 950, color: '#000' }}>{item.xp}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Synergies & Accelerators */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Hub Synergy */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '28px', padding: '32px', backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h3 style={{ fontWeight: 950, fontSize: '20px', letterSpacing: '-0.5px' }}>Active Hub Resonance</h3>
                        <Link to="/communities" style={{ fontSize: '13px', color: 'rgba(0,0,0,0.3)', textDecoration: 'none', fontWeight: 800 }}>
                            GLOBAL INDEX <ArrowRight size={14} />
                        </Link>
                    </div>
                    {topCommunities.map((c, i) => (
                        <Link key={i} to={`/communities/${i + 1}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '20px',
                                padding: '16px 0',
                                borderBottom: i < topCommunities.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <span style={{ fontSize: '32px' }}>{c.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 900, fontSize: '16px', color: '#000' }}>{c.name}</div>
                                    <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{c.members} ACTIVE EXPLORERS</div>
                                </div>
                                <span style={{
                                    fontSize: '11px', padding: '5px 12px', borderRadius: '10px',
                                    background: c.activity === 'High' ? 'black' : 'rgba(0,0,0,0.05)',
                                    color: c.activity === 'High' ? 'white' : 'rgba(0,0,0,0.4)',
                                    fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>
                                    {c.activity} SYNERGY
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* High-Impact Shortcuts */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '28px', padding: '32px', backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <h3 style={{ fontWeight: 950, fontSize: '20px', marginBottom: '32px', letterSpacing: '-0.5px' }}>High-Impact Shortcuts</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {[
                            { icon: Zap, label: 'Initialize Mission', path: '/challenges', sub: 'High XP rewards' },
                            { icon: Gamepad2, label: 'Game Environment', path: '/games', sub: 'Join active cluster' },
                            { icon: MessageCircle, label: 'Collective Chat', path: '/chat', sub: 'Hub communication' },
                            { icon: Users, label: 'Spawn New Hub', path: '/communities/create', sub: 'Architect community' },
                            { icon: TrendingUp, label: 'Global Ranking', path: '/leaderboard', sub: 'Track your standing' },
                            { icon: BarChart3, label: 'System Logs', path: '/analytics', sub: 'Performance analysis' },
                        ].map(a => (
                            <Link key={a.label} to={a.path} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    padding: '20px',
                                    background: 'rgba(255,255,255,0.5)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                    cursor: 'pointer',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = '#000'
                                        e.currentTarget.style.borderColor = '#000'
                                        e.currentTarget.style.transform = 'translateY(-4px)'
                                        e.currentTarget.firstChild.style.color = '#fff'
                                        e.currentTarget.children[1].style.color = '#fff'
                                        e.currentTarget.children[2].style.color = 'rgba(255,255,255,0.5)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.5)'
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.firstChild.style.color = '#000'
                                        e.currentTarget.children[1].style.color = '#000'
                                        e.currentTarget.children[2].style.color = 'rgba(0,0,0,0.4)'
                                    }}
                                >
                                    <a.icon size={20} style={{ color: '#000', marginBottom: '12px', transition: 'color 0.3s' }} strokeWidth={2.5} />
                                    <div style={{ fontWeight: 900, fontSize: '15px', color: '#000', marginBottom: '4px', transition: 'color 0.3s' }}>{a.label}</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700, transition: 'color 0.3s' }}>{a.sub}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
