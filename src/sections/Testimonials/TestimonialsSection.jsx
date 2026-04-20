import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TESTIMONIALS_MODEL } from './testimonialsData'
import './TestimonialsSection.css'

gsap.registerPlugin(ScrollTrigger)

function TestimonialsSection() {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])
    const { header, testimonials } = TESTIMONIALS_MODEL

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean)
        if (!cards.length) return

        gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        )

        return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    }, [testimonials])

    return (
        <section ref={sectionRef} className="testimonials" id="testimonials">
            <div className="section-container">
                <div className="testimonials__header">
                    <span className="testimonials__label">{header.label}</span>
                    <h2 className="testimonials__title">{header.title}</h2>
                    <p className="testimonials__desc">{header.description}</p>
                </div>

                <div className="testimonials__grid">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.id}
                            ref={(el) => {
                                cardsRef.current[i] = el
                            }}
                            className="testimonials__card"
                        >
                            <p className="testimonials__card-text">"{t.text}"</p>
                            <p className="testimonials__card-author">- {t.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
