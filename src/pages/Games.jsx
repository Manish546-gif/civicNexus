import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Gamepad2, Plus, Lock, Globe2, Users, Zap, Trophy, ArrowRight, Copy, Hash } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const gameModes = [
    { icon: '⚔️', title: 'Competitive', desc: 'Head-to-head ranked matches', xp: '50-200 XP' },
    { icon: '🤝', title: 'Co-op', desc: 'Solve challenges together', xp: '30-100 XP' },
    { icon: '🏆', title: 'Tournament', desc: 'Bracket-style competitions', xp: '100-500 XP' },
    { icon: '⚡', title: 'Speed Run', desc: 'Race the clock solo', xp: '20-75 XP' },
]

const statusColor = {
    'Waiting': '#10b981',
    'In Progress': '#f97316',
    'Full': '#ef4444',
}

export default function Games() {
    const [lobbies, setLobbies] = useState([])
    const [joinCode, setJoinCode] = useState('')
    const [showCreate, setShowCreate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [newLobby, setNewLobby] = useState({ name: '', capacity: 6, category: 'Algorithm/DSA', private: false })

    const navigate = useNavigate()
    const { user } = useAuth()

    const fetchLobbies = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/games/lobbies')
            setLobbies(res.data)
        } catch (err) {
            console.error('Failed to fetch lobbies', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLobbies()
    }, [])

    const handleCreateLobby = async () => {
        try {
            const res = await axios.post('http://localhost:5001/api/games/lobbies', {
                name: newLobby.name || `${user.name}'s Arena`,
                category: newLobby.category,
                private: newLobby.private
            })
            setShowCreate(false)
            fetchLobbies()
            // Optionally navigate directly to the new room
            navigate(`/games/${res.data.id || res.data._id}`)
        } catch (err) {
            console.error('Failed to create lobby', err)
        }
    }

    return (
        <div style={{ color: '#000' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '6px' }}>Game Servers</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                        {lobbies.filter(g => g.status === 'Waiting').length} lobbies awaiting players · Host a match to earn bonus XP
                    </p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', borderRadius: '12px',
                        background: '#000', color: 'white',
                        border: 'none', fontWeight: 800, fontSize: '14px', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    <Plus size={18} /> Create New Lobby
                </button>
            </div>

            {/* Join by code */}
            <div style={{
                padding: '24px 32px', marginBottom: '32px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '24px', display: 'flex', gap: '24px', alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}>
                <div style={{ flexShrink: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>Join with Code</div>
                    <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>Enter 6-character server code</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto', alignItems: 'center' }}>
                    <input
                        value={joinCode}
                        onChange={e => setJoinCode(e.target.value.toUpperCase())}
                        placeholder="ABC123"
                        maxLength={6}
                        style={{
                            padding: '14px 20px', borderRadius: '12px', width: '130px',
                            background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)',
                            color: '#000', fontSize: '18px', letterSpacing: '0.2em', fontWeight: 900,
                            textAlign: 'center', outline: 'none'
                        }}
                    />
                    <button
                        onClick={() => {
                            const lobby = lobbies.find(l => l.code === joinCode)
                            if (lobby) navigate(`/games/${lobby._id}`)
                        }}
                        style={{
                            padding: '14px 28px', borderRadius: '12px',
                            background: joinCode.length === 6 ? '#000' : 'rgba(0,0,0,0.05)',
                            color: joinCode.length === 6 ? 'white' : 'rgba(0,0,0,0.2)',
                            border: 'none', fontWeight: 800, fontSize: '14px', cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        Join Room <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                    </button>
                </div>
            </div>

            {/* Create server panel */}
            {showCreate && (
                <div style={{
                    padding: '32px', marginBottom: '32px',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '24px' }}>Establish Game Session</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase' }}>Room Identity</label>
                            <input
                                value={newLobby.name}
                                onChange={e => setNewLobby({ ...newLobby, name: e.target.value })}
                                placeholder="Algo Masters Arena"
                                style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', color: '#000', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontWeight: 500 }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase' }}>Category</label>
                            <select
                                value={newLobby.category}
                                onChange={e => setNewLobby({ ...newLobby, category: e.target.value })}
                                style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', color: '#000', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontWeight: 800 }}
                            >
                                <option value="Algorithm/DSA">Algorithm/DSA</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Geography">Geography</option>
                                <option value="Science">Science</option>
                                <option value="Word Mastery">Word Mastery</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={handleCreateLobby} style={{ padding: '12px 24px', background: '#000', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}>
                            Initialize Server
                        </button>
                        <button onClick={() => setShowCreate(false)} style={{ padding: '12px 24px', background: 'rgba(0,0,0,0.4)', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Game Modes info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
                {gameModes.map(m => (
                    <div key={m.title} style={{
                        padding: '24px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)', borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{m.icon}</div>
                        <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>{m.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginBottom: '12px', fontWeight: 600 }}>{m.desc}</div>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#000', background: 'rgba(0,0,0,0.04)', padding: '4px 8px', borderRadius: '6px', display: 'inline-block' }}>EARN {m.xp}</div>
                    </div>
                ))}
            </div>

            {/* Server List */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: 900, fontSize: '18px' }}>Active Lobbies</h3>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.3)' }}>{lobbies.length} SYSTEMS ONLINE</div>
            </div>

            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', fontWeight: 800, color: 'rgba(0,0,0,0.2)' }}>SCANNING FREQUENCIES...</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {lobbies.map(server => (
                        <div key={server._id} style={{
                            display: 'flex', alignItems: 'center', gap: '20px',
                            padding: '20px 24px',
                            background: 'rgba(255,255,255,0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '20px', transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#fff'
                                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.7)'
                                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                background: 'rgba(0,0,0,0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                color: '#000'
                            }}>
                                <Gamepad2 size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 800, fontSize: '16px' }}>{server.name}</span>
                                    {server.private ? <Lock size={12} color="rgba(0,0,0,0.3)" /> : <Globe2 size={12} color="rgba(0,0,0,0.3)" />}
                                    <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>{server.category}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                                    Host: <b>{server.host}</b> · {server.mode} · Access Code: <span style={{ fontWeight: 900, letterSpacing: '0.1em', color: '#000' }}>{server.code}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '15px', fontWeight: 900 }}>{server.players}</div>
                                    <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', fontWeight: 800, textTransform: 'uppercase' }}>In Lobby</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor[server.status] || '#000' }} />
                                    <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)', fontWeight: 700 }}>{server.status}</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/games/${server._id}`)}
                                    disabled={server.status === 'Full' || server.status === 'In Progress'}
                                    style={{
                                        padding: '10px 24px', borderRadius: '12px',
                                        background: server.status === 'Waiting' ? '#000' : 'rgba(0,0,0,0.05)',
                                        color: server.status === 'Waiting' ? 'white' : 'rgba(0,0,0,0.3)',
                                        border: 'none', fontWeight: 800, fontSize: '13px',
                                        cursor: server.status === 'Waiting' ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.2s',
                                        minWidth: '80px'
                                    }}
                                >
                                    {server.status === 'Waiting' ? 'Join Match' : server.status}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
