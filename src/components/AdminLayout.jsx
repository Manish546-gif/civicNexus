import { Outlet, useNavigate, Link } from 'react-router-dom'
import {
    Terminal, ShieldAlert, Cpu, Activity,
    Wifi, Power, ArrowLeft, Maximize2
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

export default function AdminLayout() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!user || user.role !== 'admin') {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#ef4444' }}>
                <ShieldAlert size={48} />
                <div style={{ marginLeft: '20px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 900 }}>ACCESS DENIED</h1>
                    <p style={{ opacity: 0.6 }}>Insufficient security clearance for Terminal access.</p>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: 'Inter, monospace' }}>
            {/* High-Tech Top Bar */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                height: '72px', padding: '0 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: scrolled ? 'rgba(5,5,5,0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
                transition: 'all 0.3s'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link to="/dashboard" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                        fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}>
                        <ArrowLeft size={16} /> Exit Terminal
                    </Link>
                    <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', background: '#facc15',
                            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(250,204,21,0.2)'
                        }}>
                            <Terminal size={22} color="black" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '-0.5px' }}>ADMIN CENTRAL v4.0</div>
                            <div style={{ fontSize: '10px', color: '#facc15', fontWeight: 900, letterSpacing: '0.2em' }}>SECURE ACCESS PROTOCOL</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {[
                            { icon: Cpu, label: 'System' },
                            { icon: Activity, label: 'Logs' },
                            { icon: Wifi, label: 'Network' }
                        ].map(item => (
                            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 800 }}>
                                <item.icon size={14} /> {item.label}
                            </div>
                        ))}
                    </div>
                    <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', fontWeight: 800 }}>{user.name}</div>
                            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 900 }}>LEVEL 9 ADMIN</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="admin" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{ padding: '104px 32px 48px' }}>
                <Outlet />
            </main>

            {/* Matrix-like footer bits */}
            <div style={{
                position: 'fixed', bottom: '24px', right: '32px',
                fontSize: '10px', color: 'rgba(255,255,255,0.2)',
                fontFamily: 'monospace', pointerEvents: 'none',
                display: 'flex', gap: '20px'
            }}>
                <span>LATENCY: 12ms</span>
                <span>STATUS: STABLE</span>
                <span>ENCRYPTION: AES-256</span>
            </div>
        </div>
    )
}
