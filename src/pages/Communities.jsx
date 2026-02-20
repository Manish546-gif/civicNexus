import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Users, Flame, Filter } from 'lucide-react'
import axios from 'axios'

const categories = ['All', 'Education', 'Environmental', 'Civic']

export default function Communities() {
    const [allCommunities, setAllCommunities] = useState([])
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chat/communities`)
                setAllCommunities(res.data)
            } catch (err) {
                console.error('Failed to load communities')
            } finally {
                setLoading(false)
            }
        }
        fetchCommunities()
    }, [])

    const filtered = allCommunities.filter(c => {
        const matchCat = activeCategory === 'All' || c.category === activeCategory
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            (c.description || '').toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch
    })

    return (
        <div style={{ color: '#000' }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '4px', color: '#000' }}>Explore Communities</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                        Discover {allCommunities.length} communities · Join the conversation
                    </p>
                </div>
                <Link to="/communities/create" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 20px', borderRadius: '12px',
                    background: '#000', color: 'white',
                    textDecoration: 'none', fontWeight: 800, fontSize: '13px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Plus size={16} /> Create Community
                </Link>
            </div>

            {/* Search + Filter */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '12px', padding: '12px 16px', flex: 1,
                }}>
                    <Search size={16} style={{ color: 'rgba(0,0,0,0.3)' }} />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search communities by name or focus..."
                        style={{ background: 'none', border: 'none', color: '#000', fontSize: '14px', width: '100%', outline: 'none' }}
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', alignItems: 'center' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                            cursor: 'pointer', border: 'none',
                            background: activeCategory === cat ? '#000' : 'rgba(0,0,0,0.04)',
                            color: activeCategory === cat ? '#fff' : 'rgba(0,0,0,0.5)',
                            transition: 'all 0.2s',
                        }}
                    >{cat}</button>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: 700 }}>
                    {filtered.length} RESULTS FOUND
                </span>
            </div>

            {/* Community Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(0,0,0,0.3)', fontWeight: 700 }}>SYNCHRONIZING WITH HUB DATA...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {filtered.map(c => (
                        <Link key={c._id} to={`/communities/${c._id}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <div style={{
                                padding: '24px',
                                background: 'rgba(255,255,255,0.7)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                borderRadius: '20px', cursor: 'pointer',
                                transition: 'all 0.25s',
                                height: '100%',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#fff'
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.7)'
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                                    <span style={{ fontSize: '40px', lineHeight: 1 }}>{c.emoji}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '16px', color: '#000' }}>{c.name}</div>
                                                <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.category}</div>
                                            </div>
                                            <span style={{
                                                fontSize: '10px', padding: '4px 8px', borderRadius: '6px', fontWeight: 800,
                                                background: c.activityLevel === 'High' ? 'rgba(16,185,129,0.1)' : 'rgba(0,0,0,0.05)',
                                                color: c.activityLevel === 'High' ? '#10b981' : 'rgba(0,0,0,0.5)',
                                                flexShrink: 0, textTransform: 'uppercase'
                                            }}>
                                                {c.activityLevel === 'High' && '🔥 '}{c.activityLevel} Activity
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 500 }}>{c.description}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {(c.tags || []).map(tag => (
                                                    <span key={tag} style={{
                                                        fontSize: '10px', padding: '3px 8px', borderRadius: '6px', fontWeight: 700,
                                                        background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.5)',
                                                    }}>{tag}</span>
                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#000', fontWeight: 800 }}>
                                                <Users size={14} /> {(c.membersCount || 0).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
