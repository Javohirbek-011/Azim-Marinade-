function CrownIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 22h32M6 22L10 10l6 5 4-8 4 8 6-5 4 12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="20" cy="7" r="1.5" fill="currentColor" />
      <circle cx="30" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ size = 'md', variant = 'full', onClick }) {
  if (variant === 'icon') {
    return (
      <a
        href="#bosh-sahifa"
        className={`logo logo--icon logo--${size}`}
        onClick={onClick}
        aria-label="AZIM bosh sahifa"
      >
        <CrownIcon className="logo__crown-svg" />
      </a>
    )
  }

  return (
    <a href="#bosh-sahifa" className={`logo logo--${size}`} onClick={onClick} aria-label="AZIM bosh sahifa">
      <CrownIcon className="logo__crown" />
      <span className="logo__text">AZIM</span>
      <span className="logo__arc" aria-hidden="true" />
    </a>
  )
}
