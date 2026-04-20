import { ABOUT_MODEL as about, ABOUT_DETAILS_FEATURES as features } from './aboutData'
import { useYourDetailsFormController } from './useYourDetailsFormController'
import './AboutDetailsSection.css'

function AboutDetailsSection() {
    const {
        formModel,
        values,
        isSubmitting,
        statusMessage,
        statusType,
        onFieldChange,
        onSubmit,
    } = useYourDetailsFormController()

    return (
        <section className="about-details" id="about">
            <div className="section-container">
                <div className="about-details__grid">
                    <div className="about-details__left">
                        <span className="about-details__label">{about.label}</span>
                        <h2 className="about-details__title">
                            {about.titleLine1}
                            <br />
                            <span className="about-details__title-accent">{about.titleAccent}</span>
                        </h2>
                        {about.paragraphs.map((text) => (
                            <p key={text} className="about-details__text">
                                {text}
                            </p>
                        ))}
                        <div className="about-details__features">
                            {features.map((f) => (
                                <div
                                    key={f.id}
                                    className={`about-details__feature about-details__feature--${f.variant}`}
                                >
                                    <div className="about-details__feature-icon" aria-hidden>
                                        {f.variant === 'orange' ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="about-details__feature-title">{f.title}</h3>
                                        <p className="about-details__feature-desc">{f.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-details__card">
                        <h3 className="about-details__form-title">{formModel.title}</h3>
                        <p className="about-details__form-sub">{formModel.subtitle}</p>
                        <form className="about-details__form" onSubmit={onSubmit}>
                            <div className="about-details__form-grid">
                                {formModel.fields.map((field) => (
                                    <label key={field.name} className="about-details__field">
                                        <span className="about-details__field-label">
                                            {field.label} <span className="about-details__req">*</span>
                                        </span>
                                        <input
                                            name={field.name}
                                            type={field.type || 'text'}
                                            value={values[field.name]}
                                            onChange={onFieldChange}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                        />
                                        {field.helper ? (
                                            <span className="about-details__helper">{field.helper}</span>
                                        ) : null}
                                    </label>
                                ))}
                            </div>
                            <button className="about-details__submit" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : formModel.submitText}
                            </button>
                            {statusMessage ? (
                                <p className={`about-details__status about-details__status--${statusType}`}>
                                    {statusMessage}
                                </p>
                            ) : null}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutDetailsSection
