import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Globe2, Lock, GraduationCap, Building2, Leaf, Code2 } from 'lucide-react'

const categories = [
    { id: 'education', icon: GraduationCap, label: 'Education', desc: 'Learning, tutoring, academic collaboration' },
    { id: 'civic', icon: Building2, label: 'Civic Engagement', desc: 'Policy, governance, community action' },
    { id: 'environmental', icon: Leaf, label: 'Environmental', desc: 'Climate, sustainability, conservation' },
    { id: 'technology', icon: Code2, label: 'Technology', desc: 'Coding, innovation, open source' },
]

export default function CreateCommunity() {
    const [form, setForm] = useState({ name: '', description: '', category: 'education', visibility: 'public', tags: '' })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/communities/1')
    }

    return (
        <div style={{ maxWidth: '680px', margin: '0 auto', color: '#000' }}>
            <Link to="/communities" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(0,0,0,0.4)', fontSize: '13px', textDecoration: 'none',
                marginBottom: '32px', fontWeight: 700
            }}>
                <ArrowLeft size={16} /> Back to Communities
            </Link>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '8px' }}>Launch a Community</h2>
                <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>Define your mission and invite explorers to join your cause.</p>
            </div>

            <form onSubmit={handleSubmit} style={{
                padding: '40px', background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
            }}>
                {/* Name */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>Community Identity</label>
                    <input
                        required value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Climate Tech Builders"
                        style={{
                            width: '100%', padding: '14px 18px', boxSizing: 'border-box',
                            background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '12px', color: '#000', fontSize: '15px', outline: 'none', fontWeight: 500
                        }}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>Our Mission</label>
                    <textarea
                        required value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="What is the core purpose of this community? How will members engage?"
                        rows={4}
                        style={{
                            width: '100%', padding: '14px 18px', boxSizing: 'border-box',
                            background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '12px', color: '#000', fontSize: '15px', outline: 'none', resize: 'vertical', fontWeight: 500
                        }}
                    />
                </div>

                {/* Category */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>Focus Area</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat.id} type="button"
                                onClick={() => setForm({ ...form, category: cat.id })}
                                style={{
                                    padding: '16px 20px', borderRadius: '16px', cursor: 'pointer', textAlign: 'left',
                                    background: form.category === cat.id ? '#000' : 'rgba(0,0,0,0.02)',
                                    border: `1.5px solid ${form.category === cat.id ? '#000' : 'rgba(0,0,0,0.05)'}`,
                                    color: form.category === cat.id ? '#fff' : '#000', transition: 'all 0.2s',
                                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                                }}
                            >
                                <cat.icon size={20} style={{ opacity: form.category === cat.id ? 1 : 0.4, flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>{cat.label}</div>
                                    <div style={{ fontSize: '11px', color: form.category === cat.id ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{cat.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>Explorer Tags (Discovery)</label>
                    <input
                        value={form.tags}
                        onChange={e => setForm({ ...form, tags: e.target.value })}
                        placeholder="Climate, Hackathon, Policy, EdTech..."
                        style={{
                            width: '100%', padding: '14px 18px', boxSizing: 'border-box',
                            background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '12px', color: '#000', fontSize: '15px', outline: 'none', fontWeight: 500
                        }}
                    />
                </div>

                {/* Visibility */}
                <div style={{ marginBottom: '40px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>Access Control</label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {[
                            { value: 'public', icon: Globe2, label: 'Public Space', desc: 'Any explorer can join' },
                            { value: 'private', icon: Lock, label: 'Private Hub', desc: 'Access via invitation' },
                        ].map(v => (
                            <button
                                key={v.value} type="button"
                                onClick={() => setForm({ ...form, visibility: v.value })}
                                style={{
                                    flex: 1, padding: '16px 20px', borderRadius: '16px', cursor: 'pointer',
                                    background: form.visibility === v.value ? '#000' : 'rgba(0,0,0,0.02)',
                                    border: `1.5px solid ${form.visibility === v.value ? '#000' : 'rgba(0,0,0,0.05)'}`,
                                    color: form.visibility === v.value ? '#fff' : '#000',
                                    display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s'
                                }}
                            >
                                <v.icon size={18} style={{ opacity: form.visibility === v.value ? 1 : 0.4 }} />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 800, fontSize: '14px' }}>{v.label}</div>
                                    <div style={{ fontSize: '11px', color: form.visibility === v.value ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{v.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" style={{
                    width: '100%', padding: '16px',
                    background: '#000', color: 'white',
                    border: 'none', borderRadius: '16px',
                    fontWeight: 900, fontSize: '15px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    Establish Community <ArrowRight size={18} />
                </button>
            </form>
        </div>
    )
}
