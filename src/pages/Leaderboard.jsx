import { useState } from 'react'
import { Trophy, Medal, Zap, Flame, Search, Filter } from 'lucide-react'

const leaderboardData = [
    { rank: 1, avatar: 'S', name: 'Sarah Kim', username: '@sarahk', xp: 18420, streak: 42, badges: 28, community: 'EduTech Alliance', change: 0 },
    { rank: 2, avatar: 'J', name: 'James Lee', username: '@jameslee', xp: 16800, streak: 35, badges: 22, community: 'CodeCraft Pro', change: 2 },
    { rank: 3, avatar: 'P', name: 'Priya Sharma', username: '@priyasharma', xp: 15200, streak: 28, badges: 19, community: 'Climate Hackers', change: -1 },
    { rank: 4, avatar: 'R', name: 'Ryan Torres', username: '@ryant', xp: 14100, streak: 21, badges: 17, community: 'EduTech Alliance', change: 1 },
    { rank: 5, avatar: 'M', name: 'Maya Patel', username: '@mayap', xp: 13500, streak: 19, badges: 15, community: 'Civic Leaders Hub', change: -2 },
    { rank: 6, avatar: 'A', name: 'Aisha Tanaka', username: '@aishat', xp: 12900, streak: 14, badges: 14, community: 'Climate Hackers', change: 3 },
    { rank: 7, avatar: 'D', name: 'David Chen', username: '@dchen', xp: 11400, streak: 12, badges: 13, community: 'CodeCraft Pro', change: 0 },
    { rank: 8, avatar: 'L', name: 'Lena Schmidt', username: '@lenas', xp: 10800, streak: 9, badges: 12, community: 'Open Knowledge', change: 5 },
    { rank: 9, avatar: 'K', name: 'Kai Nguyen', username: '@kaing', xp: 9600, streak: 7, badges: 10, community: 'Youth Voices', change: -3 },
    { rank: 10, avatar: 'F', name: 'Fiona Walsh', username: '@fionaw', xp: 8900, streak: 6, badges: 9, community: 'Zero Waste Warriors', change: 1 },
    { rank: 284, avatar: 'A', name: 'Alex Rivera (You)', username: '@alexrivera', xp: 2450, streak: 7, badges: 5, community: 'EduTech Alliance', change: 36, isYou: true },
]

const periods = ['This Week', 'This Month', 'All Time']
const categories = ['Overall', 'Coding', 'Knowledge', 'Community']

export default function Leaderboard() {
    const [period, setPeriod] = useState('All Time')
    const [category, setCategory] = useState('Overall')

    const top3 = leaderboardData.slice(0, 3)
    const rest = leaderboardData.slice(3)

    const rankBg = {
        1: 'rgba(255,255,255,0.9)',
        2: 'rgba(255,255,255,0.7)',
        3: 'rgba(255,255,255,0.6)'
    }
    const rankLabel = { 1: '🥇', 2: '🥈', 3: '🥉' }

    return (
        <div style={{ color: '#000' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '8px' }}>
                    Elite Rankings
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    Global Explorer Status: <span style={{ color: '#000', fontWeight: 900 }}>#284</span> · Outperforming 95% of active users
                </p>
            </div>

            {/* Period & Category filters */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.03)', padding: '6px', borderRadius: '14px' }}>
                    {periods.map(p => (
                        <button key={p} onClick={() => setPeriod(p)} style={{
                            padding: '8px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                            cursor: 'pointer', border: 'none',
                            background: period === p ? '#fff' : 'transparent',
                            color: period === p ? '#000' : 'rgba(0,0,0,0.4)',
                            transition: 'all 0.2s',
                            boxShadow: period === p ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                        }}>{p}</button>
                    ))}
                </div>
                <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.08)' }} />
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.03)', padding: '6px', borderRadius: '14px' }}>
                    {categories.map(c => (
                        <button key={c} onClick={() => setCategory(c)} style={{
                            padding: '8px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                            cursor: 'pointer', border: 'none',
                            background: category === c ? '#000' : 'transparent',
                            color: category === c ? '#fff' : 'rgba(0,0,0,0.4)',
                            transition: 'all 0.2s'
                        }}>{c}</button>
                    ))}
                </div>
            </div>

            {/* Top 3 Podium */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', alignItems: 'flex-end', justifyContent: 'center' }}>
                {[top3[1], top3[0], top3[2]].map((player, podiumIdx) => {
                    const heights = ['240px', '280px', '220px']
                    return (
                        <div key={player.rank} style={{
                            width: '240px', textAlign: 'center',
                            padding: '32px 24px',
                            background: rankBg[player.rank],
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '24px',
                            height: heights[podiumIdx],
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            gap: '12px', position: 'relative',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                            transform: podiumIdx === 1 ? 'translateY(-10px)' : 'none'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{rankLabel[player.rank]}</div>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '50%',
                                background: 'rgba(0,0,0,0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '24px', fontWeight: 900, border: '3px solid #fff',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.05)', color: '#000'
                            }}>{player.avatar}</div>
                            <div style={{ fontWeight: 900, fontSize: '18px', color: '#000' }}>{player.name}</div>
                            <div style={{ fontSize: '14px', color: '#000', fontWeight: 900, background: 'rgba(0,0,0,0.04)', padding: '4px 12px', borderRadius: '8px' }}>{player.xp.toLocaleString()} XP</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 800 }}>
                                <Flame size={14} fill="#f97316" color="#f97316" /> {player.streak} DAY STREAK
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Rankings table */}
            <div style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.2fr 100px 100px 100px', gap: '0', padding: '16px 32px', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    <span>Rank</span><span>Explorer Identity</span><span>Home Hub</span><span>Streak</span><span>Badges</span><span style={{ textAlign: 'right' }}>Total XP</span>
                </div>
                {[...rest, leaderboardData[leaderboardData.length - 1]].map((player, i) => (
                    <div key={player.rank} style={{
                        display: 'grid', gridTemplateColumns: '80px 2fr 1.2fr 100px 100px 100px',
                        padding: '20px 32px', alignItems: 'center',
                        borderBottom: '1px solid rgba(0,0,0,0.03)',
                        background: player.isYou ? 'rgba(0,0,0,0.03)' : 'transparent',
                        transition: 'background 0.2s',
                    }}
                        onMouseEnter={e => !player.isYou && (e.currentTarget.style.background = 'rgba(0,0,0,0.01)')}
                        onMouseLeave={e => !player.isYou && (e.currentTarget.style.background = 'transparent')}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 900, fontSize: '18px', color: player.isYou ? '#000' : 'rgba(0,0,0,0.6)' }}>#{player.rank}</span>
                            {player.change !== 0 && (
                                <span style={{ fontSize: '10px', color: player.change > 0 ? '#10b981' : '#ef4444', fontWeight: 900 }}>
                                    {player.change > 0 ? `↑${player.change}` : `↓${Math.abs(player.change)}`}
                                </span>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'rgba(0,0,0,0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '15px', fontWeight: 900, color: '#000'
                            }}>{player.avatar}</div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '15px' }}>{player.name} {player.isYou && '(You)'}</div>
                                <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{player.username}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', fontWeight: 700 }}>{player.community}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 800 }}>
                            <Flame size={14} fill="#f97316" color="#f97316" /> {player.streak}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 800 }}>
                            ⭐ {player.badges}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 900, textAlign: 'right' }}>{player.xp.toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
