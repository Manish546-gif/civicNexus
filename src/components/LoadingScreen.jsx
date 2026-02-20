import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import Lottie from 'lottie-react'

// ----------- Particle Field (Three.js) -----------
function ParticleVortex() {
    const ref = useRef()
    const count = 3000
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
        const r = Math.random() * 6 + 1
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)
        speeds[i] = Math.random() * 0.5 + 0.3
    }

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.08
            ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.3
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.025}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    )
}

// ----------- Pulsing Ring (Three.js) -----------
function PulsingRing() {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime()
            ref.current.rotation.z = t * 0.3
            ref.current.rotation.x = Math.sin(t * 0.5) * 0.5
            ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
        }
    })
    return (
        <mesh ref={ref}>
            <torusGeometry args={[2.2, 0.012, 16, 100]} />
            <meshBasicMaterial color="#ffffff" opacity={0.15} transparent />
        </mesh>
    )
}

function InnerRing() {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.z = -clock.getElapsedTime() * 0.5
            ref.current.rotation.y = clock.getElapsedTime() * 0.2
        }
    })
    return (
        <mesh ref={ref}>
            <torusGeometry args={[1.5, 0.008, 16, 100]} />
            <meshBasicMaterial color="#facc15" opacity={0.3} transparent />
        </mesh>
    )
}

// ----------- Inline Lottie JSON (circuit/pulse animation) -----------
const LOTTIE_DATA = {
    "v": "5.7.4", "fr": 30, "ip": 0, "op": 60, "w": 200, "h": 200,
    "nm": "Pulse", "ddd": 0,
    "assets": [],
    "layers": [{
        "ddd": 0, "ind": 1, "ty": 4, "nm": "circle",
        "sr": 1, "ks": {
            "o": { "a": 1, "k": [{ "i": { "x": [0.5], "y": [1] }, "o": { "x": [0.5], "y": [0] }, "t": 0, "s": [100] }, { "t": 30, "s": [20] }], "ix": 11 },
            "r": { "a": 0, "k": 0, "ix": 10 },
            "p": { "a": 0, "k": [100, 100, 0], "ix": 2 },
            "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
            "s": { "a": 1, "k": [{ "i": { "x": [0.5, 0.5, 0.5], "y": [1, 1, 1] }, "o": { "x": [0.5, 0.5, 0.5], "y": [0, 0, 0] }, "t": 0, "s": [80, 80, 100] }, { "t": 30, "s": [120, 120, 100] }], "ix": 6 }
        },
        "ao": 0,
        "shapes": [{
            "ty": "gr",
            "it": [
                { "ty": "el", "s": { "a": 0, "k": [80, 80] }, "p": { "a": 0, "k": [0, 0] }, "nm": "E", "hd": false },
                { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1] }, "o": { "a": 0, "k": 100 }, "w": { "a": 0, "k": 4 }, "lc": 1, "lj": 1, "ml": 4, "nm": "St", "hd": false },
                { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }
            ], "nm": "G", "hd": false
        }],
        "ip": 0, "op": 60, "st": 0, "bm": 0
    }]
}

// ----------- Main Loading Screen -----------
export default function LoadingScreen() {
    const containerRef = useRef(null)
    const logoRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const dotsRef = useRef(null)
    const barRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set([logoRef.current, titleRef.current, subtitleRef.current, dotsRef.current], {
                opacity: 0, y: 30
            })
            gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left' })

            // Staggered entrance
            const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 } })
            tl.to(containerRef.current, { opacity: 1, duration: 0.3 })
                .to(logoRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.1')
                .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
                .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
                .to(dotsRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
                .to(barRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3')

            // Breathing loop on logo
            gsap.to(logoRef.current, {
                scale: 1.05,
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: 0.8
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                overflow: 'hidden',
            }}
        >
            {/* Three.js background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <ParticleVortex />
                    <PulsingRing />
                    <InnerRing />
                </Canvas>
            </div>

            {/* Overlay gradient */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)'
            }} />

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 2,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'
            }}>
                {/* Lottie + Logo combo */}
                <div ref={logoRef} style={{ position: 'relative', width: '120px', height: '120px' }}>
                    {/* Lottie pulse ring */}
                    <div style={{ position: 'absolute', inset: -20, zIndex: 0 }}>
                        <Lottie
                            animationData={LOTTIE_DATA}
                            loop
                            autoplay
                            style={{ width: '160px', height: '160px' }}
                        />
                    </div>

                    {/* Inner glass circle logo */}
                    <div style={{
                        position: 'relative', zIndex: 1,
                        width: '120px', height: '120px',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <div ref={titleRef} style={{
                    fontSize: '36px', fontWeight: 900, letterSpacing: '-1.5px',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    textShadow: '0 0 40px rgba(255,255,255,0.3)',
                }}>
                    CivicNexus
                </div>

                {/* Subtitle */}
                <div ref={subtitleRef} style={{
                    fontSize: '12px', fontWeight: 700, letterSpacing: '0.25em',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                }}>
                    Initializing Node Network
                </div>

                {/* Animated dots */}
                <div ref={dotsRef} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: i === 0 ? '#facc15' : 'rgba(255,255,255,0.3)',
                                animation: `dot-pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
                            }}
                        />
                    ))}
                </div>

                {/* Progress bar */}
                <div style={{
                    width: '200px', height: '2px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '99px', overflow: 'hidden',
                    marginTop: '16px',
                }}>
                    <div
                        ref={barRef}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #facc15, #fff)',
                            borderRadius: '99px',
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes dot-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.4); background: #facc15; }
                }
            `}</style>
        </div>
    )
}
