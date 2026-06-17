import { useState } from 'react'
import { IoCart, IoChevronDown } from 'react-icons/io5'
import { HiArrowRight } from 'react-icons/hi'
import { products } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'

function ProductCard({ product, delay }) {
  const ref = useScrollReveal()
  const { addToCart } = useApp()

  return (
    <article className="product-card scroll-reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="product-card__image">
        <img src={product.image} alt={`${product.name} - AZIM Marinade mahsuloti`} loading="lazy" />
      </div>
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <span className="product-card__weight">{product.weight}</span>
        <div className="product-card__footer">
          <span className="product-card__price">{product.price}</span>
          <button
            type="button"
            className="product-card__cart"
            aria-label={`${product.name} savatga qo'shish`}
            onClick={() => addToCart(product)}
          >
            <IoCart />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Products() {
  const headerRef = useScrollReveal()
  const { openCheckout } = useApp()
  const [showAll, setShowAll] = useState(false)

  // Faqat 8ta mahsulot ko'rsatish yoki hammasini
  const displayedProducts = showAll ? products : products.slice(0, 10)
  const hasMore = products.length > 8

  return (
    <section id="mahsulotlar" className="products section">
      <div className="container">
        <div className="products__header scroll-reveal" ref={headerRef}>
          <div>
            <span className="section-label">MAHSULOTLARIMIZ</span>
            <h2>Bizning Mahsulotlarimiz</h2>
          </div>
          <button type="button" className="products__link" onClick={openCheckout}>
            Buyurtma berish <HiArrowRight aria-hidden="true" />
          </button>
        </div>
        <div className="products__grid">
          {displayedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
        {hasMore && (
          <div className="products__more">
            <button 
              type="button" 
              className="btn btn--outline-dark"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Kamroq ko'rish" : "Ko'proq ko'rish"}
              <IoChevronDown style={{ transform: showAll ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
