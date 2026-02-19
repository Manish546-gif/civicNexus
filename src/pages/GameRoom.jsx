import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Zap, Trophy, Crown, CheckCircle2 } from 'lucide-react'

const players = [
    { avatar: 'S', name: 'Sarah Kim', score: 3, status: 'ready', rank: 1 },
    { avatar: 'J', name: 'James Lee', score: 2, status: 'ready', rank: 2 },
    { avatar: 'A', name: 'You', score: 2, status: 'ready', rank: 2, isYou: true },
    { avatar: 'P', name: 'Priya S.', score: 1, status: 'thinking', rank: 4 },
    { avatar: 'R', name: 'Ryan T.', score: 0, status: 'connected', rank: 5 },
]

const question = {
    round: 3, total: 10,
    text: 'What is the time complexity of QuickSort in the average case?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    answer: 1,
    timer: 15,
}

export default function GameRoom() {
    const { id } = useParams()
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [timer, setTimer] = useState(question.timer)

    return (
        <div style={{ color: '#000' }}>
            <Link to="/games" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(0,0,0,0.4)', fontSize: '13px', textDecoration: 'none',
                marginBottom: '24px', fontWeight: 700
            }}>
                <ArrowLeft size={16} /> Retreat from Lobby
            </Link>

            {/* Game header */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                    flex: 1, padding: '24px 32px',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}>
                    <div>
                        <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Current Phase</div>
                        <div style={{ fontWeight: 900, fontSize: '24px' }}>Round {question.round} / {question.total}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Strategic Timer</div>
                        <div style={{ fontWeight: 900, fontSize: '32px', color: timer <= 5 ? '#ef4444' : '#000' }}>
                            {timer}s
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Server Rules</div>
                        <div style={{ fontWeight: 800, fontSize: '16px' }}>Competitive Arena</div>
                    </div>
                </div>
                <div style={{
                    padding: '24px 28px',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '13px', color: '#000', fontWeight: 800 }}>{players.length} USERS LIVE</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
                {/* Question area */}
                <div>
                    <div style={{
                        padding: '40px', marginBottom: '20px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>Challenge Prompt</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.4, marginBottom: '32px', letterSpacing: '-0.5px' }}>{question.text}</div>

                        {/* Options */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {question.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => !submitted && setSelected(i)}
                                    style={{
                                        padding: '20px 24px', borderRadius: '16px', cursor: submitted ? 'default' : 'pointer',
                                        border: `2px solid ${selected === i
                                            ? submitted
                                                ? i === question.answer ? '#10b981' : '#ef4444'
                                                : '#000'
                                            : submitted && i === question.answer
                                                ? '#10b981'
                                                : 'rgba(0,0,0,0.05)'
                                            }`,
                                        background: selected === i
                                            ? submitted
                                                ? i === question.answer ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                                                : 'rgba(0,0,0,0.03)'
                                            : submitted && i === question.answer ? 'rgba(16,185,129,0.05)' : 'transparent',
                                        textAlign: 'left', fontSize: '16px', fontWeight: 700, color: '#000',
                                        transition: 'all 0.2s',
                                        display: 'flex', alignItems: 'center', gap: '14px', outline: 'none'
                                    }}
                                >
                                    <span style={{
                                        width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                                        background: 'rgba(0,0,0,0.04)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '14px', fontWeight: 900, color: '#000'
                                    }}>
                                        {['A', 'B', 'C', 'D'][i]}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {!submitted && (
                            <button
                                onClick={() => selected !== null && setSubmitted(true)}
                                style={{
                                    marginTop: '24px', width: '100%', padding: '16px',
                                    background: selected !== null ? '#000' : 'rgba(0,0,0,0.05)',
                                    color: selected !== null ? 'white' : 'rgba(0,0,0,0.3)',
                                    border: 'none', borderRadius: '16px',
                                    fontWeight: 900, fontSize: '15px', cursor: selected !== null ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s',
                                    boxShadow: selected !== null ? '0 8px 20px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                LOCK IN RESPONSE <Zap size={16} fill={selected !== null ? '#fff' : 'none'} style={{ display: 'inline', marginLeft: '8px' }} />
                            </button>
                        )}

                        {submitted && (
                            <div style={{
                                marginTop: '24px', padding: '20px', borderRadius: '16px',
                                background: selected === question.answer ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
                                border: `1px solid ${selected === question.answer ? '#10b981' : '#ef4444'}40`,
                                textAlign: 'center', fontWeight: 900, fontSize: '16px', color: selected === question.answer ? '#10b981' : '#ef4444'
                            }}>
                                {selected === question.answer ? 'EXCELLENT. +50 XP AWARDED' : 'INCORRECT. OPTION B WAS THE SOLUTION'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Scoreboard */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '24px', padding: '24px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '20px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Leaderboard</div>
                    {[...players].sort((a, b) => b.score - a.score).map((p, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px 16px', borderRadius: '16px', marginBottom: '8px',
                            background: p.isYou ? 'rgba(0,0,0,0.04)' : 'transparent',
                            border: p.isYou ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
                        }}>
                            <div style={{ fontSize: '16px', fontWeight: 900, color: i === 0 ? '#f59e0b' : 'rgba(0,0,0,0.2)', width: '24px' }}>
                                {i === 0 ? '👑' : `#${i + 1}`}
                            </div>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#000' }}>{p.avatar}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: 800 }}>{p.name} {p.isYou && '(You)'}</div>
                                <div style={{ fontSize: '11px', color: p.status === 'ready' ? '#10b981' : p.status === 'thinking' ? '#f97316' : 'rgba(0,0,0,0.3)', fontWeight: 700, textTransform: 'uppercase' }}>{p.status}</div>
                            </div>
                            <div style={{ fontWeight: 900, fontSize: '18px' }}>{p.score}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
