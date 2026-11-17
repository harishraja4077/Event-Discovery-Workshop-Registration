import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EventCard } from '../components/EventCard'
import { EmptyState } from '../components/EmptyState'
import { SearchIcon, SlidersIcon } from '../components/Icons'
import { CATEGORIES, locations } from '../data/events'
import { sortByDate } from '../utils/date'

export function EventsPage({ events, registrations, favorites, onViewDetails, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const category = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All'
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('date-asc')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const filteredEvents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const result = events.filter((event) => {
      const matchesSearch = query === '' || event.name.toLowerCase().includes(query)
      const matchesCategory = category === 'All' || event.category === category
      const matchesLocation = locationFilter === 'All' || event.location === locationFilter
      const matchesFavorites = !favoritesOnly || favorites.includes(event.id)
      return matchesSearch && matchesCategory && matchesLocation && matchesFavorites
    })

    const sorted = sortByDate(result)
    return sortOrder === 'date-desc' ? sorted.reverse() : sorted
  }, [events, searchTerm, category, locationFilter, favoritesOnly, favorites, sortOrder])

  const hasActiveFilters =
    searchTerm !== '' || category !== 'All' || locationFilter !== 'All' || sortOrder !== 'date-asc' || favoritesOnly

  function handleCategoryChange(value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value === 'All') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', value)
    }
    setSearchParams(nextParams, { replace: true })
  }

  function clearFilters() {
    setSearchTerm('')
    setLocationFilter('All')
    setSortOrder('date-asc')
    setFavoritesOnly(false)
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  const registeredIds = registrations.map((registration) => registration.eventId)

  return (
    <section className="container section events-page">
      <div className="page-heading">
        <span className="section-kicker">Event catalogue</span>
        <h1>Explore Events</h1>
        <p>Browse every upcoming event and find the one that fits your next goal.</p>
      </div>

      <div className="filter-panel">
        <div className="search-field">
          <SearchIcon size={20} />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search events by name..."
            aria-label="Search events by name"
          />
        </div>

        <div className="filter-controls">
          <label>
            <span>Category</span>
            <select value={category} onChange={(event) => handleCategoryChange(event.target.value)}>
              <option value="All">All categories</option>
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Location</span>
            <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
              <option value="All">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Sort by</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="date-asc">Date: soonest first</option>
              <option value="date-desc">Date: latest first</option>
            </select>
          </label>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => setFavoritesOnly(event.target.checked)}
            />
            <span>Favourites only</span>
          </label>
        </div>

        <div className="filter-summary">
          <span>
            <SlidersIcon size={16} /> {filteredEvents.length} event{filteredEvents.length === 1 ? '' : 's'} found
          </span>
          {hasActiveFilters && (
            <button type="button" className="text-button" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="event-grid event-grid--catalogue">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isRegistered={registeredIds.includes(event.id)}
              isFavorite={favorites.includes(event.id)}
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events found"
          message="Try a different search term or reset your filters to see all events."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      )}
    </section>
  )
}
