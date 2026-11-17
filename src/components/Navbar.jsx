import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../Assets/logo.webp'
import { CloseIcon } from './Icons'

export function Navbar({ registrationsCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/events', label: 'Explore Events' },
    { to: '/registrations', label: 'My Registrations' },
  ]

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.classList.add('nav-open')

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth > 720) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.classList.remove('nav-open')
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen])

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <div className="container nav-wrapper">
        <Link className="brand" to="/" aria-label="Stackly home" onClick={() => setMenuOpen(false)}>
          <img className="brand__logo" src={logo} alt="" width="951" height="262" />
        </Link>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          <div className="nav-mobile-heading">
            <div>
              <span className="section-kicker">Menu</span>
              <p>Discover workshops and events built for your next step.</p>
            </div>
            <button type="button" className="nav-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
              <CloseIcon size={22} />
            </button>
          </div>

          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                {link.to === '/registrations' && registrationsCount > 0 && (
                  <span className="nav-count">{registrationsCount}</span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="nav-mobile-footer">
            <span>Registrations are saved on this device.</span>
            <Link to="/events" onClick={() => setMenuOpen(false)}>
              Browse all events
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
