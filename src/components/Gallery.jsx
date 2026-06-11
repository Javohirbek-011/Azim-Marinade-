import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { galleryItems } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

function GalleryItem({ item, delay, onOpen }) {
  const ref = useScrollReveal()

  return (
    <button
      type="button"
      className="gallery__item scroll-reveal"
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onOpen(item)}
      aria-label={`${item.label} rasmini ko'rish`}
    >
      <img src={item.image} alt={item.label} loading="lazy" />
      <span className="gallery__label">{item.label}</span>
    </button>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const headerRef = useScrollReveal()

  const openLightbox = (item) => {
    setLightbox(item)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  return (
    <section id="galereya" className="gallery section section--gray">
      <div className="container">
        <div className="section-header section-header--center scroll-reveal" ref={headerRef}>
          <h2>Galereya</h2>
        </div>
        <div className="gallery__grid">
          {galleryItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} delay={i * 80} onOpen={openLightbox} />
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galereya ko'rinishi">
          <button type="button" className="lightbox__close" onClick={closeLightbox} aria-label="Yopish">
            <IoClose />
          </button>
          <div className="lightbox__content" onClick={closeLightbox}>
            <img src={lightbox.image} alt={lightbox.label} />
            <span className="lightbox__label">{lightbox.label}</span>
          </div>
        </div>
      )}
    </section>
  )
}
