import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Users, Flame, Filter } from 'lucide-react'

const allCommunities = [
    { id: 1, emoji: '🎓', name: 'EduTech Alliance', category: 'Education', members: 1240, activity: 'High', desc: 'A collaborative space for educators and students to innovate in digital learning.', tags: ['AI', 'E-Learning', 'EdTech'] },
    { id: 2, emoji: '🌱', name: 'Climate Hackers', category: 'Environmental', members: 890, activity: 'High', desc: 'Building tech solutions to fight climate change and promote sustainability.', tags: ['Sustainability', 'GreenTech', 'Climate'] },
    { id: 3, emoji: '🏛️', name: 'Civic Leaders Hub', category: 'Civic', members: 640, activity: 'Med', desc: 'Organizing civic action, policy discussions, and community governance initiatives.', tags: ['Policy', 'Governance', 'Democracy'] },
    { id: 4, emoji: '💻', name: 'CodeCraft Pro', category: 'Education', members: 2100, activity: 'High', desc: 'Expert-level competitive programming and algorithm challenges community.', tags: ['DSA', 'Competitive', 'Coding'] },
    { id: 5, emoji: '♻️', name: 'Zero Waste Warriors', category: 'Environmental', members: 520, activity: 'Med', desc: 'Sharing tips and projects around zero-waste lifestyles and circular economy.', tags: ['ZeroWaste', 'Recycling'] },
    { id: 6, emoji: '🗳️', name: 'Youth Voices', category: 'Civic', members: 780, activity: 'High', desc: 'Empowering young people to participate in civic life and community decisions.', tags: ['Youth', 'Advocacy', 'Civic'] },
    { id: 7, emoji: '📚', name: 'Open Knowledge', category: 'Education', members: 1480, activity: 'High', desc: 'Sharing free educational resources across all subjects and skill levels.', tags: ['Open Source', 'Learning', 'Free'] },
    { id: 8, emoji: '🐾', name: 'Wildlife Defenders', category: 'Environmental', members: 360, activity: 'Low', desc: 'Conservation efforts and wildlife protection advocacy and research sharing.', tags: ['Wildlife', 'Conservation'] },
]

const categories = ['All', 'Education', 'Environmental', 'Civic']

export default function Communities() {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = allCommunities.filter(c => {
        const matchCat = activeCategory === 'All' || c.category === activeCategory
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase())
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {filtered.map(c => (
                    <Link key={c.id} to={`/communities/${c.id}`} style={{ textDecoration: 'none', color: '#000' }}>
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
                                            background: c.activity === 'High' ? 'rgba(16,185,129,0.1)' : 'rgba(0,0,0,0.05)',
                                            color: c.activity === 'High' ? '#10b981' : 'rgba(0,0,0,0.5)',
                                            flexShrink: 0, textTransform: 'uppercase'
                                        }}>
                                            {c.activity === 'High' && '🔥 '}{c.activity} Activity
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 500 }}>{c.desc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                            {c.tags.map(tag => (
                                                <span key={tag} style={{
                                                    fontSize: '10px', padding: '3px 8px', borderRadius: '6px', fontWeight: 700,
                                                    background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.5)',
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#000', fontWeight: 800 }}>
                                            <Users size={14} /> {c.members.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
