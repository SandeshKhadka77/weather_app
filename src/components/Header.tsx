function Header() {
  return (
    <header className="app-header">
      <a className="brand" href="/" aria-label="Weather app home">
        <span className="brand-mark" aria-hidden="true">
          W
        </span>
        <span>Weatherly</span>
      </a>

      <span className="header-status">Personal forecast</span>
    </header>
  )
}

export default Header
