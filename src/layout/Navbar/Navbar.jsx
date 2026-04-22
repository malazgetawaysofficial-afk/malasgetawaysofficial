import { useState, useEffect, useRef } from 'react'
import { NAVIGATION_MODEL as nav } from './navbarData'
import './Navbar.css'

/**
 * Navbar — Fixed top navigation bar.
 * Starts transparent over the hero, gains backdrop-blur on scroll.
 */
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
            <div className="navbar__inner">
                <a href="/" className="navbar__logo" id="navbar-logo">
                    <img src="/logo.png" alt="Malaz Getaways Logo" className="navbar__logo-img" />
                    <span className="navbar__logo-text">{nav.brandName}</span>
                </a>
                <div className="navbar__actions">
                    <ul className="navbar__links" id="navbar-links">
                        {nav.links.map((link) => (
                            <li key={link.id}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                    <a href={nav.customerDetailsButton.href} className="navbar__cta navbar__customer-btn">
                        {nav.customerDetailsButton.label}
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
