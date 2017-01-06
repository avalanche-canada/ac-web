import {staticPage, generic, wip} from 'prismic/components/page'

// Map - kind of the home page
export Map from './Map'

// Full page
export Forecast from './Forecast'
export Forecasts from './Forecasts'
export ArchiveForecast from './ArchiveForecast'
export HotZoneReport from './HotZoneReport'
export MountainInformationNetworkSubmission from './MountainInformationNetworkSubmission'

// export IncidentsTable from './IncidentsTable'
// export IncidentDetails from './IncidentDetails'
// export TripPlanner from './TripPlanner'

// Training
export {Providers as ProvidersTable, Courses as CoursesTable} from './ast/tables'
export {Providers as ProvidersForm, Courses as CoursesForm} from './ast/forms'

export Tutorial from './Tutorial'

// Weather
export Weather from './Weather'
export WeatherStation from './WeatherStation'

// Mountain Information Network
export MountainInformationNetworkSubmit from './min/Form'

// Static Pages
export const EarlySeasonConditions = staticPage('early-season-conditions', 'Early Season Conditions')
export const Tech = staticPage('tech', 'Tech')
export const FAQ = staticPage('faq', 'FAQ')
export const Sled = staticPage('sled', 'Sled')
export const Youth = staticPage('youth', 'Youth')
export const Gear = staticPage('essential-gear', 'Essential Gear')
export const Training = staticPage('training', 'Go farther — Get avalanche trained')
export const InstructingAst = staticPage('instructing-ast', 'Teaching Avalanche Skills Training (AST)')
export const MountainInformationNetwork = staticPage('mountain-information-network-overview', 'Mountain Information Network — Overview')
export const MountainInformationNetworkSubmissionGuidelines = staticPage('mountain-information-network-submission-guidelines', 'Mountain Information Network — Submission Guidelines')
export const About = staticPage('about', 'About')
export const AvalancheRiskReductionProcedures = staticPage('avalanche-risk-reduction-procedures', 'Avalanche Risk Reduction Procedures')
export const MountainInformationNetworkFAQ = staticPage('mountain-information-network-faq', 'Mountain Information Network — FAQ')
export const Ambassadors = staticPage('ambassadors', 'Ambassadors')
export const Sponsors = staticPage('sponsors', 'Sponsors')
export const Collaborators = staticPage('collaborators', 'Collaborators')
export const MembershipOverview = staticPage('membership-overview', 'Membership Overview')
export const CherryBowl = staticPage('cherry-bowl', 'Rescue at Cherry Bowl')

export const PrivacyPolicy = generic('privacy-policy', 'Privacy Policy')
export const TermsOfUse = generic('terms-of-use', 'Terms of use')

// WIP Pages
const WIPPageTitle = 'We are currently working on this page...'
const WIPPageSubtitle = 'For now, you can visit this page on our old website.'

export const TripPlanner = wip('trip-planner', 'Trip Planner', 'http://old.avalanche.ca/cac/pre-trip-planning/trip-planner/planning', WIPPageTitle, WIPPageSubtitle)
export const Incidents = wip('incidents', 'Historic Incidents', 'http://old.avalanche.ca/cac/library/incident-report-database/view', WIPPageTitle, WIPPageSubtitle)
export const Auction = wip('auction', 'Web Auction', 'http://old.avalanche.ca/cac/auctions', WIPPageTitle, WIPPageSubtitle)
export const Tutoriel = wip('tutoriel', 'Tutorial / Tutoriel', 'http://old.avalanche.ca/fr/cac/training/online-course', `${WIPPageTitle}<br />Nous travaillons présentement sur cette page en regardant les flocons tombés...`, `${WIPPageSubtitle}<br />Pour l'instant, vous pouvez consulter cette page sur notre ancien site.`)
