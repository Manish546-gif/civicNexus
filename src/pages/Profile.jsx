import { useState, useEffect } from 'react'
import { Zap, Flame, Trophy, Users, Star, Edit3, Calendar, MapPin, Link as LinkIcon, BarChart3, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Skeleton from '../components/Skeleton'

const recentActivity = [
    { type: 'challenge', text: 'Completed Binary Search Tree challenge', xp: '+75 XP', time: '2h ago', icon: '⚡' },
    { type: 'badge', text: 'Earned Streak Master badge', xp: '+100 XP', time: '5h ago', icon: '🔥' },
    { type: 'game', text: 'Won CodeSprint multiplayer match', xp: '+80 XP', time: '1d ago', icon: '🎮' },
    { type: 'community', text: 'Joined EduTech Alliance', xp: '+10 XP', time: '2d ago', icon: '👥' },
    { type: 'challenge', text: 'Completed Climate Policy Quiz', xp: '+30 XP', time: '2d ago', icon: '🌱' },
]

const skillBreakdown = [
    { skill: 'Data Structures', level: 78 },
    { skill: 'Algorithms', level: 65 },
    { skill: 'Environmental Knowledge', level: 52 },
    { skill: 'Civic Awareness', level: 70 },
    { skill: 'Problem Solving', level: 84 },
]

const badges = [
    { icon: '🔥', name: 'Streak Master' },
    { icon: '⚡', name: 'Challenge Champion' },
    { icon: '👥', name: 'Community Builder' },
    { icon: '🎮', name: 'Game Master' },
    { icon: '💬', name: 'Conversation Starter' },
]

export default function Profile() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ color: '#000' }}>
            {/* Profile banner */}
            <div style={{
                padding: '40px', marginBottom: '32px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '32px', position: 'relative',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                {loading ? (
                    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                        <Skeleton.Base className="w-[120px] h-[120px] rounded-full" />
                        <div style={{ flex: 1 }}>
                            <Skeleton.Base className="h-10 w-1/3 mb-4" />
                            <Skeleton.Base className="h-6 w-1/4 mb-6" />
                            <Skeleton.Base className="h-20 w-full" />
                        </div>
                    </div>
                ) : (
                    <>
                        <button style={{
                            position: 'absolute', top: '32px', right: '32px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 20px', borderRadius: '12px',
                            background: '#000', border: 'none',
                            color: 'white', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            <Edit3 size={16} /> Edit Profile
                        </button>

                        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                            {/* Avatar */}
                            <div style={{
                                width: '120px', height: '120px', borderRadius: '50%',
                                background: '#000',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '48px', fontWeight: 950, color: '#fff',
                                border: '4px solid #fff',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                            }}>{user?.name?.charAt(0) || 'U'}</div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 950, fontSize: '32px', letterSpacing: '-1px', marginBottom: '6px', color: '#000' }}>
                                    {user?.name || 'Explorer'}
                                </div>
                                <div style={{ fontSize: '16px', color: 'rgba(0,0,0,0.4)', marginBottom: '12px', fontWeight: 800 }}>
                                    @{user?.name?.toLowerCase().replace(/\s+/g, '') || 'explorer'}
                                </div>
                                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.6)', marginBottom: '20px', maxWidth: '600px', lineHeight: 1.6, fontWeight: 500 }}>
                                    Global Registry Member. Active in Node Expansion and Architectural Integrity. Standardized profile protocol initialized.
                                </p>
                                <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Synchronizing...</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2026'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><LinkIcon size={14} /> registry.hub/node-{user?.id?.slice(-4) || 'null'}</span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', minWidth: '340px' }}>
                                {[
                                    { icon: Zap, label: 'Lifetime XP', value: (user?.xp || 0).toLocaleString() },
                                    { icon: Flame, label: 'Streak', value: `${user?.streak || 0}D` },
                                    { icon: Trophy, label: 'Professional Rank', value: user?.rankName || 'Novice' },
                                    { icon: Users, label: 'Platform Role', value: user?.role === 'admin' ? 'Admin' : 'Citzen' },
                                    { icon: Star, label: 'Badges', value: user?.badges?.length || '0' },
                                    { icon: BarChart3, label: 'Tier Level', value: user?.level || '1' },
                                ].map(s => (
                                    <div key={s.label} style={{ textAlign: 'center', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.02)' }}>
                                        <s.icon size={16} style={{ color: 'rgba(0,0,0,0.3)', margin: '0 auto 6px' }} />
                                        <div style={{ fontWeight: 900, fontSize: '20px', color: '#000' }}>{s.value}</div>
                                        <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                {/* Left column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Skill Taxonomy */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '32px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '24px' }}>Skill Taxonomy</h3>
                        {loading ? (
                            <div style={{ spaceY: '20px' }}>
                                <Skeleton.Base className="h-10 w-full mb-4" />
                                <Skeleton.Base className="h-10 w-full mb-4" />
                                <Skeleton.Base className="h-10 w-full" />
                            </div>
                        ) : (
                            skillBreakdown.map(s => (
                                <div key={s.skill} style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 800 }}>
                                        <span style={{ color: '#000' }}>{s.skill}</span>
                                        <span style={{ color: 'rgba(0,0,0,0.4)' }}>{s.level}% Mastery</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ width: `${s.level}%`, height: '100%', background: '#000', borderRadius: '99px', transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)' }} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Narrative Feed */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '32px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '24px' }}>Narrative Feed</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {loading ? (
                                <>
                                    <Skeleton.Base className="h-16 w-full rounded-xl" />
                                    <Skeleton.Base className="h-16 w-full rounded-xl" />
                                </>
                            ) : (
                                recentActivity.map((a, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: '16px', alignItems: 'center',
                                        padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px',
                                        border: '1px solid rgba(0,0,0,0.02)'
                                    }}>
                                        <span style={{ fontSize: '24px' }}>{a.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{a.text}</div>
                                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{a.time}</div>
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: 900, color: '#000' }}>{a.xp}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Resonance Score */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '32px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '24px' }}>Resonance Score</h3>
                        {loading ? (
                            <Skeleton.Base className="h-60 w-full rounded-2xl" />
                        ) : (
                            <>
                                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                    <div style={{ fontSize: '72px', fontWeight: 950, letterSpacing: '-4px', color: '#000', lineHeight: 1 }}>82</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Consistency Rating</div>
                                </div>
                                {[
                                    { label: 'Activity Hub', score: 90 },
                                    { label: 'Challenge Focus', score: 78 },
                                    { label: 'Collective Synergy', score: 72 },
                                    { label: 'Insight Quality', score: 85 },
                                ].map(m => (
                                    <div key={m.label} style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: 800 }}>
                                            <span style={{ color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>{m.label}</span>
                                            <span style={{ color: '#000' }}>{m.score}%</span>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(0,0,0,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                                            <div style={{ width: `${m.score}%`, height: '100%', background: '#000', borderRadius: '99px' }} />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Collections */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '32px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '24px' }}>Collections ({badges.length})</h3>
                        {loading ? (
                            <div style={{ grid: 'display', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                                <Skeleton.Base className="w-11 h-11" />
                                <Skeleton.Base className="w-11 h-11" />
                                <Skeleton.Base className="w-11 h-11" />
                                <Skeleton.Base className="w-11 h-11" />
                                <Skeleton.Base className="w-11 h-11" />
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                                {badges.map((b, i) => (
                                    <div key={i} style={{
                                        width: '44px', height: '44px', background: 'rgba(0,0,0,0.04)',
                                        borderRadius: '12px', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '24px', cursor: 'pointer',
                                        border: '1px solid rgba(0,0,0,0.02)'
                                    }} title={b.name}>
                                        {b.icon}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
