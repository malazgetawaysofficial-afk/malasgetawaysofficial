import './GallerySection.css'

const galleryImages = [
    { id: 1, src: '/gallery/gallery-1.jpg', alt: 'Our Office and Team' },
    { id: 2, src: '/gallery/gallery-2.jpg', alt: 'Holy Kaaba' },
    { id: 3, src: '/gallery/gallery-3.jpg', alt: 'Cleaning the Holy Mosque' },
    { id: 4, src: '/gallery/gallery-4.jpg', alt: 'Mosque Interior Cleaning' },
]

function GallerySection() {
    return (
        <section className="gallery-section" id="gallery">
            <div className="section-container">
                <div className="gallery__header">
                    <h2 className="section-title">Our Journey & Service</h2>
                    <p className="section-subtitle">Glimpses of our dedicated team and the holy sites we serve.</p>
                </div>
                <div className="gallery__grid">
                    {galleryImages.map((image) => (
                        <div key={image.id} className="gallery__item">
                            <img src={image.src} alt={image.alt} className="gallery__img" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GallerySection
