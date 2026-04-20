import { WHY_CHOOSE_MODEL as whyChoose } from './whyChooseData'
import './WhyChooseSection.css'

function WhyChooseSection() {

    return (
        <section className="why-choose" id="why-choose">
            <div className="why-choose__inner">
                <div
                    className="why-choose__image"
                    style={{ backgroundImage: `url(${whyChoose.imageUrl})` }}
                    role="img"
                    aria-label="Travellers planning journey"
                />
                <div className="why-choose__content">
                    <span className="why-choose__label">{whyChoose.label}</span>
                    <h2 className="why-choose__title">{whyChoose.title}</h2>
                    <p className="why-choose__intro">{whyChoose.intro}</p>
                    <div className="why-choose__grid">
                        {whyChoose.features.map((item) => (
                            <div key={item.id} className="why-choose__item">
                                <div className="why-choose__item-icon" aria-hidden>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="why-choose__item-title">{item.title}</h3>
                                    <p className="why-choose__item-desc">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseSection
