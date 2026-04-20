import Navbar from '../Navbar/Navbar'
import HeroSection from '../../sections/HeroSection/HeroSection'
import ServicesSection from '../../sections/Packages/ServicesSection'
import WhyChooseSection from '../../sections/WhyChooseUs/WhyChooseSection'
import ProcessSection from '../../sections/AboutUs/ProcessSection'
import AboutDetailsSection from '../../sections/AboutUs/AboutDetailsSection'
import CustomerDetailsFormSection from '../../sections/BookingForm/CustomerDetailsFormSection'
import TestimonialsSection from '../../sections/Testimonials/TestimonialsSection'
import DestinationsSection from '../../sections/Destinations/DestinationsSection'
import Footer from '../Footer/Footer'
import '../../App.css'

const SECTION_COMPONENTS = {
    navbar: Navbar,
    hero: HeroSection,
    services: ServicesSection,
    whyChoose: WhyChooseSection,
    process: ProcessSection,
    aboutDetails: AboutDetailsSection,
    destinations: DestinationsSection,
    testimonials: TestimonialsSection,
    form: CustomerDetailsFormSection,
    footer: Footer,
}

function AppView({ sectionOrder }) {
    return (
        <div className="app">
            {sectionOrder.map((sectionKey) => {
                const SectionComponent = SECTION_COMPONENTS[sectionKey]
                if (!SectionComponent) return null
                return <SectionComponent key={sectionKey} />
            })}
        </div>
    )
}

export default AppView

