import { useParams, Link } from 'react-router-dom'
import { Users, MessageCircle, Zap, Trophy, ArrowLeft, Plus, Flame, Globe } from 'lucide-react'

const communityData = {
    1: {
        emoji: '🎓', name: 'EduTech Alliance', category: 'Education',
        members: 1240, desc: 'A collaborative space for educators and students to innovate in digital learning using AI and modern tools.',
        banner: 'linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))',
        channels: ['#general', '#ai-tools', '#study-groups', '#resources', '#announcements'],
        topMembers: [
            { avatar: 'S', name: 'Sarah Kim', role: 'Admin', xp: 4200 },
            { avatar: 'J', name: 'James Lee', role: 'Moderator', xp: 3800 },
            { avatar: 'P', name: 'Priya S.', role: 'Member', xp: 2900 },
            { avatar: 'R', name: 'Ryan T.', role: 'Member', xp: 2100 },
        ],
        posts: [
            { avatar: 'S', user: 'Sarah Kim', title: 'Best AI tools for personalized learning in 2026', replies: 24, likes: 89, time: '2h ago' },
            { avatar: 'J', user: 'James Lee', title: 'Study group for data structures — join us this Friday', replies: 12, likes: 43, time: '5h ago' },
            { avatar: 'P', user: 'Priya S.', title: 'Free MIT OpenCourseWare resources thread', replies: 31, likes: 127, time: '1d ago' },
        ],
        stats: { challenges: 340, discussions: 1200, activeDays: 280, totalXP: '1.2M' }
    }
}

export default function CommunityDetail() {
    const { id } = useParams()
    const community = communityData[id] || communityData[1]

    return (
        <div style={{ color: '#000' }}>
            <Link to="/communities" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(0,0,0,0.4)', fontSize: '13px', textDecoration: 'none',
                marginBottom: '24px', fontWeight: 700
            }}>
                <ArrowLeft size={16} /> Back to Communities
            </Link>

            {/* Banner */}
            <div style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '24px', padding: '32px',
                marginBottom: '24px',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '64px' }}>{community.emoji}</span>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#000', letterSpacing: '-0.5px', marginBottom: '6px' }}>{community.name}</h2>
                        <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{community.category} Community</div>
                        <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', maxWidth: '600px', lineHeight: 1.6, fontWeight: 500 }}>{community.desc}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '32px' }}>
                    {[
                        { label: 'Members', value: community.members.toLocaleString(), icon: Users },
                        { label: 'Challenges', value: community.stats.challenges, icon: Zap },
                        { label: 'Discussions', value: community.stats.discussions, icon: MessageCircle },
                        { label: 'Total XP', value: community.stats.totalXP, icon: Trophy },
                    ].map(s => (
                        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <s.icon size={16} color="#000" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 900, fontSize: '16px' }}>{s.value}</div>
                                <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'absolute', top: '32px', right: '32px', display: 'flex', gap: '12px' }}>
                    <Link to="/chat" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 20px', borderRadius: '12px',
                        background: 'rgba(0,0,0,0.04)', color: '#000',
                        textDecoration: 'none', fontSize: '13px', fontWeight: 800,
                    }}>
                        <MessageCircle size={16} /> Open Chat
                    </Link>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 20px', borderRadius: '12px',
                        background: '#000', color: 'white',
                        border: 'none', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <Plus size={16} /> Join Community
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
                {/* Posts / Discussions */}
                <div style={{
                    padding: '24px', borderRadius: '24px', background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 900, fontSize: '18px', margin: 0 }}>Global Discussions</h3>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 18px', borderRadius: '10px',
                            background: '#000', color: 'white',
                            border: 'none', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                        }}>
                            <Plus size={14} /> Start Thread
                        </button>
                    </div>
                    {community.posts.map((post, i) => (
                        <Link key={i} to={`/forums/${i + 1}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <div style={{
                                padding: '20px', marginBottom: '12px',
                                background: 'rgba(255,255,255,0.8)',
                                border: '1px solid rgba(0,0,0,0.06)',
                                borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#fff'
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.8)'
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: 'rgba(0,0,0,0.04)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '15px', fontWeight: 900, flexShrink: 0,
                                    }}>{post.avatar}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>{post.title}</div>
                                        <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                                            <span>by <b>{post.user}</b></span>
                                            <span>💬 {post.replies} replies</span>
                                            <span>♥ {post.likes} likes</span>
                                            <span>{post.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Channels */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '24px', backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <h4 style={{ fontWeight: 800, fontSize: '12px', marginBottom: '16px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Community Channels</h4>
                        {community.channels.map(ch => (
                            <Link key={ch} to="/chat" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    padding: '10px 14px', borderRadius: '12px', fontSize: '14px',
                                    color: 'rgba(0,0,0,0.6)', cursor: 'pointer', transition: 'all 0.15s',
                                    marginBottom: '4px', fontWeight: 600
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#000' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(0,0,0,0.6)' }}
                                >{ch}</div>
                            </Link>
                        ))}
                    </div>

                    {/* Top Members */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '24px', padding: '24px', backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <h4 style={{ fontWeight: 800, fontSize: '12px', marginBottom: '16px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Leaderboard</h4>
                        {community.topMembers.map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.04)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px', fontWeight: 900,
                                }}>{m.avatar}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 800 }}>{m.name}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{m.role}</div>
                                </div>
                                <div style={{ fontSize: '12px', color: '#000', fontWeight: 900 }}>{m.xp.toLocaleString()} XP</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
