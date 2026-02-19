import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Zap, CheckCircle2, Play, RefreshCw } from 'lucide-react'

const challengeData = {
    1: {
        title: 'Binary Search Tree — Insert & Delete',
        category: 'Coding', difficulty: 'Medium', xp: 75,
        description: `Given the root of a Binary Search Tree (BST), implement methods to insert a new key and delete an existing key while maintaining BST properties.

**Constraints:**
- The number of nodes in the tree is in the range [0, 1000]
- -10^4 <= Node.val <= 10^4
- All values are unique
- The tree is a valid BST

**Examples:**
- Insert(7) into [4, 2, 7, 1, 3] → [4, 2, 7, 1, 3, 7]
- Delete(3) from [5, 3, 6, 2, 4] → [5, 4, 6, 2]`,
        starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
function insertIntoBST(root, val) {
  // Your solution here
  
}

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
function deleteNode(root, key) {
  // Your solution here
  
}`,
        testCases: [
            { input: 'root = [4,2,7,1,3], val = 5', expected: '[4,2,7,1,3,5]', passed: null },
            { input: 'root = [40,20,60,10,30,50,70], val = 25', expected: '[40,20,60,10,30,50,70,null,null,25]', passed: null },
            { input: 'root = [], val = 5', expected: '[5]', passed: null },
        ],
    }
}

export default function ChallengeDetail() {
    const { id } = useParams()
    const challenge = challengeData[id] || challengeData[1]
    const [code, setCode] = useState(challenge.starterCode)
    const [output, setOutput] = useState(null)
    const [running, setRunning] = useState(false)

    const runCode = () => {
        setRunning(true)
        setTimeout(() => {
            setOutput({
                status: 'success',
                cases: challenge.testCases.map((tc, i) => ({
                    ...tc,
                    passed: i < 2,
                    time: `${(Math.random() * 8 + 2).toFixed(1)}ms`,
                })),
                xpEarned: 75,
                executionTime: '5.4ms',
                memory: '38.2 MB',
            })
            setRunning(false)
        }, 1800)
    }

    const diffColors = { Easy: '#10b981', Medium: '#f97316', Hard: '#ef4444' }

    return (
        <div style={{ color: '#000' }}>
            <Link to="/challenges" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(0,0,0,0.4)', fontSize: '13px', textDecoration: 'none',
                marginBottom: '24px', fontWeight: 700
            }}>
                <ArrowLeft size={16} /> Back to Challenges
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: 'calc(100vh - 200px)' }}>
                {/* Left: Problem description */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '24px', padding: '32px', overflowY: 'auto',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>{challenge.title}</h2>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, color: diffColors[challenge.difficulty], textTransform: 'uppercase', letterSpacing: '0.05em' }}>{challenge.difficulty}</span>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
                                <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>{challenge.category}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 900, color: '#000' }}>
                                    <Zap size={14} fill="#000" /> +{challenge.xp} XP
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        fontSize: '15px', lineHeight: 1.8, color: 'rgba(0,0,0,0.6)',
                        whiteSpace: 'pre-wrap', fontWeight: 500
                    }}>
                        {challenge.description}
                    </div>

                    {/* Test cases preview */}
                    <div style={{ marginTop: '32px' }}>
                        <h3 style={{ fontWeight: 800, fontSize: '12px', marginBottom: '16px', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Simulation Criteria</h3>
                        {challenge.testCases.map((tc, i) => (
                            <div key={i} style={{
                                padding: '16px 20px', marginBottom: '12px',
                                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)',
                                borderRadius: '14px', fontSize: '13px', fontFamily: "'Fira Code', monospace",
                            }}>
                                <div style={{ color: 'rgba(0,0,0,0.3)', marginBottom: '6px', fontSize: '11px', fontWeight: 800 }}>V-CASE {i + 1}</div>
                                <div><span style={{ color: 'rgba(0,0,0,0.4)' }}>Input: </span>{tc.input}</div>
                                <div><span style={{ color: 'rgba(0,0,0,0.4)' }}>Expect: </span>{tc.expected}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Code editor + output */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Code editor */}
                    <div style={{
                        flex: 1, background: '#0a0a0a',
                        border: '1px solid #1a1a1a',
                        borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                        {/* Editor toolbar */}
                        <div style={{
                            padding: '12px 24px', background: 'rgba(255,255,255,0.03)',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['JavaScript', 'Python', 'Java'].map((lang, i) => (
                                    <button key={lang} style={{
                                        padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 800,
                                        background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: i === 0 ? 'white' : 'rgba(255,255,255,0.4)',
                                        border: 'none', cursor: 'pointer',
                                    }}>{lang}</button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCode(challenge.starterCode)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                            >
                                <RefreshCw size={12} /> Sync Base
                            </button>
                        </div>
                        <textarea
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            spellCheck={false}
                            style={{
                                flex: 1, padding: '24px',
                                background: 'transparent', border: 'none', color: '#e0e0e0',
                                fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace",
                                fontSize: '14px', lineHeight: 1.8, resize: 'none',
                                outline: 'none',
                            }}
                        />
                    </div>

                    {/* Output / Results */}
                    <div style={{
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: '20px', overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{
                            padding: '16px 24px',
                            borderBottom: output ? '1px solid rgba(0,0,0,0.05)' : 'none',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {output ? `EXECUTION: ${output.executionTime} · MEM: ${output.memory}` : 'D-SYSTEM OUTPUT'}
                            </span>
                            <button
                                onClick={runCode}
                                disabled={running}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 24px', borderRadius: '12px',
                                    background: running ? 'rgba(0,0,0,0.05)' : '#000',
                                    color: running ? 'rgba(0,0,0,0.3)' : 'white',
                                    border: 'none', fontWeight: 900, fontSize: '13px', cursor: running ? 'wait' : 'pointer',
                                    transition: 'all 0.2s', boxShadow: running ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            >
                                {running ? <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Play size={15} fill="white" />}
                                {running ? 'COMPILING...' : 'INITIALIZE RUN'}
                            </button>
                        </div>

                        {output && (
                            <div style={{ padding: '20px 24px' }}>
                                {output.cases.map((tc, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '14px',
                                        padding: '10px 0', borderBottom: i < output.cases.length - 1 ? '1px solid rgba(0,0,0,0.03)' : 'none',
                                    }}>
                                        <div style={{ color: tc.passed ? '#10b981' : '#ef4444', flexShrink: 0 }}>
                                            {tc.passed ? <CheckCircle2 size={16} /> : <span style={{ fontSize: '16px', fontWeight: 900 }}>✕</span>}
                                        </div>
                                        <div style={{ flex: 1, fontSize: '13px', fontFamily: "'Fira Code', monospace", fontWeight: 500 }}>
                                            <span style={{ color: 'rgba(0,0,0,0.3)' }}>CASE {i + 1}: </span>
                                            <span>{tc.input.substring(0, 45)}...</span>
                                        </div>
                                        <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 800 }}>{tc.time}</span>
                                    </div>
                                ))}
                                <div style={{
                                    marginTop: '20px', padding: '16px 20px',
                                    background: '#000', borderRadius: '14px',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    color: '#fff'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: 800 }}>
                                        {output.cases.filter(c => c.passed).length}/{output.cases.length} VALIDATED
                                    </span>
                                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#4ade80' }}>+{output.xpEarned} XP UNLOCKED</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
