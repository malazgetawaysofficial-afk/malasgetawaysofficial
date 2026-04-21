import './CallToActionSection.css'

function CallToActionSection() {
    return (
        <section className="cta-section">
            <div className="section-container">
                <div className="cta-section__content">
                    <h2 className="cta-section__title">Ready to Start Your Sacred Journey?</h2>
                    <p className="cta-section__subtitle">
                        Join thousands of pilgrims who have experienced a seamless and spiritually 
                        enriching Hajj and Umrah journey with Arabian Overseas.
                    </p>
                    <a href="#about" className="cta-section__button">
                        Book Your Sacred Journey Now
                        <span className="cta-section__button-icon">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CallToActionSection
