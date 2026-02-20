import { useState, useEffect } from 'react'
import {
    Users, ShieldAlert, FilePlus, BarChart3,
    UserX, CheckCircle2, AlertTriangle, Trash2,
    Plus, Filter, MoreVertical, Ban, RefreshCw, Activity, ShieldCheck
} from 'lucide-react'
import Analytics from './Analytics'
import axios from 'axios'
import Skeleton from '../components/Skeleton'

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('Overview')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const tabs = ['Overview', 'User Management', 'Challenges', 'Communities', 'System logs']

    const fetchData = async () => {
        setLoading(true)
        setError('')
        try {
            const usersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`)
            setUsers(usersRes.data)
        } catch (err) {
            setError('System Uplink Interrupted: Operating in Simulation Mode.')
            setUsers([
                { id: 1, name: 'User One', email: 'user1@example.com', role: 'user', xp: 0, isBlocked: false },
                { id: 2, name: 'User Two', email: 'user2@example.com', role: 'user', xp: 120, isBlocked: false },
                { id: 3, name: 'User Three', email: 'user3@example.com', role: 'user', xp: 450, isBlocked: true },
                { id: 4, name: 'User Four', email: 'user4@example.com', role: 'user', xp: 10, isBlocked: false },
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const toggleBlock = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}/block`)
            fetchData()
        } catch (err) {
            setUsers(users.map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u))
        }
    }

    return (
        <div style={{ paddingBottom: '60px', color: '#000' }}>
            {/* Admin Header */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#000', letterSpacing: '-1.5px', margin: 0 }}>
                            Command Center
                        </h2>
                        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>
                            Master Administrative Override · Node Status: <span style={{ color: '#10b981' }}>Operational</span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={fetchData}
                            style={{
                                padding: '12px 24px', borderRadius: '14px', background: 'rgba(0,0,0,0.04)',
                                border: '1px solid rgba(0,0,0,0.02)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                fontSize: '14px', fontWeight: 900, color: '#000'
                            }}
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Sync Node
                        </button>
                        <button style={{
                            padding: '12px 24px', borderRadius: '14px', background: '#000',
                            border: 'none', color: '#fff', fontSize: '14px', fontWeight: 900,
                            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                        }}>
                            <ShieldCheck size={16} /> Protocol Audit
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '8px', padding: '6px', background: 'rgba(0,0,0,0.03)', borderRadius: '18px', width: 'fit-content' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '10px 24px', borderRadius: '14px',
                                border: 'none', background: activeTab === tab ? '#fff' : 'transparent',
                                color: activeTab === tab ? '#000' : 'rgba(0,0,0,0.4)',
                                fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                boxShadow: activeTab === tab ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div style={{
                    padding: '16px 20px', borderRadius: '16px', background: 'rgba(249, 115, 22, 0.05)',
                    border: '1px solid rgba(249, 115, 22, 0.1)', color: '#f97316',
                    fontSize: '14px', fontWeight: 700, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            {activeTab === 'Overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {loading ? (
                            <>
                                <Skeleton.Base className="h-40 rounded-[28px]" />
                                <Skeleton.Base className="h-40 rounded-[28px]" />
                                <Skeleton.Base className="h-40 rounded-[28px]" />
                                <Skeleton.Base className="h-40 rounded-[28px]" />
                            </>
                        ) : (
                            [
                                { label: 'Network Reach', value: (users.length * 128).toLocaleString(), highlight: '+12.4%', icon: Users },
                                { label: 'Active Hubs', value: '42', highlight: 'Stable', icon: Activity },
                                { label: 'Collective Score', value: '84.2', highlight: 'Premium', icon: BarChart3 },
                                { label: 'Uptime Protocol', value: '99.9%', highlight: 'Active', icon: ShieldCheck },
                            ].map(stat => (
                                <div key={stat.label} style={{
                                    padding: '32px 24px', borderRadius: '28px', background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(20px)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)',
                                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <stat.icon size={20} color="#000" strokeWidth={2.5} />
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 900, background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '8px' }}>
                                            {stat.highlight}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '36px', fontWeight: 950, color: '#000', marginBottom: '4px', letterSpacing: '-1.5px' }}>{stat.value}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Extended Analytics View */}
                    <div style={{
                        padding: '40px', borderRadius: '32px', background: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(32px)',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <div>
                                <h3 style={{ fontWeight: 950, fontSize: '22px', margin: 0, letterSpacing: '-0.5px' }}>Global Infrastructure Metrics</h3>
                                <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>Real-time telemetry stream synchronized across all nodes</p>
                            </div>
                            <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px rgba(16,185,129,0.5)' }} />
                                LIVE FEED
                            </div>
                        </div>
                        {loading ? <Skeleton.Base className="h-[400px] w-full rounded-2xl" /> : <Analytics />}
                    </div>
                </div>
            )}

            {activeTab === 'User Management' && (
                <div style={{
                    padding: '32px', borderRadius: '28px', background: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.03)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontWeight: 950, fontSize: '22px', margin: 0, letterSpacing: '-0.5px' }}>Registry Override</h3>
                            <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>Managing identity permissions and authentication tiers</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ padding: '12px 20px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)', background: '#fff', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Filter size={16} /> Filter Registry</button>
                            <button style={{ padding: '12px 24px', borderRadius: '14px', border: 'none', background: '#000', color: '#fff', fontSize: '14px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}><Plus size={16} /> New Identity</button>
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: '800px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Explorer Identity</th>
                                    <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Protocol Status</th>
                                    <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Tier Role</th>
                                    <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Resonance (XP)</th>
                                    <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right' }}>Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan="5" style={{ padding: '8px 0' }}>
                                                <Skeleton.Base className="h-16 w-full rounded-xl" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    users.map(u => (
                                        <tr key={u.id || u._id} style={{
                                            background: 'rgba(0,0,0,0.015)',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'white'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.015)'}
                                        >
                                            <td style={{ padding: '20px', borderRadius: '16px 0 0 16px', border: '1px solid rgba(0,0,0,0.02)', borderRight: 'none' }}>
                                                <div style={{ fontWeight: 900, fontSize: '15px', color: '#000' }}>{u.name}</div>
                                                <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>{u.email.toUpperCase()}</div>
                                            </td>
                                            <td style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                                                <span style={{
                                                    padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 950,
                                                    background: !u.isBlocked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: !u.isBlocked ? '#10b981' : '#ef4444',
                                                    textTransform: 'uppercase', letterSpacing: '0.05em'
                                                }}>{!u.isBlocked ? 'AUTHORIZED' : 'ACCESS REVOKED'}</span>
                                            </td>
                                            <td style={{ padding: '20px', fontSize: '13px', fontWeight: 900, color: 'rgba(0,0,0,0.6)', borderTop: '1px solid rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                                                {u.role.toUpperCase()}
                                            </td>
                                            <td style={{ padding: '20px', fontWeight: 950, fontSize: '16px', borderTop: '1px solid rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                                                {u.xp.toLocaleString()}
                                            </td>
                                            <td style={{ padding: '20px', textAlign: 'right', borderRadius: '0 16px 16px 0', border: '1px solid rgba(0,0,0,0.02)', borderLeft: 'none' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => toggleBlock(u.id || u._id)}
                                                        style={{
                                                            width: '40px', height: '40px', borderRadius: '12px',
                                                            background: 'white', border: '1px solid rgba(0,0,0,0.05)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            cursor: 'pointer', transition: 'all 0.2s',
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                                        }}
                                                        title={u.isBlocked ? 'Authorize Access' : 'Revoke Access'}
                                                    >
                                                        <Ban size={18} color={u.isBlocked ? '#10b981' : '#ef4444'} />
                                                    </button>
                                                    <button style={{
                                                        width: '40px', height: '40px', borderRadius: '12px',
                                                        background: 'white', border: '1px solid rgba(0,0,0,0.05)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                                    }} title="Purge Record"><Trash2 size={18} color="rgba(0,0,0,0.3)" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
