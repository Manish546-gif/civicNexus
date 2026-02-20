import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Clock, CheckCircle2, Lock, Filter, Star, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const difficultyColors = { Easy: '#10b981', Medium: '#f97316', Hard: '#ef4444' }
const statusIcons = {
    completed: <CheckCircle2 size={16} color="#10b981" />,
    'in-progress': <Clock size={16} color="#f97316" />,
    pending: <Zap size={16} color="rgba(0,0,0,0.2)" />
}

export default function Challenges() {
    const { refreshUser } = useAuth()
    const [challenges, setChallenges] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('All')
    const [activeDiff, setActiveDiff] = useState('All')

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/challenges`)
                setChallenges(res.data)
            } catch (err) {
                console.error('Failed to fetch challenges', err)
            } finally {
                setLoading(false)
            }
        }
        fetchChallenges()
    }, [])

    const handleComplete = async (id) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/challenges/${id}/complete`)
            await refreshUser()
            // In a real app, we'd mark it locally or re-fetch
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/challenges`)
            setChallenges(res.data)
        } catch (err) {
            console.error('Error completing challenge', err)
        }
    }

    const filtered = challenges.filter(c => {
        // Simple mapping for demo
        const tabMatch = activeTab === 'All' || (activeTab === 'Coding' && c.category === 'Algorithm/DSA') || (activeTab === 'Knowledge' && c.category !== 'Algorithm/DSA')
        return tabMatch
    })

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#000' }}>
            <Loader2 className="animate-spin" size={48} />
            <p style={{ marginTop: '16px', fontWeight: 800 }}>Syncing Global Objectives...</p>
        </div>
    )

    return (
        <div style={{ color: '#000' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '6px' }}>Mastery Challenges</h2>
                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    Sharpen your skills · Earn {challenges.reduce((acc, c) => acc + c.rewardXp, 0)} potential XP today
                </p>
            </div>

            {/* Daily banner */}
            <div style={{
                padding: '32px', marginBottom: '32px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '32px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '18px',
                    background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px'
                }}>⚡</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: '20px', marginBottom: '6px' }}>System Milestones</div>
                    <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', fontWeight: 500, marginBottom: '16px' }}>
                        Complete dynamic objectives to accelerate your <b>Career Rank</b>.
                    </div>
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.04)', borderRadius: '99px', overflow: 'hidden', width: '280px' }}>
                        <div style={{ width: `40%`, height: '100%', background: '#000', borderRadius: '99px' }} />
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '32px', fontWeight: 900 }}>+50</div>
                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase' }}>Daily Bonus</div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.03)', padding: '6px', borderRadius: '14px' }}>
                    {['All', 'Coding', 'Knowledge'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '8px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                            cursor: 'pointer', border: 'none',
                            background: activeTab === tab ? '#000' : 'transparent',
                            color: activeTab === tab ? 'white' : 'rgba(0,0,0,0.5)',
                            transition: 'all 0.2s'
                        }}>{tab}</button>
                    ))}
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: 800 }}>{filtered.length} CHALLENGES AVAILABLE</span>
            </div>

            {/* Challenge List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map(c => (
                    <div key={c._id} style={{
                        display: 'flex', alignItems: 'center', gap: '20px',
                        padding: '24px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '20px', transition: 'all 0.25s',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Zap size={16} color="rgba(0,0,0,0.2)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{c.title}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{c.description}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '18px', fontWeight: 900 }}>+{c.rewardXp} XP</div>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>Target: {c.target}</div>
                            </div>
                            <button
                                onClick={() => handleComplete(c._id)}
                                style={{
                                    padding: '10px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: 800,
                                    background: '#000', color: '#fff', border: 'none', cursor: 'pointer',
                                    transition: 'all 0.2s', minWidth: '120px'
                                }}
                            >
                                Complete ✓
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
