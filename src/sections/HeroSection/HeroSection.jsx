import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COMPANY_PROFILE_MODEL as companyProfile } from './heroData'
import './HeroSection.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192

function HeroSection() {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)
    const canvasWrapRef = useRef(null)
    const contentRef = useRef(null)
    const [loadedCount, setLoadedCount] = useState(0)

    // Use a ref to store images so we don't trigger re-renders on every load
    const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null))
    const seqRef = useRef({ frame: 0 }) // For GSAP to tween

    // 1. FAST LOADING
    useEffect(() => {
        let count = 0

        const loadFrame = (index) => {
            const img = new Image()
            const num = String(index + 1).padStart(3, '0')
            img.src = `/hero-frames/ffout${num}.gif`

            img.onload = () => {
                imagesRef.current[index] = img
                count++
                setLoadedCount(count)

                // Render frame 0 immediately
                if (index === 0 && canvasRef.current) {
                    renderCanvas(0)
                }
            }
        }

        loadFrame(0)
        for (let i = 1; i < TOTAL_FRAMES; i++) {
            loadFrame(i)
        }
    }, [])

    // 2. RENDER LOGIC
    const renderCanvas = (targetIndex) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        // Find closest loaded frame
        let frameToDraw = null
        for (let i = Math.floor(targetIndex); i >= 0; i--) {
            if (imagesRef.current[i]) {
                frameToDraw = imagesRef.current[i]
                break
            }
        }

        if (!frameToDraw) return

        const rect = canvas.parentElement.getBoundingClientRect()
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
            canvas.width = rect.width
            canvas.height = rect.height
        }

        const imgRatio = frameToDraw.width / frameToDraw.height
        const canvasRatio = canvas.width / canvas.height
        let drawW, drawH, drawX, drawY

        if (canvasRatio > imgRatio) {
            drawW = canvas.width
            drawH = canvas.width / imgRatio
            drawX = 0
            drawY = (canvas.height - drawH) / 2
        } else {
            drawH = canvas.height
            drawW = canvas.height * imgRatio
            drawX = (canvas.width - drawW) / 2
            drawY = 0
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(frameToDraw, drawX, drawY, drawW, drawH)
    }

    // 3. SCROLL ANIMATION - CROSSFADE
    useEffect(() => {
        const scrollDistance = window.innerHeight * 2

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${scrollDistance}`,
                pin: true,
                scrub: 0.5,
            }
        })

        // a) Scrub the frames over the first 65% of the pin
        tl.to(seqRef.current, {
            frame: TOTAL_FRAMES - 1,
            snap: 'frame',
            ease: 'none',
            duration: 0.65,
            onUpdate: () => renderCanvas(seqRef.current.frame)
        }, 0)

        // b) Crossfade! The canvas fades out (Starts at 65%, duration 0.15)
        tl.to(canvasWrapRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.65)

        // c) Fade the content ("Your Sacred Journey...") in at the exact same time
        tl.fromTo(contentRef.current,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.15,
                ease: 'power2.out',
            },
            0.65
        )

        // d) FADE OUT TO CREAM: The hero section transforms to seamlessly blend into the next section.
        // Starts at 0.90 (leaving a pleasant 10% hold for reading text between 0.80 and 0.90)

        // Fade the text out by sliding it upwards elegantly
        tl.to(contentRef.current, {
            opacity: 0,
            y: -40,
            duration: 0.10,
            ease: 'power2.in'
        }, 0.90)

        // Fade out the dark background gradient wrapper
        tl.to('.hero__bg', {
            opacity: 0,
            duration: 0.10,
            ease: 'power2.inOut'
        }, 0.90)

        // Change the section's background matching the exact #faf6ee cream CSS var
        tl.to(sectionRef.current, {
            backgroundColor: '#faf6ee',
            duration: 0.10,
            ease: 'power2.inOut'
        }, 0.90)

        // Ensure timeline reaches exactly 1.0
        tl.set({}, {}, 1.0)

        const onResize = () => {
            renderCanvas(seqRef.current.frame)
        }
        window.addEventListener('resize', onResize)

        return () => {
            tl.kill()
            ScrollTrigger.getAll().forEach(t => t.kill())
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const percentLoaded = Math.round((loadedCount / TOTAL_FRAMES) * 100)

    return (
        <div className="hero-scroll-container">
            <section ref={sectionRef} className="hero" id="hero">

                {/* Dark Background */}
                <div className="hero__bg">
                    <div className="hero__gradient" />
                </div>

                {/* Canvas wrapper (fades out at end) */}
                <div ref={canvasWrapRef} className="hero__canvas-wrap">
                    <canvas ref={canvasRef} className="hero__canvas" />
                </div>

                {/* Minimal loading indicator */}
                {loadedCount < TOTAL_FRAMES && (
                    <div className="hero__fast-loader">
                        <div className="hero__fast-loader-ring" />
                        <span>Loading... {percentLoaded}%</span>
                    </div>
                )}

                {/* Content overlaid on top, fades in smoothly at the end */}
                <div ref={contentRef} className="hero__content">
                    <h1 className="hero__headline">
                        {companyProfile.hero.title}
                    </h1>
                    <p className="hero__subhead">
                        {companyProfile.hero.subtitle}
                    </p>
                    <div className="hero__cta-group">
                        <a href="#services" className="hero__cta" id="hero-cta">
                            Explore Our Packages
                            <span className="hero__cta-arrow">→</span>
                        </a>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default HeroSection
