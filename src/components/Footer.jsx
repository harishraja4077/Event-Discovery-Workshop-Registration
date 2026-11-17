import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.webp'
import { ArrowRightIcon, HeartIcon, SparkleIcon } from './Icons'
import { CATEGORIES } from '../data/events'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <span className="eyebrow">
              <SparkleIcon size={15} /> Keep discovering
            </span>
            <h2>Find something worth showing up for.</h2>
            <p>New workshops, fresh ideas, and people who love learning together.</p>
          </div>
          <Link className="button button--primary button--large" to="/events">
            Explore Events <ArrowRightIcon size={18} />
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-about">
            <Link className="brand brand--footer" to="/" aria-label="Stackly home">
              <img className="brand__logo" src={logo} alt="" width="951" height="262" />
            </Link>
            <p>
              A simple place to discover events, save your favourites, and keep every registration in one tidy spot.
            </p>
            <span className="footer-pill">
              <HeartIcon size={14} filled /> Made for curious people
            </span>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/events">All events</Link>
            <Link to="/registrations">My registrations</Link>
            <Link to="/events?category=Technology">Workshops</Link>
          </div>

          <div className="footer-column">
            <h3>Categories</h3>
            {CATEGORIES.map((category) => (
              <Link key={category} to={`/events?category=${encodeURIComponent(category)}`}>
                {category}
              </Link>
            ))}
          </div>

          <div className="footer-column">
            <h3>Good to know</h3>
            <span>No payment required</span>
            <span>Saved on this device</span>
            <span>Cancel any time</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Stackly. Built with React.</p>
          <button type="button" className="text-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowRightIcon size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
