import { useState } from 'react'
import { Modal } from './Modal'
import { RegistrationForm } from './RegistrationForm'
import { CalendarIcon, MapPinIcon, UsersIcon, HeartIcon, TicketIcon, ArrowRightIcon } from './Icons'
import { formatEventDate } from '../utils/date'

export function EventDetailsModal({
  event,
  registrations,
  isFavorite,
  onToggleFavorite,
  onRegister,
  onClose,
  onGoToRegistrations,
}) {
  const [view, setView] = useState('details')
  const existingRegistration = registrations.find((registration) => registration.eventId === event.id)
  const isRegistered = Boolean(existingRegistration)

  return (
    <Modal
      title={view === 'details' ? event.name : 'Event registration'}
      onClose={onClose}
      wide={view === 'details'}
    >
      {view === 'details' ? (
        <div className="event-details">
          <div className="event-details__banner">
            <img src={event.image} alt={`${event.name} banner`} />
            <span className={`category-tag category-tag--${event.category.toLowerCase()}`}>{event.category}</span>
          </div>

          <div className="event-details__content">
            <div className="event-details__meta">
              <span>
                <CalendarIcon size={18} /> {formatEventDate(event.date)}
              </span>
              <span>
                <MapPinIcon size={18} /> {event.location}
              </span>
              <span>
                <UsersIcon size={18} /> {event.seats} seats remaining
              </span>
            </div>

            <h3>About this event</h3>
            <p>{event.description}</p>

            <p className="event-details__hint">
              This is a sample event. Registration is saved locally on your device — no payment is collected.
            </p>

            <div className="event-details__actions">
              <button type="button" className="button button--primary" onClick={() => setView('register')}>
                {isRegistered ? 'View Registration' : 'Register Now'} <ArrowRightIcon size={16} />
              </button>
              <button
                type="button"
                className={`button button--outline${isFavorite ? ' is-active' : ''}`}
                onClick={() => onToggleFavorite(event.id)}
                aria-pressed={isFavorite}
              >
                <HeartIcon filled={isFavorite} size={17} /> {isFavorite ? 'Saved to Favourites' : 'Add to Favourites'}
              </button>
            </div>

            {isRegistered && (
              <p className="inline-status">
                <TicketIcon size={16} /> You are already registered for this event.
              </p>
            )}
          </div>
        </div>
      ) : (
        <RegistrationForm
          event={event}
          existingRegistration={existingRegistration}
          onRegister={onRegister}
          onClose={onClose}
          onGoToRegistrations={onGoToRegistrations}
        />
      )}
    </Modal>
  )
}
