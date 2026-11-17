import categoryTechnologyImage from '../../Assets/category-technology.webp'
import categoryBusinessImage from '../../Assets/category-business.webp'
import categoryDesignImage from '../../Assets/category-design.webp'
import categoryEducationImage from '../../Assets/category-education.webp'
import heroImage from '../../Assets/hero.webp'
import reactEventImage from '../../Assets/event-react.webp'
import designBootcampImage from '../../Assets/event-design-bootcamp.webp'
import aiBusinessImage from '../../Assets/event-ai-business.webp'
import dataAnalyticsImage from '../../Assets/event-data-analytics.webp'
import brandingImage from '../../Assets/event-branding.webp'
import startupPitchImage from '../../Assets/event-startup-pitch.webp'
import modernCssImage from '../../Assets/event-modern-css.webp'
import uxResearchImage from '../../Assets/event-ux-research.webp'
import marketingImage from '../../Assets/event-marketing.webp'
import writingImage from '../../Assets/event-writing.webp'
import cloudImage from '../../Assets/event-cloud.webp'
import publicSpeakingImage from '../../Assets/event-public-speaking.webp'

export const CATEGORIES = ['Technology', 'Business', 'Design', 'Education']

export const categoryImages = {
  Technology: categoryTechnologyImage,
  Business: categoryBusinessImage,
  Design: categoryDesignImage,
  Education: categoryEducationImage,
}

export const heroBanner = heroImage

export const events = [
  {
    id: 'react-frontend-masterclass',
    name: 'React & Frontend Masterclass',
    date: '2026-12-05',
    location: 'San Francisco, CA',
    category: 'Technology',
    image: reactEventImage,
    seats: 18,
    featured: true,
    description:
      'A hands-on deep dive into modern React, component architecture, hooks, and building production-ready interfaces with confidence.',
  },
  {
    id: 'product-design-bootcamp',
    name: 'Product Design Bootcamp',
    date: '2026-12-12',
    location: 'New York, NY',
    category: 'Design',
    image: designBootcampImage,
    seats: 9,
    featured: true,
    description:
      'Learn the full product design workflow, from research and wireframes to polished prototypes and design systems that scale.',
  },
  {
    id: 'ai-for-business-leaders',
    name: 'AI for Business Leaders',
    date: '2026-12-18',
    location: 'Austin, TX',
    category: 'Business',
    image: aiBusinessImage,
    seats: 24,
    featured: true,
    description:
      'A practical executive workshop on identifying AI opportunities, evaluating tools, and leading responsible adoption across teams.',
  },
  {
    id: 'data-analytics-workshop',
    name: 'Data Analytics Workshop',
    date: '2027-01-09',
    location: 'Chicago, IL',
    category: 'Technology',
    image: dataAnalyticsImage,
    seats: 12,
    featured: false,
    description:
      'Turn raw data into clear decisions with Excel, SQL basics, dashboard design, and storytelling techniques for non-technical audiences.',
  },
  {
    id: 'branding-fundamentals',
    name: 'Branding Fundamentals',
    date: '2027-01-16',
    location: 'Seattle, WA',
    category: 'Design',
    image: brandingImage,
    seats: 31,
    featured: false,
    description:
      'Build memorable brands by defining positioning, voice, visual identity, and a consistent presence across every customer touchpoint.',
  },
  {
    id: 'startup-pitch-lab',
    name: 'Startup Pitch Lab',
    date: '2027-01-23',
    location: 'Boston, MA',
    category: 'Business',
    image: startupPitchImage,
    seats: 7,
    featured: false,
    description:
      'Refine your pitch, sharpen your story, and get actionable feedback from mentors in a supportive, high-energy lab environment.',
  },
  {
    id: 'modern-css-practice',
    name: 'Modern CSS in Practice',
    date: '2027-02-06',
    location: 'Remote',
    category: 'Technology',
    image: modernCssImage,
    seats: 45,
    featured: false,
    description:
      'Master Grid, Flexbox, container queries, custom properties, and modern responsive patterns through practical, real-world layouts.',
  },
  {
    id: 'ux-research-essentials',
    name: 'UX Research Essentials',
    date: '2027-02-13',
    location: 'Denver, CO',
    category: 'Design',
    image: uxResearchImage,
    seats: 16,
    featured: false,
    description:
      'Plan and run effective user interviews, usability tests, and surveys that reveal insights your product team can act on immediately.',
  },
  {
    id: 'digital-marketing-sprint',
    name: 'Digital Marketing Sprint',
    date: '2027-02-20',
    location: 'Miami, FL',
    category: 'Business',
    image: marketingImage,
    seats: 22,
    featured: false,
    description:
      'Create a complete go-to-market campaign with audience research, channel strategy, compelling copy, and measurable goals.',
  },
  {
    id: 'creative-writing-professionals',
    name: 'Creative Writing for Professionals',
    date: '2027-03-05',
    location: 'Portland, OR',
    category: 'Education',
    image: writingImage,
    seats: 28,
    featured: false,
    description:
      'Strengthen your written communication through storytelling exercises, editing workshops, and practical feedback from peers.',
  },
  {
    id: 'cloud-computing-foundations',
    name: 'Cloud Computing Foundations',
    date: '2027-03-12',
    location: 'Remote',
    category: 'Technology',
    image: cloudImage,
    seats: 35,
    featured: false,
    description:
      'Understand core cloud concepts, deployment models, security basics, and the services that power modern applications and teams.',
  },
  {
    id: 'public-speaking-intensive',
    name: 'Public Speaking Intensive',
    date: '2027-03-19',
    location: 'Atlanta, GA',
    category: 'Education',
    image: publicSpeakingImage,
    seats: 14,
    featured: false,
    description:
      'Deliver talks that land. Practice structure, voice, presence, and impromptu speaking with individual coaching and video review.',
  },
]

export const locations = [...new Set(events.map((event) => event.location))].sort()

export function getEventById(id) {
  return events.find((event) => event.id === id)
}
