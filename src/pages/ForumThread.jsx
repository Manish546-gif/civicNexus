import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Send } from 'lucide-react'

const threadData = {
    1: {
        title: 'Best resources for learning competitive programming in 2026?',
        author: 'Sarah Kim', avatar: 'S', community: 'EduTech Alliance', time: '2h ago',
        content: `I've been trying to find the best structured path for getting into competitive programming. After a year of studying, here's what's worked best for me:

**Books:**
- CLRS (Introduction to Algorithms) - dense but comprehensive
- Competitive Programmer's Handbook by Antti Laaksonen (FREE online)

**Platforms:**
- Codeforces — rated contests every week
- LeetCode — best for interview prep
- USACO — if you want structured levels

**YouTube:**
- Errichto — Codeforces explanations
- William Lin — competitive programming techniques

What has worked for you? Happy to discuss specific algorithm categories too!`,
        replies: [
            { avatar: 'J', name: 'James Lee', text: 'CP Handbook is genuinely incredible and free! Also check out CP-algorithms.com — it\'s a goldmine. Pair that with daily Codeforces practice and you\'ll improve fast.', time: '1h ago', likes: 34 },
            { avatar: 'P', name: 'Priya S.', text: 'AtCoder is underrated for learning. Their problems are very clean and educational. Educational Codeforces rounds are also great for beginners/intermediate.', time: '45m ago', likes: 19 },
            { avatar: 'R', name: 'Ryan T.', text: 'I\'d add Kattis to the list. Their problems are well categorized and you can filter by difficulty. Also, participating in ICPC regionals is a huge motivator!', time: '30m ago', likes: 8 },
        ],
    }
}

export default function ForumThread() {
    const { id } = useParams()
    const thread = threadData[id] || threadData[1]
    const [reply, setReply] = useState('')
    const [replies, setReplies] = useState(thread.replies)
    const [liked, setLiked] = useState(false)

    const submitReply = () => {
        if (!reply.trim()) return
        setReplies([...replies, {
            avatar: 'A', name: 'You', text: reply,
            time: 'Just now', likes: 0,
        }])
        setReply('')
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#000' }}>
            <Link to="/forums" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(0,0,0,0.4)', fontSize: '13px', textDecoration: 'none',
                marginBottom: '32px', fontWeight: 700
            }}>
                <ArrowLeft size={16} /> Back to Forums
            </Link>

            {/* Thread main */}
            <div style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '24px', padding: '40px', marginBottom: '24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '11px', color: '#000', background: 'rgba(0,0,0,0.05)', padding: '5px 12px', borderRadius: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{thread.community}</span>
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.3, marginBottom: '24px', color: '#000', letterSpacing: '-0.5px' }}>{thread.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, color: '#000' }}>{thread.avatar}</div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 800 }}>{thread.author}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>Posted {thread.time}</div>
                    </div>
                </div>
                <div style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', whiteSpace: 'pre-wrap', fontWeight: 500 }}>{thread.content}</div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <button onClick={() => setLiked(!liked)} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px', borderRadius: '12px',
                        background: liked ? '#000' : 'rgba(0,0,0,0.04)',
                        color: liked ? 'white' : 'rgba(0,0,0,0.5)',
                        border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 800,
                        transition: 'all 0.2s'
                    }}>
                        <ThumbsUp size={16} /> {127 + (liked ? 1 : 0)} Likes
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 800 }}>
                        <Share2 size={16} /> Share Conversation
                    </button>
                </div>
            </div>

            {/* Replies */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', marginBottom: '16px', letterSpacing: '0.08em' }}>{replies.length} COMMUNITY REPLIES</div>
                {replies.map((r, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.04)',
                        borderRadius: '20px', padding: '24px', marginBottom: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, flexShrink: 0, color: '#000' }}>{r.avatar}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 800, fontSize: '14px' }}>{r.name}</span>
                                    <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>{r.time}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ fontSize: '14.5px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, paddingLeft: '50px', fontWeight: 500 }}>{r.text}</div>
                        <div style={{ paddingLeft: '50px', marginTop: '12px' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(0,0,0,0.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                                <ThumbsUp size={13} /> {r.likes} Helpful
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply box */}
            <div style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '24px', padding: '32px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
            }}>
                <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>Share your perspective</div>
                <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                    style={{
                        width: '100%', padding: '18px', boxSizing: 'border-box',
                        background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '16px', color: '#000', fontSize: '15px',
                        lineHeight: 1.6, resize: 'vertical', outline: 'none', fontWeight: 500
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <button onClick={submitReply} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 28px', borderRadius: '14px',
                        background: '#000', color: 'white',
                        border: 'none', fontWeight: 800, fontSize: '14px', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <Send size={16} /> Post Response
                    </button>
                </div>
            </div>
        </div>
    )
}
