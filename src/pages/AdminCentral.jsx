import { useState, useEffect, useRef } from 'react'
import {
    Users, Activity, ShieldCheck, Zap,
    Search, Filter, MoreVertical, Ban,
    Trash2, RefreshCw, BarChart3, Globe,
    Cpu, MessageCircle, AlertTriangle
} from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Ring } from '@react-three/drei'
import { gsap } from 'gsap'
import axios from 'axios'
import { io } from 'socket.io-client'
import Analytics from './Analytics'

// ----------- Three.js Network Map component -----------
function GlobalConnectionSphere() {
    const ref = useRef()
    const count = 1000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 2
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)
    }

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
            ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#facc15"
                size={0.03}
                sizeAttenuation
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    )
}

// ----------- Main Admin Central -----------
export default function AdminCentral() {
    const [liveUsers, setLiveUsers] = useState(0)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('DASHBOARD')
    const [stats, setStats] = useState({ uptime: 0, memory: 0 })

    const containerRef = useRef(null)
    const socketRef = useRef(null)

    const sections = ['DASHBOARD', 'USER REGISTRY', 'ANALYTICS', 'SYSTEM NODE']

    const fetchData = async () => {
        setLoading(true)
        try {
            const [usersRes, statsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/users'),
                axios.get('http://localhost:5000/api/admin/system-stats')
            ])
            setUsers(usersRes.data)
            setStats(statsRes.data)
        } catch (err) {
            console.error('Terminal sync interrupted')
            // Fallback for demo
            setUsers([
                { _id: '1', name: 'Manish Kumar', email: 'mk@example.com', role: 'admin', xp: 4500, isBlocked: false },
                { _id: '2', name: 'Alex Thompson', email: 'alex@vault.io', role: 'user', xp: 820, isBlocked: false },
                { _id: '3', name: 'Sarah Miller', email: 'sarah@net.com', role: 'user', xp: 240, isBlocked: true },
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()

        socketRef.current = io('http://localhost:5000')
        socketRef.current.on('stats_update', (data) => {
            setLiveUsers(data.liveUsers)
        })

        const ctx = gsap.context(() => {
            gsap.from('.admin-card', {
                opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'expo.out'
            })
        }, containerRef)

        return () => {
            socketRef.current?.disconnect()
            ctx.revert()
        }
    }, [])

    const toggleBlock = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/api/admin/users/${id}/block`)
            fetchData()
        } catch (err) {
            setUsers(users.map(u => u._id === id ? { ...u, isBlocked: !u.isBlocked } : u))
        }
    }

    return (
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* High-Level Overview Section */}
            <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>

                {/* Visual Telemetry Card */}
                <div className="admin-card" style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '32px', padding: '40px',
                    position: 'relative', overflow: 'hidden', height: '400px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#facc15', marginBottom: '16px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#facc15', boxShadow: '0 0 12px #facc15' }} />
                            <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em' }}>NETWORK UPLINK ACTIVE</span>
                        </div>
                        <h1 style={{ fontSize: '56px', fontWeight: 950, letterSpacing: '-2px', lineHeight: 1, marginBottom: '20px' }}>
                            {liveUsers} Active Identites
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 600, lineHeight: 1.6 }}>
                            Monitoring global node synchronization and real-time explorer interaction across the ecosystem.
                        </p>
                    </div>

                    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '400px', pointerEvents: 'none' }}>
                        <Canvas camera={{ position: [0, 0, 5] }}>
                            <ambientLight intensity={0.5} />
                            <GlobalConnectionSphere />
                        </Canvas>
                    </div>
                </div>

                {/* System Diagnostics Grid */}
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '32px' }}>
                    <div className="admin-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '24px', padding: '32px',
                        display: 'flex', alignItems: 'center', gap: '24px'
                    }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Cpu size={32} color="#facc15" />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CPU Load Ticker</div>
                            <div style={{ fontSize: '28px', fontWeight: 950 }}>1.2% <span style={{ fontSize: '14px', color: '#10b981' }}>OPTIMAL</span></div>
                        </div>
                    </div>
                    <div className="admin-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '24px', padding: '32px',
                        display: 'flex', alignItems: 'center', gap: '24px'
                    }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity size={32} color="#facc15" />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Memory Allocation</div>
                            <div style={{ fontSize: '28px', fontWeight: 950 }}>{(stats.memory / 1024 / 1024).toFixed(1)}MB <span style={{ fontSize: '14px', color: '#facc15' }}>CACHED</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs (Admin Style) */}
            <div className="admin-card" style={{ display: 'flex', gap: '12px', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', width: 'fit-content' }}>
                {sections.map(s => (
                    <button
                        key={s}
                        onClick={() => setActiveSection(s)}
                        style={{
                            padding: '12px 32px', borderRadius: '16px', border: 'none',
                            background: activeSection === s ? '#facc15' : 'transparent',
                            color: activeSection === s ? '#000' : 'rgba(255,255,255,0.4)',
                            fontWeight: 900, fontSize: '12px', letterSpacing: '0.05em', cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Sections */}
            {activeSection === 'USER REGISTRY' && (
                <div className="admin-card" style={{
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '24px', padding: '32px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 900 }}>Identity Management Protocol</h3>
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} size={16} />
                            <input
                                placeholder="Search Protocol Identifiers..."
                                style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '14px', padding: '12px 16px 12px 42px', color: '#fff', fontSize: '14px', outline: 'none',
                                    width: '320px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em' }}>
                                    <th style={{ padding: '16px 20px' }}>IDENTIFIER</th>
                                    <th style={{ padding: '16px 20px' }}>PROTOCOL STATUS</th>
                                    <th style section={{ padding: '16px 20px' }}>CLEARANCE ROLE</th>
                                    <th style={{ padding: '16px 20px' }}>RESONANCE</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>COMMANDS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ background: 'rgba(255,255,255,0.01)', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '20px', borderRadius: '12px 0 0 12px' }}>
                                            <div style={{ fontWeight: 800 }}>{u.name}</div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{u.email}</div>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <span style={{
                                                fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px',
                                                background: u.isBlocked ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                                                color: u.isBlocked ? '#ef4444' : '#10b981',
                                                border: `1px solid ${u.isBlocked ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`
                                            }}>
                                                {u.isBlocked ? 'ACCESS NULLIFIED' : 'AUTHORIZED'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: '13px' }}>
                                            {u.role.toUpperCase()}
                                        </td>
                                        <td style={{ padding: '20px', fontWeight: 900, fontSize: '15px', color: '#facc15' }}>
                                            {u.xp} XP
                                        </td>
                                        <td style={{ padding: '20px', borderRadius: '0 12px 12px 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => toggleBlock(u._id)} style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', color: u.isBlocked ? '#10b981' : '#ef4444' }}>
                                                    <Ban size={18} />
                                                </button>
                                                <button style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeSection === 'DASHBOARD' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {[
                        { label: 'Network Uptime', value: (stats.uptime / 60).toFixed(0) + 'm', icon: ShieldCheck, trend: '+99.9%' },
                        { label: 'Active Channels', value: '18', icon: MessageCircle, trend: 'STABLE' },
                        { label: 'Total Resonance', value: users.reduce((acc, u) => acc + (u.xp || 0), 0), icon: Zap, trend: '+4.2%' },
                        { label: 'Alert Protocols', value: '0', icon: AlertTriangle, trend: 'NORMAL' },
                    ].map(card => (
                        <div key={card.label} className="admin-card" style={{
                            padding: '32px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '24px', position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <card.icon size={20} color="#facc15" />
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 900, color: '#10b981' }}>{card.trend}</div>
                            </div>
                            <div style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-1px' }}>{card.value}</div>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{card.label}</div>
                        </div>
                    ))}
                    <div className="admin-card" style={{ gridColumn: 'span 4' }}>
                        <Analytics />
                    </div>
                </div>
            )}

            {activeSection === 'ANALYTICS' && (
                <div className="admin-card" style={{ background: 'rgba(255,255,255,0.01)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Analytics />
                </div>
            )}

        </div>
    )
}
