import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Zap, Trophy, Crown, CheckCircle2, Loader2, Send } from 'lucide-react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'

const playersList = [
    { avatar: 'S', name: 'Sarah Kim', score: 3, status: 'ready', rank: 1 },
    { avatar: 'J', name: 'James Lee', score: 2, status: 'ready', rank: 2 },
    { avatar: 'P', name: 'Priya S.', score: 1, status: 'thinking', rank: 4 },
    { avatar: 'R', name: 'Ryan T.', score: 0, status: 'connected', rank: 5 },
]

export default function GameRoom() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, refreshUser } = useAuth()
    const socketRef = useRef()

    const [questions, setQuestions] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [timer, setTimer] = useState(15)
    const [gameOver, setGameOver] = useState(false)

    // Chat state
    const [messages, setMessages] = useState([])
    const [msgInput, setMsgInput] = useState('')
    // Presence state
    const [activePlayers, setActivePlayers] = useState([])
    const chatEndRef = useRef(null)

    // Map ID to category (for demo robustness)
    const getCategory = (id) => {
        const mapping = {
            '1': 'Algorithm/DSA',
            '2': 'Science',
            '3': 'Algorithm/DSA',
            '4': 'Geography',
            '5': 'Word Mastery',
            '6': 'Mixed'
        }
        return mapping[id] || 'Mixed'
    }

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/history/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const formatted = res.data.map(m => ({
                user: m.sender,
                text: m.text,
                timestamp: m.timestamp
            }))
            setMessages(formatted)
        } catch (err) {
            console.error('[GAME] Failed to fetch history', err)
        }
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/games/questions?category=${getCategory(id)}`)
                setQuestions(res.data)
            } catch (err) {
                console.error('Failed to fetch questions', err)
            } finally {
                setLoading(false)
            }
        }
        fetchQuestions()
        fetchHistory()

        // Socket setup
        socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
            transports: ['websocket'],
            forceNew: true
        })

        socketRef.current.on('connect', () => {
            console.log('[GAME] Socket Connected:', socketRef.current.id);
            socketRef.current.emit('join_room', { roomId: id, user })
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('[GAME] Connection Error:', err);
        });

        socketRef.current.on('room_users_update', (users) => {
            console.log('[GAME] Room Users Update:', users);
            setActivePlayers(users);
        });

        socketRef.current.on('receive_message', (data) => {
            console.log('[GAME] Received Message:', data);
            setMessages(prev => [...prev.slice(-19), data])
        })

        return () => socketRef.current.disconnect()
    }, [id])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        if (loading || gameOver || submitted) return

        if (timer > 0) {
            const t = setTimeout(() => setTimer(timer - 1), 1000)
            return () => clearTimeout(t)
        } else {
            handleNext()
        }
    }, [timer, loading, gameOver, submitted])

    const handleNext = async () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1)
            setSelected(null)
            setSubmitted(false)
            setTimer(15)
        } else {
            setGameOver(true)
            // Save XP
            const xpEarned = score * 10
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/games/complete`, { xpEarned })
                await refreshUser()
            } catch (err) {
                console.error('Failed to save XP', err)
            }
        }
    }

    const handleAnswer = (idx) => {
        if (submitted) return
        setSelected(idx)
    }

    const lockIn = () => {
        if (selected === null) return
        setSubmitted(true)
        if (selected === questions[currentIdx].answer) {
            setScore(score + 1)
        }
        setTimeout(handleNext, 2000)
    }

    const sendMsg = (e) => {
        e.preventDefault()
        if (!msgInput.trim()) return
        console.log('[GAME] Sending Message:', { roomId: id, message: msgInput, user: user.name });
        socketRef.current.emit('send_message', {
            roomId: id,
            message: msgInput,
            user: user.name,
            timestamp: new Date().toISOString()
        })
        setMsgInput('')
    }

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#000' }}>
            <Loader2 className="animate-spin" size={48} />
            <p style={{ marginTop: '16px', fontWeight: 800 }}>Establishing Uplink to Central Core...</p>
        </div>
    )

    if (gameOver) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#000' }}>
            <Trophy size={64} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>Mission Accomplished</h2>
            <p style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '32px' }}>
                You scored {score}/{questions.length} | Received {score * 10} XP
            </p>
            <button
                onClick={() => navigate('/games')}
                style={{ padding: '16px 32px', background: '#000', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer' }}
            >
                Return to Lobby
            </button>
        </div>
    )

    const q = questions[currentIdx]

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
                        <div style={{ fontWeight: 900, fontSize: '24px' }}>Round {currentIdx + 1} / {questions.length}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Strategic Timer</div>
                        <div style={{ fontWeight: 900, fontSize: '32px', color: timer <= 5 ? '#ef4444' : '#000' }}>
                            {timer}s
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Category</div>
                        <div style={{ fontWeight: 800, fontSize: '16px' }}>{q?.category}</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px 300px', gap: '24px' }}>
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
                        <div style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.4, marginBottom: '32px', letterSpacing: '-0.5px' }}>{q?.text}</div>

                        {/* Options */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {q?.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    style={{
                                        padding: '20px 24px', borderRadius: '16px', cursor: submitted ? 'default' : 'pointer',
                                        border: `2px solid ${selected === i
                                            ? submitted
                                                ? i === q.answer ? '#10b981' : '#ef4444'
                                                : '#000'
                                            : submitted && i === q.answer
                                                ? '#10b981'
                                                : 'rgba(0,0,0,0.05)'
                                            }`,
                                        background: selected === i
                                            ? submitted
                                                ? i === q.answer ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                                                : 'rgba(0,0,0,0.03)'
                                            : submitted && i === q.answer ? 'rgba(16,185,129,0.05)' : 'transparent',
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
                                onClick={lockIn}
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
                                background: selected === q.answer ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
                                border: `1px solid ${selected === q.answer ? '#10b981' : '#ef4444'}40`,
                                textAlign: 'center', fontWeight: 900, fontSize: '16px', color: selected === q.answer ? '#10b981' : '#ef4444'
                            }}>
                                {selected === q.answer ? 'EXCELLENT. +10 XP AWARDED' : `INCORRECT. THE SOLUTION WAS OPTION ${['A', 'B', 'C', 'D'][q.answer]}`}
                            </div>
                        )}
                    </div>
                </div>

                {/* Scoreboard and Profile */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '24px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '20px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Leaderboard ({activePlayers.length})</div>
                        {activePlayers.map((p, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 16px', borderRadius: '16px', marginBottom: '8px',
                                background: p.socketId === socketRef.current?.id ? 'rgba(0,0,0,0.04)' : 'transparent',
                                border: p.socketId === socketRef.current?.id ? '1px solid rgba(0,0,0,0.05)' : 'none',
                            }}>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: i === 0 ? '#f59e0b' : 'rgba(0,0,0,0.2)', width: '24px' }}>{i === 0 ? '👑' : `#${i + 1}`}</div>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#000' }}>
                                    {p.name?.[0]}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 800 }}>{p.name}</div>
                                    <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>Level {Math.floor((p.xp || 0) / 500) + 1}</div>
                                </div>
                                <div style={{ fontWeight: 900, fontSize: '18px' }}>{p.socketId === socketRef.current?.id ? score : 0}</div>
                            </div>
                        ))}
                        {activePlayers.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '20px', fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: 800 }}>
                                AWAITING ADDITIONAL SIGNAL SOURCES...
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Column */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '600px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ fontWeight: 900, fontSize: '13px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Lobby Uplink</div>
                    </div>

                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {messages.length === 0 && (
                            <div style={{ textAlign: 'center', marginTop: '40px', color: 'rgba(0,0,0,0.2)', fontSize: '12px', fontWeight: 700 }}>
                                SECURE CHANNEL ESTABLISHED.<br />WAITING FOR DATA TRANSMISSION...
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 900, color: m.user === user.name ? '#000' : 'rgba(0,0,0,0.4)' }}>
                                    {m.user} <span style={{ fontWeight: 500, opacity: 0.5 }}>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div style={{
                                    padding: '10px 14px', borderRadius: '12px',
                                    background: m.user === user.name ? '#000' : 'rgba(0,0,0,0.04)',
                                    color: m.user === user.name ? 'white' : '#000',
                                    fontSize: '13px', fontWeight: 600, width: 'fit-content', maxWidth: '85%'
                                }}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={sendMsg} style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: '8px' }}>
                        <input
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)',
                                outline: 'none', fontSize: '13px', fontWeight: 600, background: 'rgba(0,0,0,0.02)'
                            }}
                        />
                        <button type="submit" style={{
                            width: '40px', height: '40px', borderRadius: '12px', background: '#000', color: 'white',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}>
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
