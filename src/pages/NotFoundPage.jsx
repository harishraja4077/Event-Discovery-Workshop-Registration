import { EmptyState } from '../components/EmptyState'

export function NotFoundPage() {
  return (
    <section className="container section">
      <EmptyState
        title="Page not found"
        message="The page you're looking for doesn't exist. Let's get you back to the events."
        actionLabel="Explore Events"
        actionTo="/events"
      />
    </section>
  )
}
