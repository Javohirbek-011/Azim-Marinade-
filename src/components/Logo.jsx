export default function Logo({ size = 'md', variant = 'full', onClick }) {
  if (variant === 'icon') {
    return (
      <a
        href="#bosh-sahifa"
        className={`logo logo--icon logo--${size}`}
        onClick={onClick}
        aria-label="AZIM MAHSULOTLARI bosh sahifa"
      >
        <img 
          src="/images/azim-logo.svg" 
          alt="AZIM" 
          className="logo__image"
        />
      </a>
    )
  }

  return (
    <a href="#bosh-sahifa" className={`logo logo--${size}`} onClick={onClick} aria-label="AZIM MAHSULOTLARI bosh sahifa">
      <img 
        src="/images/azim-logo.svg" 
        alt="AZIM MAHSULOTLARI" 
        className="logo__image"
      />
    </a>
  )
}
