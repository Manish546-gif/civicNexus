import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Clock, CheckCircle2, Lock, Filter, Star } from 'lucide-react'

const challenges = [
    { id: 1, title: 'Binary Search Tree — Insert & Delete', category: 'Coding', difficulty: 'Medium', xp: 75, time: '45 min', solved: 2840, status: 'pending', tags: ['Trees', 'DSA'], daily: true },
    { id: 2, title: 'Climate Policy: Kyoto Protocol Quiz', category: 'Knowledge', difficulty: 'Easy', xp: 30, time: '15 min', solved: 5120, status: 'completed', tags: ['Environment', 'Policy'], daily: true },
    { id: 3, title: 'Graph Traversal: BFS vs DFS', category: 'Coding', difficulty: 'Hard', xp: 120, time: '60 min', solved: 980, status: 'pending', tags: ['Graphs', 'Algorithms'] },
    { id: 4, title: 'Civic Rights & Responsibilities MCQ', category: 'Knowledge', difficulty: 'Easy', xp: 25, time: '10 min', solved: 7400, status: 'completed', tags: ['Civic', 'History'] },
    { id: 5, title: 'Dynamic Programming: Knapsack Problem', category: 'Coding', difficulty: 'Hard', xp: 150, time: '90 min', solved: 620, status: 'in-progress', tags: ['DP', 'Optimization'] },
    { id: 6, title: 'Renewable Energy Trivia', category: 'Knowledge', difficulty: 'Medium', xp: 40, time: '20 min', solved: 3200, status: 'pending', tags: ['Energy', 'Science'] },
    { id: 7, title: 'Sorting Algorithms Speed Challenge', category: 'Coding', difficulty: 'Medium', xp: 80, time: '30 min', solved: 4100, status: 'pending', tags: ['Sorting', 'Performance'] },
    { id: 8, title: 'World Leaders & Organizations Quiz', category: 'Knowledge', difficulty: 'Easy', xp: 20, time: '10 min', solved: 9200, status: 'pending', tags: ['Civic', 'Global'] },
]

const difficultyColors = { Easy: '#10b981', Medium: '#f97316', Hard: '#ef4444' }
const statusIcons = {
    completed: <CheckCircle2 size={16} color="#10b981" />,
    'in-progress': <Clock size={16} color="#f97316" />,
    pending: <Zap size={16} color="rgba(0,0,0,0.2)" />
}

export default function Challenges() {
    const [activeTab, setActiveTab] = useState('All')
    const [activeDiff, setActiveDiff] = useState('All')

    const filtered = challenges.filter(c => {
        const tabMatch = activeTab === 'All' || c.category === activeTab
        const diffMatch = activeDiff === 'All' || c.difficulty === activeDiff
        return tabMatch && diffMatch
    })

    const dailies = challenges.filter(c => c.daily)
    const completedToday = dailies.filter(c => c.status === 'completed').length

    return (
        <div style={{ color: '#000' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '6px' }}>Mastery Challenges</h2>
                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    Sharpen your skills · Earn {challenges.reduce((acc, c) => acc + c.xp, 0)} potential XP today
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
                    <div style={{ fontWeight: 900, fontSize: '20px', marginBottom: '6px' }}>Today&apos;s Daily Milestone</div>
                    <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', fontWeight: 500, marginBottom: '16px' }}>
                        Maintain your <b>7-day streak</b> by finishing the daily set.
                    </div>
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.04)', borderRadius: '99px', overflow: 'hidden', width: '280px' }}>
                        <div style={{ width: `${(completedToday / dailies.length) * 100}%`, height: '100%', background: '#000', borderRadius: '99px', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', marginTop: '8px', fontWeight: 800 }}>{completedToday} / {dailies.length} DAILY CHALLENGES COMPLETED</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '32px', fontWeight: 900 }}>+50</div>
                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase' }}>Streak Bonus</div>
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
                <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)' }} />
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.03)', padding: '6px', borderRadius: '14px' }}>
                    {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                        <button key={d} onClick={() => setActiveDiff(d)} style={{
                            padding: '8px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                            cursor: 'pointer', border: 'none',
                            background: activeDiff === d ? '#fff' : 'transparent',
                            color: activeDiff === d ? (d !== 'All' ? difficultyColors[d] : '#000') : 'rgba(0,0,0,0.4)',
                            transition: 'all 0.2s',
                            boxShadow: activeDiff === d ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
                        }}>{d}</button>
                    ))}
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: 800 }}>{filtered.length} CHALLENGES AVAILABLE</span>
            </div>

            {/* Challenge List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map(c => (
                    <Link key={c.id} to={`/challenges/${c.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '20px',
                            padding: '24px',
                            background: 'rgba(255,255,255,0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '20px', transition: 'all 0.25s',
                            borderLeft: c.daily ? `4px solid #000` : '4px solid transparent',
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
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {statusIcons[c.status]}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontWeight: 800, fontSize: '16px' }}>{c.title}</span>
                                    {c.daily && <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '5px', background: '#000', color: '#fff', fontWeight: 900, textTransform: 'uppercase' }}>🔥 Daily</span>}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600, alignItems: 'center' }}>
                                    <span style={{ textTransform: 'uppercase' }}>{c.category}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {c.time}</span>
                                    <span>✓ {c.solved.toLocaleString()} Solved</span>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {c.tags.map(t => <span key={t} style={{ background: 'rgba(0,0,0,0.03)', padding: '2px 8px', borderRadius: '5px', fontSize: '10px' }}>#{t}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: difficultyColors[c.difficulty], marginBottom: '2px', textTransform: 'uppercase' }}>{c.difficulty}</div>
                                    <div style={{ fontSize: '18px', fontWeight: 900 }}>+{c.xp} XP</div>
                                </div>
                                <div style={{
                                    padding: '10px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: 800,
                                    background: c.status === 'completed' ? 'rgba(16,185,129,0.1)' : '#000',
                                    color: c.status === 'completed' ? '#10b981' : '#fff',
                                    transition: 'all 0.2s', minWidth: '100px', textAlign: 'center'
                                }}>
                                    {c.status === 'completed' ? 'Acquired ✓' : c.status === 'in-progress' ? 'Resume' : 'Begin →'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
