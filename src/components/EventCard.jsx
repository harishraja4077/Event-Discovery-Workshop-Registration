import { getDateParts } from '../utils/date'
import { CalendarIcon, HeartIcon, MapPinIcon, ArrowRightIcon, CheckIcon } from './Icons'

export function EventCard({ event, isRegistered, isFavorite, onViewDetails, onToggleFavorite }) {
  const dateParts = getDateParts(event.date)

  return (
    <article className="event-card">
      <div className="event-card__media">
        <img src={event.image} alt={`${event.name} event artwork`} loading="lazy" />
        <div className="event-card__date">
          <span>{dateParts.month}</span>
          <strong>{dateParts.day}</strong>
        </div>
        <button
          type="button"
          className={`favorite-button${isFavorite ? ' is-active' : ''}`}
          onClick={() => onToggleFavorite(event.id)}
          aria-label={isFavorite ? `Remove ${event.name} from favourites` : `Add ${event.name} to favourites`}
          aria-pressed={isFavorite}
        >
          <HeartIcon filled={isFavorite} size={18} />
        </button>
      </div>

      <div className="event-card__body">
        <div className="event-card__meta">
          <span className={`category-tag category-tag--${event.category.toLowerCase()}`}>{event.category}</span>
          {isRegistered && (
            <span className="registered-tag">
              <CheckIcon size={14} /> Registered
            </span>
          )}
        </div>
        <h3>{event.name}</h3>
        <div className="event-card__info">
          <span>
            <CalendarIcon size={16} /> {event.date}
          </span>
          <span>
            <MapPinIcon size={16} /> {event.location}
          </span>
        </div>
        <div className="event-card__footer">
          <span className="seats-note">{event.seats} seats left</span>
          <button type="button" className="button button--ghost button--small" onClick={() => onViewDetails(event)}>
            View Details <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}
