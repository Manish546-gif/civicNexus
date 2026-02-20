import { useState, useEffect } from 'react'
import { Star, Lock, Zap, Flame, Trophy, Users, MessageCircle, Gamepad2, BarChart3, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Skeleton from '../components/Skeleton'

const badges = [
    { id: 1, icon: '🔥', name: 'Streak Master', desc: 'Maintain a 7-day streak', earned: true, xp: 100, rarity: 'Rare', date: '2026-02-15' },
    { id: 2, icon: '⚡', name: 'Challenge Champion', desc: 'Complete 50 challenges', earned: true, xp: 200, rarity: 'Epic', date: '2026-02-10' },
    { id: 3, icon: '👥', name: 'Community Builder', desc: 'Join 5 communities', earned: true, xp: 75, rarity: 'Common', date: '2026-01-28' },
    { id: 4, icon: '🎮', name: 'Game Master', desc: 'Win 10 multiplayer games', earned: true, xp: 150, rarity: 'Rare', date: '2026-02-01' },
    { id: 5, icon: '💬', name: 'Conversation Starter', desc: 'Post 100 messages', earned: true, xp: 50, rarity: 'Common', date: '2026-01-20' },
    { id: 6, icon: '🏆', name: 'Top 100', desc: 'Reach top 100 on leaderboard', earned: false, xp: 500, rarity: 'Legendary', date: null },
    { id: 7, icon: '🌱', name: 'Eco Warrior', desc: 'Complete 20 environmental challenges', earned: false, xp: 250, rarity: 'Epic', date: null },
    { id: 8, icon: '🎓', name: 'Knowledge Master', desc: 'Score 100% on 10 quizzes', earned: false, xp: 300, rarity: 'Epic', date: null },
    { id: 9, icon: '⭐', name: 'Star Contributor', desc: 'Receive 500 upvotes on posts', earned: false, xp: 400, rarity: 'Legendary', date: null },
    { id: 10, icon: '🚀', name: 'Rocket Launch', desc: 'Reach Level 20', earned: false, xp: 1000, rarity: 'Legendary', date: null },
    { id: 11, icon: '🔬', name: 'Science Geek', desc: 'Complete science track', earned: false, xp: 175, rarity: 'Rare', date: null },
    { id: 12, icon: '🗳️', name: 'Civic Champion', desc: 'Complete civic track', earned: false, xp: 175, rarity: 'Rare', date: null },
]

const rarityColors = {
    Common: '#64748b',
    Rare: '#3b82f6',
    Epic: '#8b5cf6',
    Legendary: '#f59e0b',
}

const achievements = [
    { icon: <Flame size={18} />, label: 'Current Streak', value: '7 days', max: '7 days' },
    { icon: <Zap size={18} />, label: 'Challenges Solved', value: '47', max: '100 for next badge' },
    { icon: <Trophy size={18} />, label: 'Games Won', value: '8/10', max: '10 for badge' },
    { icon: <Users size={18} />, label: 'Communities', value: '5/5', max: 'Completed!' },
    { icon: <MessageCircle size={18} />, label: 'Messages Sent', value: '89/100', max: '100 for badge' },
]

export default function Achievements() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const earnedNames = user?.badges || []
    const earned = badges.filter(b => earnedNames.includes(b.name))
    const locked = badges.filter(b => !earnedNames.includes(b.name))

    const achievements = [
        { icon: <Flame size={18} />, label: 'Current Streak', value: `${user?.streak || 0} days`, max: 'Current Status' },
        { icon: <Zap size={18} />, label: 'Resonance Tier', value: `Lvl ${user?.level || 1}`, max: `${user?.xp || 0} Total XP` },
        { icon: <Trophy size={18} />, label: 'Global Standing', value: user?.rankName || 'Novice', max: 'Explorer Rank' },
        { icon: <Star size={18} />, label: 'Prestige Vault', value: `${earned.length}`, max: 'Badges Earned' },
        { icon: <CheckCircle2 size={18} />, label: 'System Access', value: user?.role === 'admin' ? 'Root' : 'User', max: 'Identity Verified' },
    ]

    const nextLevelXp = (user?.level || 1) * 500
    const progress = ((user?.xp || 0) % 500) / 500 * 100

    return (
        <div style={{ color: '#000' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '6px' }}>Achievements & Prestige</h2>
                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    Successfully collected {earned.length} out of {badges.length} badges · Total XP boost: <b>{earned.reduce((a, b) => a + b.xp, 0).toLocaleString()}</b>
                </p>
            </div>

            {/* Progress overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {loading ? (
                    [...Array(5)].map((_, i) => <Skeleton.Base key={i} className="h-40 rounded-[20px]" />)
                ) : (
                    achievements.map((a, i) => (
                        <div key={i} style={{
                            padding: '24px',
                            background: 'rgba(255,255,255,0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                        }}>
                            <div style={{ color: '#000', marginBottom: '12px' }}>{a.icon}</div>
                            <div style={{ fontWeight: 900, fontSize: '20px', marginBottom: '4px' }}>{a.value}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginBottom: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.label}</div>
                            <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 700 }}>{a.max}</div>
                        </div>
                    ))
                )}
            </div>

            {/* XP & Level info */}
            <div style={{
                padding: '32px 40px', marginBottom: '40px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '24px', display: 'flex', gap: '48px', alignItems: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                {loading ? (
                    <div style={{ width: '100%' }}>
                        <Skeleton.Base className="h-24 w-full rounded-2xl" />
                    </div>
                ) : (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', fontWeight: 950, letterSpacing: '-2px', color: '#000', lineHeight: 1 }}>{user?.level || 1}</div>
                            <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Explorer Level</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 900 }}>
                                <span style={{ color: '#000' }}>{(user?.xp || 0).toLocaleString()} XP</span>
                                <span style={{ color: 'rgba(0,0,0,0.4)' }}>{nextLevelXp.toLocaleString()} XP (Target)</span>
                            </div>
                            <div style={{ height: '10px', background: 'rgba(0,0,0,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                                <div style={{ width: `${progress}%`, height: '100%', background: '#000', borderRadius: '99px', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                            </div>
                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', marginTop: '8px', fontWeight: 700 }}>Next tier unlock: Level {(user?.level || 1) + 1} (+{nextLevelXp - (user?.xp || 0)} XP remaining)</div>
                        </div>
                        <div style={{ display: 'flex', gap: '32px' }}>
                            {[
                                { label: 'Cumulative XP', value: (user?.xp || 0).toLocaleString() },
                                { label: 'Streak Status', value: `${user?.streak || 0}d` },
                                { label: 'Identity Status', value: user?.role?.toUpperCase() || 'USER' },
                            ].map(stat => (
                                <div key={stat.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 900, fontSize: '20px' }}>{stat.value}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Earned Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 900, fontSize: '18px' }}>Prestige Badges</h3>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.3)' }}>{earned.length} UNLOCKED</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
                {loading ? (
                    [...Array(4)].map((_, i) => <Skeleton.Base key={i} className="h-60 rounded-[24px]" />)
                ) : (
                    earned.length > 0 ? earned.map(badge => (
                        <div key={badge.id} style={{
                            padding: '32px 24px',
                            background: 'rgba(255,255,255,0.7)',
                            backdropFilter: 'blur(10px)',
                            border: `1.5px solid ${rarityColors[badge.rarity]}40`,
                            borderRadius: '24px', textAlign: 'center',
                            cursor: 'default', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#fff'
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.05)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.7)'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{badge.icon}</div>
                            <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '6px' }}>{badge.name}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)', marginBottom: '16px', lineHeight: 1.5, fontWeight: 500 }}>{badge.desc}</div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: rarityColors[badge.rarity], padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                                    {badge.rarity}
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800 }}>+{badge.xp} XP</span>
                            </div>
                            <CheckCircle2 size={16} fill="#10b981" color="#fff" style={{ position: 'absolute', top: '16px', right: '16px' }} />
                        </div>
                    )) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'rgba(0,0,0,0.02)', borderRadius: '24px', border: '1px dashed rgba(0,0,0,0.1)' }}>
                            <Lock size={40} style={{ color: 'rgba(0,0,0,0.1)', marginBottom: '16px' }} />
                            <div style={{ fontWeight: 900, color: 'rgba(0,0,0,0.2)' }}>PRESTIGE VAULT EMPTY</div>
                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: 700, marginTop: '4px' }}>Complete challenges to unlock badges</div>
                        </div>
                    )
                )}
            </div>

            {/* Locked Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 900, fontSize: '18px' }}>Locked Challenges</h3>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.3)' }}>{locked.length} DISCOVERABLE</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {loading ? (
                    [...Array(4)].map((_, i) => <Skeleton.Base key={i} className="h-60 rounded-[24px]" />)
                ) : (
                    locked.map(badge => (
                        <div key={badge.id} style={{
                            padding: '32px 24px',
                            background: 'rgba(0,0,0,0.02)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '24px', textAlign: 'center', opacity: 0.6,
                            position: 'relative'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(1) opacity(0.3)' }}>{badge.icon}</div>
                            <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '6px', color: 'rgba(0,0,0,0.3)' }}>{badge.name}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.2)', marginBottom: '16px', lineHeight: 1.5, fontWeight: 500 }}>{badge.desc}</div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(0,0,0,0.3)', background: 'rgba(0,0,0,0.04)', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                                    {badge.rarity}
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: 800 }}>+{badge.xp} XP</span>
                            </div>
                            <Lock size={14} style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(0,0,0,0.1)' }} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
