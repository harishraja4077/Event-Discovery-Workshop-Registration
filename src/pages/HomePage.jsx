import { Link } from 'react-router-dom'
import { EventCard } from '../components/EventCard'
import { ArrowRightIcon, CalendarIcon, MapPinIcon, SparkleIcon, UsersIcon } from '../components/Icons'
import { CATEGORIES, categoryImages, heroBanner } from '../data/events'
import { formatEventDate, sortByDate } from '../utils/date'

export function HomePage({ events, registrations, favorites, onViewDetails, onToggleFavorite }) {
  const featuredEvents = sortByDate(events.filter((event) => event.featured))
  const heroEvent = featuredEvents[0]
  const upcomingEvents = sortByDate(events.filter((event) => !event.featured)).slice(0, 4)
  const registeredIds = registrations.map((registration) => registration.eventId)

  function cardProps(event) {
    return {
      event,
      isRegistered: registeredIds.includes(event.id),
      isFavorite: favorites.includes(event.id),
      onViewDetails,
      onToggleFavorite,
    }
  }

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: `linear-gradient(110deg, rgba(2,6,23,.96), rgba(15,23,42,.84), rgba(76,29,149,.55)), url(${heroBanner})` }}
      >
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <SparkleIcon size={15} /> Featured event
            </span>
            <h1>
              Discover events worth <span>showing up for.</span>
            </h1>
            <p>
              Find workshops, talks, and hands-on experiences led by people who know their craft. Your next big idea
              starts here.
            </p>

            <div className="hero-meta">
              <span>
                <CalendarIcon size={18} /> {formatEventDate(heroEvent.date)}
              </span>
              <span>
                <MapPinIcon size={18} /> {heroEvent.location}
              </span>
            </div>

            <div className="hero-actions">
              <Link className="button button--primary button--large" to="/events">
                Explore Events <ArrowRightIcon size={18} />
              </Link>
              <button type="button" className="button button--outline button--large" onClick={() => onViewDetails(heroEvent)}>
                View Details
              </button>
            </div>
          </div>

          <aside className="hero-spotlight">
            <div className="hero-spotlight__image">
              <img src={heroEvent.image} alt={`${heroEvent.name} artwork`} />
              <span className={`category-tag category-tag--${heroEvent.category.toLowerCase()}`}>
                {heroEvent.category}
              </span>
            </div>
            <div className="hero-spotlight__body">
              <h2>{heroEvent.name}</h2>
              <p>{heroEvent.description}</p>
              <div className="hero-spotlight__footer">
                <span>
                  <UsersIcon size={17} /> {heroEvent.seats} seats left
                </span>
                <button type="button" className="text-button" onClick={() => onViewDetails(heroEvent)}>
                  Register now <ArrowRightIcon size={15} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-grid">
          <div>
            <strong>{events.length}+</strong>
            <span>Curated events</span>
          </div>
          <div>
            <strong>{CATEGORIES.length}</strong>
            <span>Focus areas</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Hands-on learning</span>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Don't miss these</span>
            <h2>Featured events</h2>
            <p>Handpicked experiences that are filling up fast.</p>
          </div>
          <Link className="text-button" to="/events">
            View all events <ArrowRightIcon size={16} />
          </Link>
        </div>
        <div className="event-grid">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} {...cardProps(event)} />
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Find your track</span>
              <h2>Browse by category</h2>
              <p>Explore events built around the skills you want to grow.</p>
            </div>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                className="category-card"
                to={`/events?category=${encodeURIComponent(category)}`}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(2,6,23,.2), rgba(2,6,23,.88)), url(${categoryImages[category]})` }}
              >
                <span className="category-card__count">
                  {events.filter((event) => event.category === category).length} events
                </span>
                <div>
                  <h3>{category}</h3>
                  <span>
                    Explore <ArrowRightIcon size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Mark your calendar</span>
            <h2>Upcoming workshops</h2>
            <p>Practical sessions you can join next.</p>
          </div>
          <Link className="text-button" to="/events">
            See everything <ArrowRightIcon size={16} />
          </Link>
        </div>
        <div className="event-grid">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} {...cardProps(event)} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="cta-banner">
          <div>
            <span className="section-kicker">Ready when you are</span>
            <h2>Your next workshop is one click away.</h2>
            <p>Search, filter, save favourites, and keep every registration in one place.</p>
          </div>
          <Link className="button button--primary button--large" to="/events">
            Explore Events <ArrowRightIcon size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
