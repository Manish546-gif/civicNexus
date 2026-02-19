import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Send, Hash, Users } from 'lucide-react'

const channels = [
    { id: 1, name: 'general', unread: 3 },
    { id: 2, name: 'ai-tools', unread: 0 },
    { id: 3, name: 'study-groups', unread: 12 },
    { id: 4, name: 'resources', unread: 0 },
    { id: 5, name: 'climate-action', unread: 7 },
]

const messages = [
    { id: 1, avatar: 'S', name: 'Sarah Kim', text: 'Hey everyone! Has anyone tried the new GPT-based tutor for coding challenges?', time: '10:32 AM', own: false },
    { id: 2, avatar: 'J', name: 'James L.', text: 'Yes! It\'s amazing for breaking down DSA concepts. Way better than static docs.', time: '10:34 AM', own: false },
    { id: 3, avatar: 'A', name: 'You', text: 'Just tried it on the Binary Tree challenge — got through it in 20 minutes!', time: '10:36 AM', own: true },
    { id: 4, avatar: 'P', name: 'Priya S.', text: 'Which challenge? Linking the thread now 👇', time: '10:37 AM', own: false },
    { id: 5, avatar: 'A', name: 'You', text: 'It was today\'s Coding Challenge #47 — check /challenges', time: '10:38 AM', own: true },
    { id: 6, avatar: 'R', name: 'Ryan T.', text: 'Just joined chat. What are we discussing? The daily coding challenge?', time: '10:40 AM', own: false },
    { id: 7, avatar: 'M', name: 'Maya P.', text: 'Also, don\'t forget the Climate Hackers game night tonight at 8 PM!', time: '10:42 AM', own: false },
    { id: 8, avatar: 'S', name: 'Sarah Kim', text: '🔥 Let\'s go! I\'ll set up the game server. Code will be in #study-groups', time: '10:43 AM', own: false },
]

const onlineMembers = [
    { avatar: 'S', name: 'Sarah Kim', status: 'online' },
    { avatar: 'J', name: 'James L.', status: 'online' },
    { avatar: 'P', name: 'Priya S.', status: 'online' },
    { avatar: 'R', name: 'Ryan T.', status: 'away' },
    { avatar: 'M', name: 'Maya P.', status: 'online' },
    { avatar: 'T', name: 'Tom C.', status: 'away' },
]

export default function Chat() {
    const [activeChannel, setActiveChannel] = useState(1)
    const [input, setInput] = useState('')
    const [chatMessages, setChatMessages] = useState(messages)

    const sendMessage = () => {
        if (!input.trim()) return
        setChatMessages([...chatMessages, {
            id: Date.now(), avatar: 'A', name: 'You',
            text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), own: true,
        }])
        setInput('')
    }

    const activeChannelName = channels.find(c => c.id === activeChannel)?.name || 'general'

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
                        {ch.unread > 0 && (
                            <span style={{
                                background: activeChannel === ch.id ? 'white' : '#000',
                                color: activeChannel === ch.id ? '#000' : '#fff',
                                fontSize: '10px',
                                fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                            }}>{ch.unread}</span>
                        )}
                    </button>
                ))}
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', padding: '24px 12px 12px', marginTop: '12px', borderTop: '1px solid rgba(0,0,0,0.04)', textTransform: 'uppercase' }}>
                    Private Messages
                </div>
                {onlineMembers.slice(0, 4).map((m, i) => (
                    <button key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', borderRadius: '12px', marginBottom: '2px',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: 'rgba(0,0,0,0.5)', fontSize: '13px', fontWeight: 600
                    }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#000' }}>{m.avatar}</div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: m.status === 'online' ? '#10b981' : '#94a3b8', border: '2px solid #fff' }} />
                        </div>
                        {m.name.split(' ')[0]}
                    </button>
                ))}
            </div>

            {/* Main chat area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Channel header */}
                <div style={{
                    padding: '18px 24px',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Hash size={18} style={{ color: 'rgba(0,0,0,0.3)' }} />
                        <span style={{ fontWeight: 800, fontSize: '16px', color: '#000' }}>{activeChannelName}</span>
                        <span style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.08)', margin: '0 8px' }} />
                        <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>EduTech Alliance</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                            {onlineMembers.filter(m => m.status === 'online').length} EXPLORERS
                        </div>
                        <Users size={18} style={{ color: 'rgba(0,0,0,0.3)' }} />
                    </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {chatMessages.map((msg, i) => (
                        <div key={msg.id} style={{
                            display: 'flex', flexDirection: msg.own ? 'row-reverse' : 'row',
                            gap: '12px',
                        }}>
                            {!msg.own && (
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.04)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px', fontWeight: 900, flexShrink: 0, alignSelf: 'flex-end',
                                    color: '#000'
                                }}>{msg.avatar}</div>
                            )}
                            <div style={{ maxWidth: '70%' }}>
                                {!msg.own && (
                                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', marginBottom: '4px', paddingLeft: '4px', fontWeight: 700 }}>
                                        {msg.name} · {msg.time}
                                    </div>
                                )}
                                <div style={{
                                    padding: '12px 16px',
                                    background: msg.own ? '#000' : 'rgba(0,0,0,0.03)',
                                    color: msg.own ? '#fff' : '#000',
                                    borderRadius: msg.own ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                                    fontSize: '14px', lineHeight: 1.5,
                                    border: '1px solid rgba(0,0,0,0.04)',
                                    fontWeight: 500
                                }}>
                                    {msg.text}
                                </div>
                                {msg.own && (
                                    <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', marginTop: '4px', textAlign: 'right', fontWeight: 700 }}>
                                        {msg.time}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input area */}
                <div style={{
                    padding: '24px',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                }}>
                    <div style={{
                        display: 'flex', gap: '12px', alignItems: 'center',
                        background: 'rgba(0,0,0,0.03)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '16px', padding: '12px 16px',
                    }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder={`Message #${activeChannelName}`}
                            style={{ flex: 1, background: 'none', border: 'none', color: '#000', fontSize: '15px', outline: 'none' }}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                padding: '10px 20px', borderRadius: '12px',
                                background: '#000', color: 'white',
                                border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '13px',
                                display: 'flex', alignItems: 'center', gap: '8px',
                            }}
                        >
                            <Send size={15} /> Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Online members sidebar */}
            <div style={{
                width: '200px', background: 'rgba(0,0,0,0.01)',
                borderLeft: '1px solid rgba(0,0,0,0.06)',
                padding: '24px 16px',
            }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '16px', textTransform: 'uppercase' }}>
                    Explorers — {onlineMembers.length}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', marginBottom: '12px', fontWeight: 700 }}>
                    ONLINE NOW
                </div>
                {onlineMembers.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: 'rgba(0,0,0,0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '12px', fontWeight: 900, color: '#000'
                            }}>{m.avatar}</div>
                            <div style={{
                                position: 'absolute', bottom: 0, right: 0,
                                width: '9px', height: '9px', borderRadius: '50%',
                                background: m.status === 'online' ? '#10b981' : '#94a3b8',
                                border: '2px solid #fff',
                            }} />
                        </div>
                        <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)', fontWeight: 600 }}>{m.name.split(' ')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
