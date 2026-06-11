import { IoCart } from 'react-icons/io5'
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
        <img src={product.image} alt={product.name} loading="lazy" />
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

  return (
    <section id="mahsulotlar" className="products section">
      <div className="container">
        <div className="products__header scroll-reveal" ref={headerRef}>
          <div>
            <span className="section-label">MAHSULOTLARIMIZ</span>
            <h2>Eng Mashhur Mahsulotlar</h2>
          </div>
          <button type="button" className="products__link" onClick={openCheckout}>
            Buyurtma berish <HiArrowRight aria-hidden="true" />
          </button>
        </div>
        <div className="products__grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
