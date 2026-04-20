import { PROCESS_SECTION_MODEL as process } from './processData'
import './ProcessSection.css'

function ProcessSection() {

    return (
        <section className="process" id="process">
            <div className="section-container">
                <header className="process__header">
                    <span className="process__label">{process.label}</span>
                    <h2 className="process__title">{process.title}</h2>
                    <p className="process__desc">{process.description}</p>
                </header>

                <div className="process__steps">
                    {process.steps.map((step, index) => (
                        <div key={step.id} className="process__step-wrap">
                            {index > 0 ? <div className="process__arrow" aria-hidden /> : null}
                            <article className="process__step">
                                <div className="process__step-badge">{step.id}</div>
                                <div className="process__step-icon" aria-hidden>
                                    <span className="process__step-icon-emoji">{step.icon}</span>
                                </div>
                                <h3 className="process__step-title">{step.title}</h3>
                                <p className="process__step-text">{step.description}</p>
                            </article>
                        </div>
                    ))}
                </div>

                <div className="process__partners">
                    <div className="process__partners-line" />
                    <ul className="process__partners-list">
                        {process.partners.map((p) => (
                            <li key={p.id} className="process__partner">
                                {p.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default ProcessSection
