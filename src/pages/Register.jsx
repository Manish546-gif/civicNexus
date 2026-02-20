import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, ArrowRight, Code2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
    const [form, setForm] = useState({ name: '', username: '', email: '', password: '', role: 'user' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await register(form)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
            {/* Soft background accents */}
            <div style={{
                position: 'absolute', top: '-10%', right: '-5%',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(0,0,0,0.02), transparent 70%)',
                borderRadius: '50%',
            }} />
            <div style={{
                position: 'absolute', bottom: '-5%', left: '-5%',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(0,0,0,0.01), transparent 70%)',
                borderRadius: '50%',
            }} />

            <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 2 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '64px', height: '64px', background: 'black',
                            borderRadius: '18px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                        }}>
                            <Globe size={32} color="white" strokeWidth={2.5} />
                        </div>
                        <span style={{ color: 'black', fontWeight: 950, fontSize: '28px', letterSpacing: '-1.5px' }}>CivicNexus</span>
                    </Link>
                    <p style={{ color: 'rgba(0,0,0,0.4)', marginTop: '12px', fontSize: '15px', fontWeight: 600 }}>
                        Global Network Initialization
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '32px', padding: '40px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                }}>
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: 'IDENTITY (FULL NAME)', key: 'name', type: 'text', placeholder: 'Alex Rivera' },
                            { label: 'HANDLE (USERNAME)', key: 'username', type: 'text', placeholder: '@alex' },
                            { label: 'COMMUNICATION (EMAIL)', key: 'email', type: 'email', placeholder: 'alex@vault.io' },
                            { label: 'ACCESS KEY (PASSWORD)', key: 'password', type: 'password', placeholder: '••••••••' },
                        ].map(f => (
                            <div key={f.key} style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.3)', marginBottom: '8px', letterSpacing: '0.1em' }}>
                                    {f.label}
                                </label>
                                <input
                                    type={f.type} required
                                    value={form[f.key]}
                                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                    placeholder={f.placeholder}
                                    style={{
                                        width: '100%', padding: '14px 18px', boxSizing: 'border-box',
                                        background: 'rgba(0,0,0,0.03)',
                                        border: '1px solid rgba(0,0,0,0.02)',
                                        borderRadius: '14px', color: 'black', fontSize: '15px',
                                        fontWeight: 600, outline: 'none', transition: 'all 0.2s',
                                    }}
                                    onFocus={e => {
                                        e.target.style.background = '#fff'
                                        e.target.style.border = '1px solid rgba(0,0,0,0.1)'
                                        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'
                                    }}
                                    onBlur={e => {
                                        e.target.style.background = 'rgba(0,0,0,0.03)'
                                        e.target.style.border = '1px solid rgba(0,0,0,0.02)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                        ))}

                        {error && (
                            <div style={{
                                fontSize: '13px', color: '#ef4444',
                                background: 'rgba(239, 64, 64, 0.06)',
                                padding: '12px 16px', borderRadius: '12px',
                                fontWeight: 700, textAlign: 'center',
                                border: '1px solid rgba(239, 64, 64, 0.12)',
                                marginTop: '16px'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '16px', marginTop: '16px',
                                background: 'black',
                                color: 'white', border: 'none', borderRadius: '16px',
                                fontWeight: 900, fontSize: '16px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)', transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {loading ? 'Creating Account...' : 'Initialize Account'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                    Already member of the network?{' '}
                    <Link to="/login" style={{ color: 'black', fontWeight: 900, textDecoration: 'none' }}>Authenticate</Link>
                </p>
            </div>
        </div>
    )
}
