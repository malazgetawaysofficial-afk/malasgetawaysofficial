import './Footer.css'
import { FOOTER_MODEL as footer } from './footerData'
import { useContactFormController } from '../../sections/BookingForm/useContactFormController'

/**
 * FOOTER — Contact info and copyright.
 * Dark themed to bookend with the hero.
 */
function Footer() {
    const year = new Date().getFullYear()
    const {
        formModel,
        values,
        isSubmitting,
        statusMessage,
        statusType,
        onFieldChange,
        onSubmit,
    } = useContactFormController()

    return (
        <footer className="footer" id="contact">
            <div className="section-container">
                <div className="footer__form-wrap">
                    <div className="footer__form-header">
                        <h3>{formModel.heading}</h3>
                        <p>{formModel.subheading}</p>
                    </div>
                    <form className="footer__form" onSubmit={onSubmit}>
                        {formModel.fields.map((field) => (
                            <label className="footer__form-field" key={field.name}>
                                <span>{field.label}</span>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={onFieldChange}
                                        required={field.required}
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={onFieldChange}
                                        required={field.required}
                                    />
                                )}
                            </label>
                        ))}
                        <button className="footer__form-submit" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : formModel.submitText}
                        </button>
                        {statusMessage ? (
                            <p className={`footer__form-status footer__form-status--${statusType}`}>
                                {statusMessage}
                            </p>
                        ) : null}
                    </form>
                </div>

                <div className="footer__inner">
                    <div className="footer__brand">
                        <h3 className="footer__logo">
                            <span className="footer__logo-icon">{footer.logoIcon}</span>
                            {footer.brandName}
                        </h3>
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
