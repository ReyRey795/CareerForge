type HeaderProps = {
  title: string
}

function Header({ title }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-container">
        <a className="brand" href="/" aria-label={`${title} home`}>
          <span className="brand-logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img">
              <path
                d="M24 3 42 13.5v21L24 45 6 34.5v-21L24 3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M31.5 17.5A10 10 0 1 0 31 31"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          </span>

          <span className="brand-name">{title}</span>
        </a>

        <span className="header-badge">
          <span className="status-dot" />
          Portfolio Project
        </span>
      </div>
    </header>
  )
}

export default Header