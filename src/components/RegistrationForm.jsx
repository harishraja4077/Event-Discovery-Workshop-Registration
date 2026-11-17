import { useState } from 'react'
import { CheckIcon, TicketIcon, ArrowRightIcon } from './Icons'
import { formatEventDate } from '../utils/date'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+]?[\d\s().-]{7,}$/

export function RegistrationForm({ event, existingRegistration, onRegister, onClose, onGoToRegistrations }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function validate() {
    const nextErrors = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Enter your full name.'
    }
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!phonePattern.test(form.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number.'
    }

    return nextErrors
  }

  function handleSubmit(submitEvent) {
    submitEvent.preventDefault()

    if (existingRegistration) {
      setErrors({ form: 'You are already registered for this event.' })
      return
    }

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const details = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    }

    onRegister(event.id, details)
    setConfirmation(details)
  }

  if (existingRegistration && !confirmation) {
    return (
      <div className="notice notice--info">
        <TicketIcon size={28} />
        <h3>You're already registered</h3>
        <p>
          This event is saved in My Registrations under <strong>{existingRegistration.name}</strong>. Duplicate
          registrations are disabled.
        </p>
        <div className="notice__actions">
          <button type="button" className="button button--primary" onClick={onGoToRegistrations}>
            View My Registrations <ArrowRightIcon size={16} />
          </button>
          <button type="button" className="button button--ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  }

  if (confirmation) {
    return (
      <div className="notice notice--success">
        <span className="success-mark">
          <CheckIcon size={30} />
        </span>
        <h3>You're registered!</h3>
        <p>
          Your spot for <strong>{event.name}</strong> is confirmed. A confirmation has been prepared for{' '}
          <strong>{confirmation.email}</strong>.
        </p>
        <p className="notice__detail">
          {formatEventDate(event.date)} · {event.location}
        </p>
        <div className="notice__actions">
          <button type="button" className="button button--primary" onClick={onGoToRegistrations}>
            View My Registrations <ArrowRightIcon size={16} />
          </button>
          <button type="button" className="button button--ghost" onClick={onClose}>
            Keep Exploring
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="registration-form">
      <div className="registration-summary">
        <img src={event.image} alt="" />
        <div>
          <strong>{event.name}</strong>
          <span>
            {formatEventDate(event.date)} · {event.location}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <p className="form-error form-error--global">{errors.form}</p>}

        <div className="field">
          <label htmlFor="registrant-name">Full name</label>
          <input
            id="registrant-name"
            type="text"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Alex Morgan"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p className="form-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="registrant-email">Email address</label>
          <input
            id="registrant-email"
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="alex@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p className="form-error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="registrant-phone">Phone number</label>
          <input
            id="registrant-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder="+1 555 010 2030"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p className="form-error" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="button button--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button button--primary">
            Confirm Registration
          </button>
        </div>
      </form>
    </div>
  )
}
