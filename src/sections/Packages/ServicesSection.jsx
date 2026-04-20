import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PACKAGES_HEADER as header, PACKAGES_CARDS as packages } from './packagesData'
import { TRAVEL_FORM_PREFILL_STORAGE_KEY } from '../../constants/storageKeys'
import './ServicesSection.css'

gsap.registerPlugin(ScrollTrigger)

function ServicesSection() {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])

    const storePackagePrefill = (packageType) => {
        try {
            sessionStorage.setItem(
                TRAVEL_FORM_PREFILL_STORAGE_KEY,
                JSON.stringify({ packageType })
            )
        } catch (_e) {
            /* ignore */
        }
    }

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean)
        if (!cards.length) return

        gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.12,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                    toggleActions: 'play none none none',
                },
            }
        )

        return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    }, [packages])

    return (
        <section ref={sectionRef} className="packages" id="services">
            <div className="section-container">
                <div className="packages__top">
                    <div className="packages__top-text">
                        <span className="packages__label">{header.label}</span>
                        <h2 className="packages__title">{header.title}</h2>
                    </div>
                    <p className="packages__desc">{header.description}</p>
                    <a className="packages__cta" href={header.viewAllHref}>
                        {header.viewAllLabel}
                    </a>
                </div>

                <div className="packages__grid">
                    {packages.map((pkg, i) => (
                        <a
                            key={pkg.id}
                            ref={(el) => {
                                cardsRef.current[i] = el
                            }}
                            href="#booking-form"
                            className="packages__card packages__card--link"
                            onClick={() => storePackagePrefill(pkg.title)}
                        >
                            <div
                                className="packages__card-image"
                                style={{ backgroundImage: `url(${pkg.imageUrl})` }}
                            />
                            <div className="packages__card-body">
                                <h3 className="packages__card-title">{pkg.title}</h3>
                                <p className="packages__card-desc">{pkg.description}</p>
                                {pkg.days && <p className="packages__card-days">⏳ {pkg.days}</p>}
                                <div className="packages__card-line" />
                                <p className="packages__card-price">
                                    From <strong>Price: {pkg.price}</strong>
                                </p>
                                <span className="packages__card-book">
                                    BOOK NOW <span>→</span>
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection
