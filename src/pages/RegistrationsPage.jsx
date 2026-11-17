import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { ArrowRightIcon, CalendarIcon, CheckIcon, MapPinIcon, TicketIcon, TrashIcon } from '../components/Icons'
import { getEventById } from '../data/events'
import { formatShortDate } from '../utils/date'

export function RegistrationsPage({ registrations, onCancelRegistration, onViewDetails }) {
  const [pendingCancelId, setPendingCancelId] = useState(null)

  const registeredEvents = registrations
    .map((registration) => ({ registration, event: getEventById(registration.eventId) }))
    .filter((item) => Boolean(item.event))
    .sort((a, b) => a.event.date.localeCompare(b.event.date))

  function confirmCancel(registrationId) {
    onCancelRegistration(registrationId)
    setPendingCancelId(null)
  }

  return (
    <section className="container section registrations-page">
      <div className="page-heading">
        <span className="section-kicker">Your bookings</span>
        <h1>My Registrations</h1>
        <p>Everything you've signed up for, saved on this device.</p>
      </div>

      {registeredEvents.length === 0 ? (
        <EmptyState
          title="No registrations yet"
          message="You haven't registered for any events. Explore the catalogue and save your spot at something great."
          actionLabel="Explore Events"
          actionTo="/events"
        />
      ) : (
        <>
          <div className="registration-summary-card">
            <TicketIcon size={24} />
            <div>
              <strong>{registeredEvents.length} event{registeredEvents.length === 1 ? '' : 's'} registered</strong>
              <span>Your registrations are stored in LocalStorage and stay available on this browser.</span>
            </div>
          </div>

          <div className="registration-list">
            {registeredEvents.map(({ registration, event }) => (
              <article className="registration-item" key={registration.id}>
                <div className="registration-item__image">
                  <img src={event.image} alt={`${event.name} artwork`} loading="lazy" />
                </div>

                <div className="registration-item__main">
                  <div className="event-card__meta">
                    <span className={`category-tag category-tag--${event.category.toLowerCase()}`}>{event.category}</span>
                    <span className="registered-tag">
                      <CheckIcon size={14} /> Confirmed
                    </span>
                  </div>
                  <h2>{event.name}</h2>
                  <div className="registration-item__meta">
                    <span>
                      <CalendarIcon size={16} /> {formatShortDate(event.date)}
                    </span>
                    <span>
                      <MapPinIcon size={16} /> {event.location}
                    </span>
                  </div>
                  <div className="attendee-details">
                    <div>
                      <span>Name</span>
                      <strong>{registration.name}</strong>
                    </div>
                    <div>
                      <span>Email</span>
                      <strong>{registration.email}</strong>
                    </div>
                    <div>
                      <span>Phone</span>
                      <strong>{registration.phone}</strong>
                    </div>
                  </div>
                  <p className="registered-on">
                    Registered on{' '}
                    {new Date(registration.registeredAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="registration-item__actions">
                  <button type="button" className="button button--ghost button--small" onClick={() => onViewDetails(event.id)}>
                    View Details <ArrowRightIcon size={15} />
                  </button>

                  {pendingCancelId === registration.id ? (
                    <div className="cancel-confirm">
                      <p>Cancel this registration?</p>
                      <div>
                        <button type="button" className="button button--danger button--small" onClick={() => confirmCancel(registration.id)}>
                          Yes, cancel
                        </button>
                        <button type="button" className="button button--ghost button--small" onClick={() => setPendingCancelId(null)}>
                          Keep it
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="button button--outline button--small"
                      onClick={() => setPendingCancelId(registration.id)}
                    >
                      <TrashIcon size={15} /> Cancel Registration
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="browse-more">
            <Link className="text-button" to="/events">
              Browse more events <ArrowRightIcon size={16} />
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
