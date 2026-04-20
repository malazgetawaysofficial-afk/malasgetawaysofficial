import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESTINATIONS_MODEL } from './destinationsData'
import './DestinationsSection.css'

gsap.registerPlugin(ScrollTrigger)

function DestinationsSection() {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])
    const { header, destinations } = DESTINATIONS_MODEL

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean)
        if (!cards.length) return

        gsap.fromTo(
            cards,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        )

        return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    }, [destinations])

    return (
        <section ref={sectionRef} className="destinations" id="destinations">
            <div className="section-container">
                <div className="destinations__top">
                    <div className="destinations__top-text">
                        <span className="destinations__label">{header.label}</span>
                        <h2 className="destinations__title">{header.title}</h2>
                    </div>
                </div>

                <div className="destinations__grid">
                    {destinations.map((dest, i) => (
                        <div
                            key={dest.id}
                            ref={(el) => {
                                cardsRef.current[i] = el
                            }}
                            className="destinations__card"
                            style={{ backgroundImage: `url(${dest.image})` }}
                        >
                            <div className="destinations__card-overlay" />
                            <div className="destinations__card-content">
                                <h3 className="destinations__card-title">{dest.name}</h3>
                                <p className="destinations__card-tours">{dest.tours}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DestinationsSection
