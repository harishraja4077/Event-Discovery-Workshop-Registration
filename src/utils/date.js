const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' })
const dayFormatter = new Intl.DateTimeFormat('en-US', { day: '2-digit' })

function toDate(date) {
  return new Date(`${date}T00:00:00`)
}

export function formatEventDate(date) {
  return dateFormatter.format(toDate(date))
}

export function formatShortDate(date) {
  return shortDateFormatter.format(toDate(date))
}

export function getDateParts(date) {
  const parsed = toDate(date)
  return {
    month: monthFormatter.format(parsed).toUpperCase(),
    day: dayFormatter.format(parsed),
  }
}

export function sortByDate(items) {
  return [...items].sort((a, b) => a.date.localeCompare(b.date))
}
