import { Link } from 'react-router-dom'
import { Globe, Zap, Users, Trophy, MessageCircle, Star, ArrowRight, Flame, Shield, BarChart3 } from 'lucide-react'

const stats = [
    { label: 'Active Members', value: '48K+' },
    { label: 'Communities', value: '2,300+' },
    { label: 'Challenges Solved', value: '1.2M' },
    { label: 'Countries Reached', value: '94' },
]

const features = [
    {
        icon: Users,
        title: 'Smart Communities',
        desc: 'Join or create communities around Education, Civic issues, or Environmental causes. Collaborate and grow together.',
    },
    {
        icon: Zap,
        title: 'Daily Challenges',
        desc: 'Code and knowledge challenges evaluated automatically. Earn XP, climb rankings, and push your limits daily.',
    },
    {
        icon: MessageCircle,
        title: 'Real-Time Chat',
        desc: 'Live communication via WebSocket-powered channels · Discussion threads · Instant community updates.',
    },
    {
        icon: Trophy,
        title: 'Competitive Games',
        desc: 'Host private game servers or join via unique code. Collaborate and compete with community members.',
    },
    {
        icon: Flame,
        title: 'Gamification',
        desc: 'XP points, badge systems, streak tracking, and engagement scores reward every contribution you make.',
    },
    {
        icon: BarChart3,
        title: 'Impact Analytics',
        desc: 'Detailed dashboards showing collaboration metrics, activity frequency, and community health scores.',
    },
]

const categories = [
    { emoji: '🎓', label: 'Education', count: '890 communities' },
    { emoji: '🏛️', label: 'Civic Engagement', count: '640 communities' },
    { emoji: '🌱', label: 'Environmental', count: '520 communities' },
    { emoji: '💻', label: 'Technology', count: '1,200 communities' },
]

