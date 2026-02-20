import { useState, useEffect } from 'react'
import { Trophy, Medal, Zap, Flame, Search, Filter } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const periods = ['This Week', 'This Month', 'All Time']
const categories = ['Overall', 'Coding', 'Knowledge', 'Community']

export default function Leaderboard() {
    const [period, setPeriod] = useState('All Time')
    const [category, setCategory] = useState('Overall')
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    const fetchLeaderboard = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/leaderboard`)
            // Map with manual rankings
            const rankedPlayers = res.data.map((p, i) => ({
                ...p,
                rank: i + 1,
                avatar: p.name.charAt(0).toUpperCase(),
                isYou: p._id === user?.id
            }))
            setPlayers(rankedPlayers)
        } catch (err) {
            console.error('Failed to sync rankings')
            setPlayers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeaderboard()
    }, [user])

    const top3 = players.slice(0, 3)
    const rest = players.slice(3)

    // Find current user's rank if not in top 50
    const userRank = players.find(p => p.isYou)?.rank || 'N/A'

    const rankBg = {
        1: 'rgba(255,255,255,0.9)',
        2: 'rgba(255,255,255,0.7)',
        3: 'rgba(255,255,255,0.6)'
    }
    const rankLabel = { 1: '🥇', 2: '🥈', 3: '🥉' }

    if (loading) {
        return (
            <div style={{ padding: '80px', textAlign: 'center' }}>
                <Zap className="spin" size={48} color="#facc15" style={{ marginBottom: '20px' }} />
                <h3 style={{ fontWeight: 900, color: 'rgba(0,0,0,0.2)' }}>CALCULATING ELITE RESONANCE...</h3>
            </div>
        )
    }

    return (
        <div style={{ color: '#000' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '8px' }}>
                    Elite Rankings
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    Global Explorer Status: <span style={{ color: '#000', fontWeight: 900 }}>#{userRank}</span> · Live Database Identification
                </p>
            </div>

            {/* Period & Category filters (Placeholders for now) */}
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
            {top3.length > 0 ? (
                <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {[top3[1], top3[0], top3[2]].filter(Boolean).map((player, podiumIdx) => {
                        const heights = ['240px', '280px', '220px']
                        return (
                            <div key={player._id} style={{
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
                                <div style={{ fontSize: '14px', color: '#000', fontWeight: 900, background: 'rgba(0,0,0,0.04)', padding: '4px 12px', borderRadius: '8px' }}>{(player.xp || 0).toLocaleString()} XP</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 800 }}>
                                    <Flame size={14} fill="#f97316" color="#f97316" /> {player.streak || 0} DAY STREAK
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.2)', fontWeight: 800 }}>
                    NO EXPLORERS YET IDENTIFIED
                </div>
            )}

            {/* Rankings table */}
            {rest.length > 0 && (
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
                    {rest.map((player) => (
                        <div key={player._id} style={{
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
                                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>@{player.username || 'explorer'}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', fontWeight: 700 }}>Civic Participant</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 800 }}>
                                <Flame size={14} fill="#f97316" color="#f97316" /> {player.streak || 0}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 800 }}>
                                ⭐ {player.badges?.length || 0}
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 900, textAlign: 'right' }}>{(player.xp || 0).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
