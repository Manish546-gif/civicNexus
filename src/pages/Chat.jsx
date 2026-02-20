import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Send, Hash, Users, Loader2 } from 'lucide-react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const channels = [
    { id: 'general', name: 'general', unread: 0 },
    { id: 'ai-tools', name: 'ai-tools', unread: 0 },
    { id: 'study-groups', name: 'study-groups', unread: 0 },
    { id: 'resources', name: 'resources', unread: 0 },
    { id: 'climate-action', name: 'climate-action', unread: 0 },
]

export default function Chat() {
    const { user } = useAuth()
    const socketRef = useRef()
    const [activeChannel, setActiveChannel] = useState('general')
    const [input, setInput] = useState('')
    const [chatMessages, setChatMessages] = useState([])
    const [members, setMembers] = useState([]) // All members
    const [activeMembers, setActiveMembers] = useState([]) // Members in current room
    const [loadingMembers, setLoadingMembers] = useState(true)
    const [unreadCounts, setUnreadCounts] = useState({})
    const chatEndRef = useRef(null)

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/members`)
                setMembers(res.data)
            } catch (err) {
                console.error('Failed to fetch members', err)
            } finally {
                setLoadingMembers(false)
            }
        }
        fetchMembers()

        socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
            transports: ['websocket'],
            forceNew: true
        })

        socketRef.current.on('connect', () => {
            console.log('[CHAT] Socket Connected:', socketRef.current.id);
            socketRef.current.emit('join_room', { roomId: activeChannel, user })
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('[CHAT] Connection Error:', err);
        });

        socketRef.current.on('room_users_update', (users) => {
            console.log('[CHAT] Room Users Update:', users);
            setActiveMembers(users);
        });

        socketRef.current.on('receive_message', (data) => {
            console.log('[CHAT] Received Message:', data);
            setChatMessages(prev => [...prev.slice(-49), data])
        })

        socketRef.current.on('new_message_notification', (data) => {
            if (data.roomId !== activeChannel && data.sender !== user?.name) {
                setUnreadCounts(prev => ({
                    ...prev,
                    [data.roomId]: (prev[data.roomId] || 0) + 1
                }));
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect()
        }
    }, [])

    const fetchHistory = async (roomId) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/history/${roomId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const formatted = res.data.map(m => ({
                user: m.sender,
                text: m.text,
                timestamp: m.timestamp
            }))
            setChatMessages(formatted)
        } catch (err) {
            console.error('[CHAT] Failed to fetch history', err)
        }
    }

    useEffect(() => {
        // Change room when channel changes
        if (socketRef.current) {
            socketRef.current.emit('join_room', { roomId: activeChannel, user })
            fetchHistory(activeChannel)
            // Clear unread for this channel
            setUnreadCounts(prev => ({ ...prev, [activeChannel]: 0 }));
        }
    }, [activeChannel])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages])

    const sendMessage = (e) => {
        if (e) e.preventDefault()
        if (!input.trim() || !user) return

        console.log('[CHAT] Sending Message:', { roomId: activeChannel, message: input, user: user.name });
        socketRef.current.emit('send_message', {
            roomId: activeChannel,
            message: input,
            user: user.name,
            timestamp: new Date().toISOString()
        })
        setInput('')
    }

    return (
        <div style={{
            display: 'flex', height: 'calc(100vh - 160px)', gap: '0',
            borderRadius: '24px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.06)',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
        }}>
            {/* Channel list */}
            <div style={{
                width: '240px', background: 'rgba(0,0,0,0.02)',
                borderRight: '1px solid rgba(0,0,0,0.06)',
                padding: '24px 12px', display: 'flex', flexDirection: 'column',
            }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', padding: '0 12px', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Discussion Channels
                </div>
                {channels.map(ch => (
                    <button
                        key={ch.id}
                        onClick={() => setActiveChannel(ch.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 14px', borderRadius: '12px', marginBottom: '4px',
                            cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left',
                            background: activeChannel === ch.id ? '#000' : 'transparent',
                            color: activeChannel === ch.id ? 'white' : 'rgba(0,0,0,0.5)',
                            fontSize: '14px', fontWeight: activeChannel === ch.id ? 700 : 500,
                            transition: 'all 0.15s',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Hash size={16} opacity={activeChannel === ch.id ? 1 : 0.5} /> {ch.name}
                        </span>
                        {unreadCounts[ch.id] > 0 && (
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '50%',
                                background: '#ef4444', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '10px', fontWeight: 900, boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                            }}>
                                {unreadCounts[ch.id]}
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Main chat area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    padding: '18px 24px',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Hash size={18} style={{ color: 'rgba(0,0,0,0.3)' }} />
                        <span style={{ fontWeight: 800, fontSize: '16px', color: '#000' }}>{activeChannel}</span>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {chatMessages.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: '40px', color: 'rgba(0,0,0,0.15)', fontSize: '13px', fontWeight: 700 }}>
                            NO DATA TRANSMISSIONS RECORDED IN #{activeChannel}.<br />BE THE FIRST TO SIGNAL.
                        </div>
                    )}
                    {chatMessages.map((msg, i) => (
                        <div key={i} style={{
                            display: 'flex', flexDirection: msg.user === user?.name ? 'row-reverse' : 'row',
                            gap: '12px',
                        }}>
                            <div style={{ maxWidth: '70%' }}>
                                {msg.user !== user?.name && (
                                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', marginBottom: '4px', paddingLeft: '4px', fontWeight: 700 }}>
                                        {msg.user} · {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                )}
                                <div style={{
                                    padding: '12px 16px',
                                    background: msg.user === user?.name ? '#000' : 'rgba(0,0,0,0.03)',
                                    color: msg.user === user?.name ? '#fff' : '#000',
                                    borderRadius: msg.user === user?.name ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                                    fontSize: '14px', lineHeight: 1.5,
                                    border: '1px solid rgba(0,0,0,0.04)',
                                    fontWeight: 500
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ padding: '24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <form onSubmit={sendMessage} style={{
                        display: 'flex', gap: '12px', alignItems: 'center',
                        background: 'rgba(0,0,0,0.03)',
                        borderRadius: '16px', padding: '12px 16px',
                    }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={`Message #${activeChannel}`}
                            style={{ flex: 1, background: 'none', border: 'none', color: '#000', fontSize: '15px', outline: 'none' }}
                        />
                        <button type="submit" style={{
                            padding: '10px 20px', borderRadius: '12px',
                            background: '#000', color: 'white',
                            border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '13px',
                        }}>
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Online members sidebar */}
            <div style={{
                width: '200px', background: 'rgba(0,0,0,0.01)',
                borderLeft: '1px solid rgba(0,0,0,0.06)',
                padding: '24px 16px',
                overflowY: 'auto'
            }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Citizens of Hub ({activeMembers.length})
                </div>
                {loadingMembers ? (
                    <Loader2 className="animate-spin" size={20} style={{ opacity: 0.2 }} />
                ) : (
                    activeMembers.map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff' }}>
                                {m.name[0]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.7)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                                <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800 }}>Lvl {Math.floor(m.xp / 500) + 1}</div>
                            </div>
                        </div>
                    ))
                )}
                {activeMembers.length === 0 && !loadingMembers && (
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: 700, textAlign: 'center', marginTop: '20px' }}>
                        NO SIGNAL DETECTED
                    </div>
                )}
            </div>
        </div>
    )
}
