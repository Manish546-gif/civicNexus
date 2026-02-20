import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    MessageSquare,
    Heart,
    Send,
    Image as ImageIcon,
    Hash,
    Globe,
    Shield,
    Leaf,
    BookOpen,
    MoreHorizontal,
    Share2,
    Repeat
} from 'lucide-react';

const TOPICS = [
    { id: 'General', icon: <Globe size={16} />, color: '#000' },
    { id: 'Environment', icon: <Leaf size={16} />, color: '#10b981' },
    { id: 'Civic Issues', icon: <Shield size={16} />, color: '#f97316' },
    { id: 'Education', icon: <BookOpen size={16} />, color: '#3b82f6' },
];

export default function Feed() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('General');
    const [imageUrl, setImageUrl] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);
    const [filter, setFilter] = useState('All');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/feeds`);
            setPosts(res.data);
        } catch (err) {
            console.error('Failed to fetch feeds');
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/feeds`, {
                content,
                topic,
                image: imageUrl
            });
            setPosts([res.data, ...posts]);
            setContent('');
            setImageUrl('');
            setShowImageInput(false);
        } catch (err) {
            console.error('Failed to post');
        }
    };

    const handleLike = async (postId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/feeds/${postId}/like`);
            setPosts(posts.map(p => p._id === postId ? { ...p, likes: res.data.likes } : p));
        } catch (err) {
            console.error('Like failed');
        }
    };

    const handleReply = async (postId) => {
        if (!replyContent.trim()) return;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/feeds/${postId}/reply`, {
                content: replyContent
            });
            setPosts(posts.map(p => p._id === postId ? res.data : p));
            setReplyContent('');
            setReplyingTo(null);
        } catch (err) {
            console.error('Reply failed');
        }
    };

    const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.topic === filter);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-1.5px', marginBottom: '8px' }}>Community Pulse</h2>
                <p style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>Exchange insights, media, and civic signals across the grid.</p>
            </div>

            {/* Pulse Transmitter (Post Creation) */}
            <div style={{
                background: '#fff',
                border: '3px solid #000',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '40px',
                boxShadow: '8px 8px 0 #000'
            }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: '#000', color: '#fff', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontWeight: 900
                    }}>
                        {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <form onSubmit={handleCreatePost} style={{ flex: 1 }}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Broadcast a new signal... (Use #tags for extra resonance)"
                            style={{
                                width: '100%',
                                border: 'none',
                                resize: 'none',
                                padding: '12px 0',
                                fontSize: '18px',
                                fontWeight: 700,
                                outline: 'none',
                                minHeight: '80px',
                                color: '#000'
                            }}
                        />

                        {showImageInput && (
                            <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    placeholder="Enter image URL..."
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        border: '2px solid #000',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: 800
                                    }}
                                />
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '2px solid rgba(0,0,0,0.05)',
                            paddingTop: '16px'
                        }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <select
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    style={{
                                        padding: '8px 12px',
                                        border: '2px solid #000',
                                        background: '#fff',
                                        borderRadius: '12px',
                                        fontWeight: 900,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {TOPICS.map(t => <option key={t.id} value={t.id}>{t.id}</option>)}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => setShowImageInput(!showImageInput)}
                                    style={{
                                        padding: '8px 12px', border: '2px solid #000', borderRadius: '12px',
                                        background: showImageInput ? '#000' : '#fff', color: showImageInput ? '#fff' : '#000',
                                        cursor: 'pointer', transition: '0.2s'
                                    }}>
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    padding: '12px 24px', background: '#000', color: '#fff',
                                    borderRadius: '16px', fontWeight: 950, border: 'none',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                    transition: 'transform 0.1s'
                                }}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                TRANSMIT <Send size={16} fill="white" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Filtering Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
                <button
                    onClick={() => setFilter('All')}
                    style={{
                        padding: '10px 20px', borderRadius: '14px', border: '2.5px solid #000',
                        background: filter === 'All' ? '#000' : '#fff', color: filter === 'All' ? '#fff' : '#000',
                        fontWeight: 900, cursor: 'pointer', whiteSpace: 'nowrap'
                    }}>
                    All Signals
                </button>
                {TOPICS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setFilter(t.id)}
                        style={{
                            padding: '10px 20px', borderRadius: '14px', border: '2.5px solid #000',
                            background: filter === t.id ? '#000' : '#fff', color: filter === t.id ? '#fff' : '#000',
                            fontWeight: 950, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                        {t.id.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Pulse Stream (Post List) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: 900, color: 'rgba(0,0,0,0.2)' }}>
                        SYNCHRONIZING PULSE...
                    </div>
                ) : filteredPosts.map(post => {
                    const postTopic = TOPICS.find(t => t.id === post.topic) || TOPICS[0];
                    const hasLiked = post.likes.includes(user?.id);

                    return (
                        <div key={post._id} style={{
                            background: '#fff',
                            border: '3px solid #000',
                            borderRadius: '24px',
                            padding: '24px',
                            boxShadow: '6px 6px 0 #000',
                            transition: '0.2s'
                        }}>
                            {/* Topic Badge */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '4px 12px', borderRadius: '8px',
                                border: '2px solid #000', marginBottom: '16px',
                                background: postTopic.color + '15', fontWeight: 950, fontSize: '11px', textTransform: 'uppercase'
                            }}>
                                {postTopic.icon} {post.topic}
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontWeight: 950, border: '2px solid #000'
                                }}>
                                    {post.author?.name.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 950, fontSize: '16px' }}>
                                            {post.author?.name}{' '}
                                            <span style={{ color: 'rgba(0,0,0,0.3)', fontWeight: 700, fontSize: '13px' }}>
                                                · {new Date(post.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.2)' }}>
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                    <div style={{
                                        marginTop: '8px', fontSize: '17px', lineHeight: 1.6,
                                        fontWeight: 700, color: '#000', whiteSpace: 'pre-wrap'
                                    }}>
                                        {post.content}
                                    </div>

                                    {post.tags?.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                                            {post.tags.map(tag => (
                                                <span key={tag} style={{ color: '#3b82f6', fontWeight: 900, fontSize: '14px' }}>
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {post.image && (
                                <div style={{
                                    marginBottom: '16px', borderRadius: '16px',
                                    overflow: 'hidden', border: '2px solid #000',
                                    background: 'rgba(0,0,0,0.02)'
                                }}>
                                    <img
                                        src={post.image}
                                        alt="Post media"
                                        style={{ width: '100%', display: 'block' }}
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}

                            {/* Engagement Links */}
                            <div style={{
                                display: 'flex', gap: '32px',
                                borderTop: '2px solid rgba(0,0,0,0.04)',
                                paddingTop: '16px'
                            }}>
                                <button
                                    onClick={() => handleLike(post._id)}
                                    style={{
                                        border: 'none', background: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        color: hasLiked ? '#ef4444' : 'rgba(0,0,0,0.4)',
                                        fontWeight: 900, transition: '0.2s'
                                    }}>
                                    <Heart size={20} fill={hasLiked ? '#ef4444' : 'transparent'} />
                                    {post.likes.length}
                                </button>
                                <button
                                    onClick={() => setReplyingTo(replyingTo === post._id ? null : post._id)}
                                    style={{
                                        border: 'none', background: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        color: replyingTo === post._id ? '#000' : 'rgba(0,0,0,0.4)',
                                        fontWeight: 900
                                    }}>
                                    <MessageSquare size={20} />
                                    {post.replies.length}
                                </button>
                                <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(0,0,0,0.4)', fontWeight: 900 }}>
                                    <Repeat size={20} /> Collect
                                </button>
                                <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(0,0,0,0.4)', fontWeight: 900 }}>
                                    <Share2 size={20} /> Relay
                                </button>
                            </div>

                            {/* Replies Section */}
                            {replyingTo === post._id && (
                                <div style={{ marginTop: '24px', borderTop: '2px dashed rgba(0,0,0,0.1)', paddingTop: '24px' }}>
                                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                        <input
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            placeholder="Write your resonance..."
                                            style={{
                                                flex: 1, padding: '12px 16px', border: '2px solid #000',
                                                borderRadius: '12px', fontWeight: 800, fontSize: '14px', outline: 'none'
                                            }}
                                        />
                                        <button
                                            onClick={() => handleReply(post._id)}
                                            style={{
                                                padding: '10px 20px', background: '#000', color: '#fff',
                                                borderRadius: '12px', fontWeight: 950, border: 'none', cursor: 'pointer'
                                            }}>
                                            REPLY
                                        </button>
                                    </div>

                                    {post.replies.map((reply, ri) => (
                                        <div key={ri} style={{
                                            display: 'flex', gap: '12px', marginBottom: '16px',
                                            paddingLeft: '16px', borderLeft: '3px solid rgba(0,0,0,0.05)'
                                        }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '50%',
                                                background: '#000', color: '#fff', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 950
                                            }}>
                                                {reply.author?.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 950, fontSize: '14px', marginBottom: '2px' }}>
                                                    {reply.author?.name}
                                                </div>
                                                <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.7)', fontWeight: 600 }}>
                                                    {reply.content}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {!loading && filteredPosts.length === 0 && (
                    <div style={{
                        textAlign: 'center', padding: '100px 0', border: '3px dashed rgba(0,0,0,0.1)',
                        borderRadius: '24px', background: 'rgba(0,0,0,0.02)'
                    }}>
                        <Hash size={48} style={{ color: 'rgba(0,0,0,0.1)', marginBottom: '16px' }} />
                        <div style={{ fontWeight: 900, color: 'rgba(0,0,0,0.2)', fontSize: '20px' }}>NO SIGNALS DETECTED</div>
                        <p style={{ color: 'rgba(0,0,0,0.3)', fontWeight: 700, marginTop: '8px' }}>Be the first to transmit in this quadrant.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

