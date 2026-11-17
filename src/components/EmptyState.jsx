import { Link } from 'react-router-dom'
import { TicketIcon } from './Icons'

export function EmptyState({ title, message, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <TicketIcon size={34} />
      </span>
      <h2>{title}</h2>
      <p>{message}</p>
      {actionTo ? (
        <Link className="button button--primary" to={actionTo}>
          {actionLabel}
        </Link>
      ) : (
        <button type="button" className="button button--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
