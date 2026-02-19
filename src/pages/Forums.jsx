import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Plus, ThumbsUp, Eye, Search, Filter } from 'lucide-react'

const threads = [
    { id: 1, emoji: '🎓', title: 'Best resources for learning competitive programming in 2026?', author: 'Sarah Kim', avatar: 'S', community: 'EduTech Alliance', replies: 34, views: 892, likes: 127, time: '2h ago', pinned: true, tags: ['DSA', 'Resources'] },
    { id: 2, emoji: '🌱', title: 'How can tech communities contribute to carbon neutrality goals?', author: 'Maya Patel', avatar: 'M', community: 'Climate Hackers', replies: 22, views: 540, likes: 89, time: '4h ago', pinned: false, tags: ['Climate', 'Tech'] },
    { id: 3, emoji: '🏛️', title: 'Digital voting: opportunities and risks for civic participation', author: 'Raj Singh', avatar: 'R', community: 'Civic Leaders Hub', replies: 45, views: 1210, likes: 203, time: '6h ago', pinned: true, tags: ['Civic', 'Democracy'] },
    { id: 4, emoji: '💻', title: 'Share your most elegant algorithm — community showcase thread', author: 'James Lee', avatar: 'J', community: 'CodeCraft Pro', replies: 67, views: 1890, likes: 312, time: '1d ago', pinned: false, tags: ['Algorithms', 'Showcase'] },
    { id: 5, emoji: '♻️', title: 'Zero-waste tech: how to dispose of electronics responsibly', author: 'Aisha Tanaka', avatar: 'A', community: 'Zero Waste Warriors', replies: 19, views: 430, likes: 74, time: '1d ago', pinned: false, tags: ['Waste', 'Environment'] },
    { id: 6, emoji: '📚', title: 'Open educational resources — master link compilation 2026', author: 'Priya Sharma', avatar: 'P', community: 'Open Knowledge', replies: 88, views: 2340, likes: 445, time: '2d ago', pinned: false, tags: ['OER', 'Education'] },
]

export default function Forums() {
    const [search, setSearch] = useState('')

    const filtered = threads.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.community.toLowerCase().includes(search.toLowerCase())
    )

    const pinned = filtered.filter(t => t.pinned)
    const regular = filtered.filter(t => !t.pinned)

    return (
        <div style={{ color: '#000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '6px' }}>Discussion Forums</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                        {threads.length} active threads · Engaging {threads.reduce((acc, t) => acc + t.replies, 0)} replies
                    </p>
                </div>
                <button style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px', borderRadius: '12px',
                    background: '#000', color: 'white',
                    border: 'none', fontWeight: 800, fontSize: '14px', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Plus size={18} /> New Discussion
                </button>
            </div>

            {/* Search */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '16px', padding: '14px 20px', marginBottom: '32px',
            }}>
                <Search size={18} style={{ color: 'rgba(0,0,0,0.3)' }} />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search for topics, communities or keywords..."
                    style={{ background: 'none', border: 'none', color: '#000', fontSize: '15px', width: '100%', outline: 'none' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Pinned */}
                {pinned.length > 0 && (
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '16px', textTransform: 'uppercase' }}>📌 Essential Reading</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {pinned.map(t => <ThreadRow key={t.id} thread={t} />)}
                        </div>
                    </div>
                )}

                {/* Regular */}
                <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '16px', textTransform: 'uppercase' }}>Recent Activity</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {regular.map(t => <ThreadRow key={t.id} thread={t} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ThreadRow({ thread }) {
    return (
        <Link to={`/forums/${thread.id}`} style={{ textDecoration: 'none', color: '#000' }}>
            <div style={{
                display: 'flex', gap: '20px', alignItems: 'center',
                padding: '24px',
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
                <span style={{ fontSize: '36px', lineHeight: 1 }}>{thread.emoji}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '8px', lineHeight: 1.4, color: '#000' }}>{thread.title}</div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', flexWrap: 'wrap', alignItems: 'center', fontWeight: 600 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: '#000' }}>{thread.avatar}</div>
                            {thread.author}
                        </span>
                        <span style={{ background: 'rgba(0,0,0,0.04)', padding: '3px 10px', borderRadius: '6px', color: '#000' }}>{thread.community}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {thread.tags.map(tag => <span key={tag} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)', padding: '2px 8px', borderRadius: '6px', color: 'rgba(0,0,0,0.4)', fontSize: '10px' }}>#{tag}</span>)}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexShrink: 0, fontSize: '13px', color: 'rgba(0,0,0,0.4)', alignItems: 'center', fontWeight: 700 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageCircle size={16} /> {thread.replies}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={16} /> {thread.views.toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ThumbsUp size={16} /> {thread.likes}</span>
                    <span style={{ minWidth: '60px', textAlign: 'right' }}>{thread.time}</span>
                </div>
            </div>
        </Link>
    )
}
