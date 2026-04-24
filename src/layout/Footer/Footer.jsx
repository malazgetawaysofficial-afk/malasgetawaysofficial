import './Footer.css'
import { FOOTER_MODEL as footer } from './footerData'


/**
 * FOOTER — Contact info and copyright.
 * Dark themed to bookend with the hero.
 */
function Footer() {
    const year = new Date().getFullYear()


    return (
        <footer className="footer" id="contact">
            <div className="section-container">
                <div className="footer__inner">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <img src="/logo.jpg" alt="Malaz Getaways Logo" className="footer__logo-img" />
                            <h3 className="footer__logo-text">{footer.brandName}</h3>
                        </div>
                        <p className="footer__tagline">
                            {footer.taglineLine1}<br />
                            {footer.taglineLine2}
                        </p>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__heading">Quick Links</h4>
                        <ul>
                            {footer.quickLinks.map((link) => (
                                <li key={link.id}><a href={link.href}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__contact">
                        <h4 className="footer__heading">Get in Touch</h4>
                        <ul>
                            {footer.contactLines.map((line) => (
                                <li key={line}>{line}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© {year} {footer.brandName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
