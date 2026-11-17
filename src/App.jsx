import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { EventDetailsModal } from './components/EventDetailsModal'
import { HomePage } from './pages/HomePage'
import { EventsPage } from './pages/EventsPage'
import { RegistrationsPage } from './pages/RegistrationsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { events as allEvents, getEventById } from './data/events'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [registrations, setRegistrations] = useLocalStorage('evently:registrations', [])
  const [favorites, setFavorites] = useLocalStorage('evently:favorites', [])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  function handleRegister(eventId, details) {
    setRegistrations((current) => {
      if (current.some((registration) => registration.eventId === eventId)) {
        return current
      }

      return [
        ...current,
        {
          id: `reg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          eventId,
          ...details,
          registeredAt: new Date().toISOString(),
        },
      ]
    })
  }

  function handleCancelRegistration(registrationId) {
    setRegistrations((current) => current.filter((registration) => registration.id !== registrationId))
  }

  function handleToggleFavorite(eventId) {
    setFavorites((current) =>
      current.includes(eventId) ? current.filter((id) => id !== eventId) : [...current, eventId],
    )
  }

  function handleViewDetails(event) {
    setSelectedEvent(event)
  }

  function handleGoToRegistrations() {
    setSelectedEvent(null)
    navigate('/registrations')
  }

  return (
    <div className="app-shell">
      <Navbar registrationsCount={registrations.length} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                events={allEvents}
                registrations={registrations}
                favorites={favorites}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsPage
                events={allEvents}
                registrations={registrations}
                favorites={favorites}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/registrations"
            element={
              <RegistrationsPage
                registrations={registrations}
                onCancelRegistration={handleCancelRegistration}
                onViewDetails={(eventId) => {
                  const event = getEventById(eventId)
                  if (event) {
                    handleViewDetails(event)
                  }
                }}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {selectedEvent && (
        <EventDetailsModal
          key={selectedEvent.id}
          event={selectedEvent}
          registrations={registrations}
          isFavorite={favorites.includes(selectedEvent.id)}
          onToggleFavorite={handleToggleFavorite}
          onRegister={handleRegister}
          onClose={() => setSelectedEvent(null)}
          onGoToRegistrations={handleGoToRegistrations}
        />
      )}
    </div>
  )
}

export default App
