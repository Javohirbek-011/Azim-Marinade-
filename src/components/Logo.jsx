export default function Logo({ size = 'md', variant = 'full', onClick }) {
  if (variant === 'icon') {
    return (
      <a
        href="#bosh-sahifa"
        className={`logo logo--icon logo--${size}`}
        onClick={onClick}
        aria-label="AZIM MARINADE bosh sahifa"
      >
        <img 
          src="/azim-logo.jpg" 
          alt="AZIM Marinade logotipi" 
          className="logo__image"
        />
      </a>
    )
  }

  return (
    <a href="#bosh-sahifa" className={`logo logo--${size}`} onClick={onClick} aria-label="AZIM MARINADE bosh sahifa">
      <img 
        src="/azim-logo.jpg" 
        alt="AZIM Marinade logotipi" 
        className="logo__image"
      />
    </a>
  )
}