export default function Landing() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
            {/* Navbar */}
            <nav style={{
                display: 'flex', alignItems: 'center',
                padding: '18px 40px',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                position: 'sticky', top: 0, zIndex: 100,
                backdropFilter: 'blur(24px)',
                background: 'rgba(255,255,255,0.8)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'black', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Globe size={18} color="white" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.8px' }}>CivicNexus</span>
                </div>
                <div style={{ display: 'flex', gap: '32px', marginRight: '32px' }}>
                    {['Features', 'Communities', 'Challenges', 'Leaderboard'].map(item => (
                        <a key={item} href="#" style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 700 }}
                            onMouseEnter={e => e.target.style.color = 'black'}
                            onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.4)'}
                        >{item}</a>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/login" style={{
                        padding: '10px 20px', borderRadius: '12px',
                        color: 'black', textDecoration: 'none', fontSize: '14px', fontWeight: 800,
                    }}>Sign In</Link>
                    <Link to="/register" style={{
                        padding: '10px 24px', borderRadius: '12px',
                        background: 'black', color: 'white',
                        textDecoration: 'none', fontSize: '14px', fontWeight: 800,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>Get Started</Link>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ padding: '120px 40px 100px', textAlign: 'center', position: 'relative' }}>
                {/* Visual decoration */}
                <div style={{
                    position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
                    width: '800px', height: '600px',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0
                }} />

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '99px', padding: '6px 16px',
                    fontSize: '12px', fontWeight: 800, marginBottom: '32px',
                    color: 'rgba(0,0,0,0.5)', position: 'relative'
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px rgba(16,185,129,0.4)' }} />
                    48,294 EXPLORERS ACTIVE IN 2026
                </div>

                <h1 style={{
                    fontSize: 'clamp(48px, 8vw, 96px)',
                    fontWeight: 950,
                    lineHeight: 0.95,
                    letterSpacing: '-5px',
                    marginBottom: '32px',
                    color: '#000',
                    position: 'relative'
                }}>
                    Impact Begins<br />
                    <span style={{ color: 'rgba(0,0,0,0.2)' }}>With Insight.</span>
                </h1>

                <p style={{
                    fontSize: '20px', color: 'rgba(0,0,0,0.5)',
                    maxWidth: '640px', margin: '0 auto 48px',
                    lineHeight: 1.6, fontWeight: 500,
                    position: 'relative'
                }}>
                    A high-performance gamified ecosystem for collective growth. Join specialized hubs,
                    solve mission-critical challenges, and compete in real-time environments.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '100px', position: 'relative' }}>
                    <Link to="/register" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '18px 40px', borderRadius: '16px',
                        background: 'black', color: 'white',
                        textDecoration: 'none', fontWeight: 900, fontSize: '16px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                        Join the Network <ArrowRight size={18} />
                    </Link>
                    <Link to="/dashboard" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '18px 40px', borderRadius: '16px',
                        background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)',
                        color: 'black', textDecoration: 'none', fontWeight: 800, fontSize: '16px',
                    }}>
                        Explore Sandbox
                    </Link>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1px', background: 'rgba(0,0,0,0.06)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '24px', overflow: 'hidden',
                    maxWidth: '800px', margin: '0 auto',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    {stats.map(s => (
                        <div key={s.label} style={{
                            padding: '32px 24px', background: 'white',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 950, marginBottom: '4px', letterSpacing: '-1px' }}>{s.value}</div>
                            <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)', marginBottom: '12px', textTransform: 'uppercase' }}>
                            CORE TAXONOMY
                        </h2>
                        <h3 style={{ fontSize: '36px', fontWeight: 950, letterSpacing: '-1.5px' }}>Hub Specializations</h3>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {categories.map(cat => (
                        <div key={cat.label} style={{
                            padding: '32px',
                            background: 'white',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)'
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)'
                                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.01)'
                                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cat.emoji}</div>
                            <div style={{ fontWeight: 900, fontSize: '18px', marginBottom: '8px' }}>{cat.label}</div>
                            <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>{cat.count}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '48px', fontWeight: 950, letterSpacing: '-2px', marginBottom: '16px' }}>
                        Architected for <span style={{ color: 'rgba(0,0,0,0.2)' }}>Scale.</span>
                    </h2>
                    <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.4)', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
                        Sophisticated tools for engagement, collaboration, and performance monitoring.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {features.map(f => (
                        <div key={f.title} style={{
                            padding: '40px',
                            background: 'rgba(0,0,0,0.02)',
                            borderRadius: '32px',
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.03)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.02)'
                            }}
                        >
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                background: '#000',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '24px',
                                color: '#fff'
                            }}>
                                <f.icon size={22} strokeWidth={2.5} />
                            </div>
                            <div style={{ fontWeight: 900, fontSize: '20px', marginBottom: '12px' }}>{f.title}</div>
                            <div style={{ fontSize: '15px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, fontWeight: 500 }}>{f.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 40px', textAlign: 'center' }}>
                <div style={{
                    maxWidth: '800px', margin: '0 auto',
                    padding: '80px 60px',
                    background: 'black',
                    borderRadius: '40px',
                    color: 'white',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '24px' }}>🛡️</div>
                    <h2 style={{ fontSize: '40px', fontWeight: 950, letterSpacing: '-2px', marginBottom: '16px' }}>
                        Secure Your Legacy.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.6, fontWeight: 500 }}>
                        Join a global network of changemakers. Early access slots are opening daily.
                    </p>
                    <Link to="/register" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '20px 48px', borderRadius: '20px',
                        background: 'white', color: 'black',
                        textDecoration: 'none', fontWeight: 950, fontSize: '18px',
                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Initialize Onboarding <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(0,0,0,0.06)',
                padding: '40px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                color: 'rgba(0,0,0,0.4)', fontSize: '14px', fontWeight: 700
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', background: 'black', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Globe size={12} color="white" />
                    </div>
                    <span>CIVICNEXUS NODE v1.0.4 — © 2026</span>
                </div>
                <div style={{ display: 'flex', gap: '32px' }}>
                    {['Manifesto', 'Protocol', 'Infrastructure', 'Secure Edge'].map(l => (
                        <a key={l} href="#" style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
            </footer>
        </div>
    )
}
