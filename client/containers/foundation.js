import { staticPage } from '~/prismic/components/factories'

// TODO: Should be a Prismic non repeatable type
export const Home = staticPage('foundation-home')
export const About = staticPage('foundation-about', 'About')
export const Programs = staticPage('foundation-programs', 'Programs')
export const Donors = staticPage('foundation-donors', 'Donors')
export const EventSponsors = staticPage(
    'foundation-event-sponsors',
    'Event Sponsors'
)
export const NewsAndEvents = staticPage('foundation-news-and-events')
export const Donate = staticPage(
    'foundation-donate',
    'Donate to Public Avalanche Safety'
)
