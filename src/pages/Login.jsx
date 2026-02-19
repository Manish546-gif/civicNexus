import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Github, Chrome, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
    const navigate = useNavigate()
    const { login, googleLogin } = useAuth()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login(formData.email, formData.password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication error. Please verify your credentials.')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('')
        setLoading(true)
        try {
            await googleLogin(credentialResponse.credential)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Google authentication failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            color: '#000',
            background: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Visual background accents */}
            <div style={{
                position: 'absolute', top: '-10%', right: '-5%',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(0,0,0,0.01), transparent 70%)',
                borderRadius: '50%',
            }} />
            <div style={{
                position: 'absolute', bottom: '-5%', left: '-5%',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(0,0,0,0.005), transparent 70%)',
                borderRadius: '50%',
            }} />

            <div style={{
                width: '100%',
                maxWidth: '480px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(32px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '40px',
                padding: '56px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.04)',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Branding */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
                    <div style={{
                        width: '64px', height: '64px',
                        background: '#000', borderRadius: '18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                        marginBottom: '20px'
                    }}>
                        <Globe size={32} color="#fff" strokeWidth={2.5} />
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-1.5px', marginBottom: '8px' }}>Authenticate</h1>
                    <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '15px', fontWeight: 700 }}>Initialize your explorer session</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Access Identity (Email)
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.2)' }} size={18} />
                            <input
                                type="email"
                                placeholder="alex@vault.io"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{
                                    width: '100%', padding: '16px 20px 16px 52px',
                                    background: 'rgba(0,0,0,0.03)', border: '1px solid transparent',
                                    borderRadius: '16px', fontSize: '15px', outline: 'none', color: '#000',
                                    fontWeight: 700, boxSizing: 'border-box', transition: 'all 0.2s'
                                }}
                                onFocus={e => {
                                    e.target.style.background = '#fff'
                                    e.target.style.border = '1px solid rgba(0,0,0,0.1)'
                                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'
                                }}
                                onBlur={e => {
                                    e.target.style.background = 'rgba(0,0,0,0.03)'
                                    e.target.style.border = '1px solid transparent'
                                    e.target.style.boxShadow = 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'rgba(0,0,0,0.3)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Protocol Key (Password)
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.2)' }} size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{
                                    width: '100%', padding: '16px 20px 16px 52px',
                                    background: 'rgba(0,0,0,0.03)', border: '1px solid transparent',
                                    borderRadius: '16px', fontSize: '15px', outline: 'none', color: '#000',
                                    fontWeight: 700, boxSizing: 'border-box', transition: 'all 0.2s'
                                }}
                                onFocus={e => {
                                    e.target.style.background = '#fff'
                                    e.target.style.border = '1px solid rgba(0,0,0,0.1)'
                                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'
                                }}
                                onBlur={e => {
                                    e.target.style.background = 'rgba(0,0,0,0.03)'
                                    e.target.style.border = '1px solid transparent'
                                    e.target.style.boxShadow = 'none'
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            fontSize: '13px', color: '#ef4444', background: 'rgba(239, 64, 64, 0.05)',
                            padding: '14px', borderRadius: '14px', fontWeight: 800, textAlign: 'center',
                            border: '1px solid rgba(239, 64, 64, 0.1)'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '18px',
                            background: '#000', color: '#fff',
                            border: 'none', borderRadius: '18px',
                            fontSize: '16px', fontWeight: 900,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '12px', cursor: loading ? 'wait' : 'pointer',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {loading ? 'CALIBRATING...' : 'Initialize Session'} <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ margin: '40px 0', borderTop: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
                    <span style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: '#fff', padding: '0 16px', fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: 950,
                        textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}>Third-party Uplink</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
                    <div style={{ width: '100%' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Authentication Failed')}
                            theme="outline"
                            size="large"
                            shape="pill"
                            width="100%"
                        />
                    </div>
                    <button style={{
                        padding: '14px', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px', background: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px',
                        fontWeight: 900, cursor: 'pointer', transition: 'background 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                    >
                        <Github size={20} /> GitHub
                    </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>
                    New to the node? <Link to="/register" style={{ color: '#000', textDecoration: 'none', fontWeight: 950 }}>Initialize Account</Link>
                </p>
            </div>
        </div>
    )
}
