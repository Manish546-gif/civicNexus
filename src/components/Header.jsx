import { useLocation } from 'react-router-dom'
import { Search, Bell, Zap, Menu } from 'lucide-react'

export default function Header() {
    const location = useLocation()

    const getPageTitle = () => {
        const path = location.pathname.split('/')[1]
        if (!path) return 'Landing'
        return path.charAt(0).toUpperCase() + path.slice(1)
    }

    return (
        <header style={{
            height: '80px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
        }}>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    color: '#000',
                    letterSpacing: '-0.5px',
                    margin: 0
                }}>{getPageTitle()}</h1>
                <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)' }} />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Search */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    width: '280px',
                }}>
                    <Search size={16} color="rgba(0,0,0,0.3)" />
                    <input
                        placeholder="Search global community..."
                        style={{
                            background: 'none', border: 'none', color: '#000',
                            fontSize: '14px', width: '100%', outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(0, 0, 0, 0.04)',
                        padding: '6px 12px', borderRadius: '10px',
                        fontSize: '12px', fontWeight: 700, color: '#000'
                    }}>
                        <Zap size={14} fill="#000" />
                        2,450 XP
                    </div>

                    <button style={{
                        width: '40px', height: '40px',
                        borderRadius: '12px', background: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', position: 'relative'
                    }}>
                        <Bell size={18} color="#000" />
                        <div style={{
                            position: 'absolute', top: '10px', right: '10px',
                            width: '8px', height: '8px', background: '#000',
                            borderRadius: '50%', border: '2px solid #fff'
                        }} />
                    </button>

                    <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '12px', background: '#000',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 900, cursor: 'pointer'
                    }}>A</div>
                </div>
            </div>
        </header>
    )
}
