import {defaultProps} from 'recompose'
import {staticPage, generic} from 'prismic/components/factories'
import {WorkInProgress} from 'components/page'

// Map - kind of the home page
export Map from './Map'

// Full page
export Forecast from './Forecast'
export Forecasts from './Forecasts'
export ArchiveForecast from './ArchiveForecast'
export HotZoneReport from './HotZoneReport'
export ArchiveHotZoneReport from './ArchiveHotZoneReport'
export MountainInformationNetworkSubmission from './MountainInformationNetworkSubmission'

// Training
export {Providers as ProvidersTable, Courses as CoursesTable} from './ast/tables'
export {Providers as ProvidersForm, Courses as CoursesForm} from './ast/forms'

export Tutorial from './Tutorial'

// Weather
export WeatherStation from './WeatherStation'
export WeatherStationList from './WeatherStationList'

// Mountain Information Network
export MountainInformationNetworkSubmit from './min/Form'

// Static Pages
export const EarlySeasonConditions = staticPage('early-season-conditions', 'Early Season Conditions')
export const Tech = staticPage('tech', 'Tech')
export const FAQ = staticPage('faq', 'FAQ')
export const Planning = staticPage('planning', 'Planning')
export const Information = staticPage('information', 'Information')
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
export const TripPlanner = defaultProps({
    name: 'Trip Planner',
    oldUrl: 'http://old.avalanche.ca/cac/pre-trip-planning/trip-planner/planning',
})(WorkInProgress)
export const Incidents = defaultProps({
    name: 'Historic Incidents',
    oldUrl: 'http://old.avalanche.ca/cac/library/incident-report-database/view',
})(WorkInProgress)
export const Auction = defaultProps({
    name: 'Web Auction',
    oldUrl: 'http://old.avalanche.ca/cac/auctions',
})(WorkInProgress)
export const Tutoriel = defaultProps({
    name: 'Tutorial / Tutoriel',
    oldUrl: 'http://old.avalanche.ca/fr/cac/training/online-course',
    title: `${WorkInProgress.defaultProps.title}<br />Nous travaillons présentement sur cette page...`,
    subtitle: `${WorkInProgress.defaultProps.subtitle}<br />Pour l'instant, vous pouvez consulter cette page sur notre ancien site.`,
})(WorkInProgress)
