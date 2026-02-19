import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, Legend
} from 'recharts'

const data = [
    { name: 'Mon', xp: 400, active: 240, impact: 120 },
    { name: 'Tue', xp: 300, active: 139, impact: 150 },
    { name: 'Wed', xp: 200, active: 980, impact: 420 },
    { name: 'Thu', xp: 278, active: 390, impact: 210 },
    { name: 'Fri', xp: 189, active: 480, impact: 330 },
    { name: 'Sat', xp: 239, active: 380, impact: 290 },
    { name: 'Sun', xp: 349, active: 430, impact: 310 },
]

export default function Analytics() {
    return (
        <div style={{ color: '#000' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
                {/* XP Growth */}
                <div style={{
                    padding: '32px', background: 'white', borderRadius: '28px',
                    border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontWeight: 950, fontSize: '18px', letterSpacing: '-0.5px' }}>XP Progression Matrix</h3>
                            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700, marginTop: '4px' }}>Cumulative growth over the current cycle</p>
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 950, color: '#000' }}>8,240 <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 900 }}>↑ 12%</span></div>
                    </div>
                    <div style={{ height: '320px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000" stopOpacity={0.08} />
                                        <stop offset="95%" stopColor="#000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.3)', fontWeight: 800 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.3)', fontWeight: 800 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ background: '#000', border: 'none', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', padding: '12px 16px' }}
                                    itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}
                                    labelStyle={{ display: 'none' }}
                                    cursor={{ stroke: '#000', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="xp" stroke="#000" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" animationDuration={2000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Active Users */}
                <div style={{
                    padding: '32px', background: 'white', borderRadius: '28px',
                    border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontWeight: 950, fontSize: '18px', letterSpacing: '-0.5px' }}>Explorer Utilization</h3>
                            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700, marginTop: '4px' }}>Peak active session distribution</p>
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 950, color: '#000' }}>462 <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 900 }}>PEAK</span></div>
                    </div>
                    <div style={{ height: '320px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.3)', fontWeight: 800 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.3)', fontWeight: 800 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                    contentStyle={{ background: '#000', border: 'none', borderRadius: '16px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 800 }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Bar dataKey="active" fill="#000" radius={[10, 10, 0, 0]} barSize={40} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Engagement Breakdown */}
            <div style={{
                padding: '40px', background: 'white', borderRadius: '32px',
                border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h3 style={{ fontWeight: 950, fontSize: '20px', letterSpacing: '-0.5px' }}>Operational Synergy Breakdown</h3>
                        <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: 600, marginTop: '4px' }}>Interaction frequency categorized by mission type</p>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>AGGREGATE DATA v2.4</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    {[
                        { label: 'Collective Communication', value: '1,420', sub: 'MESSAGES', color: '#3b82f6', percent: 84 },
                        { label: 'Challenge Iterations', value: '840', sub: 'ATTEMPTS', color: '#f59e0b', percent: 72 },
                        { label: 'Synergy Postings', value: '312', sub: 'CONTRIBUTIONS', color: '#10b981', percent: 56 },
                    ].map(m => (
                        <div key={m.label} style={{ padding: '32px', borderRadius: '24px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.01)' }}>
                            <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 900, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '32px', fontWeight: 950, color: '#000', lineHeight: 1 }}>{m.value}</div>
                                    <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', fontWeight: 800, marginTop: '4px' }}>{m.sub}</div>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 950, color: '#000' }}>{m.percent}%</div>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(0,0,0,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                                <div style={{ width: `${m.percent}%`, height: '100%', background: '#000', borderRadius: '99px', transition: 'width 1s ease' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
