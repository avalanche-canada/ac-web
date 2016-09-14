import {staticPage, generic} from 'prismic/components/page'

// Map - kind of the home page
export Map from './Map'

// Full page
export Forecast from './Forecast'
export ArchiveForecast from './ArchiveForecast'
export Archives from './Archives'
export MountainInformationNetworkSubmission from './MountainInformationNetworkSubmission'

export IncidentsTable from './IncidentsTable'
export IncidentDetails from './IncidentDetails'
export TripPlanner from './TripPlanner'

// Training
export {Providers as ProvidersTable, Courses as CoursesTable} from './ast/tables'
export {Providers as ProvidersForm, Courses as CoursesForm} from './ast/forms'

// Weather
export Weather from './Weather'

// Mountain Information Network
export MountainInformationNetworkSubmit from './MountainInformationNetworkSubmit'

export Sponsor from './Sponsor'

// Static Pages
export const Sled = staticPage('sled', 'Sled')
export const Youth = staticPage('youth', 'Youth')
export const Gear = staticPage('essential-gear', 'Essential Gear')
export const Training = staticPage('training', 'Go farther — Get avalanche trained')
export const MountainInformationNetwork = staticPage('mountain-information-network-overview', 'Mountain Information Network — Overview')
export const MountainInformationNetworkSubmissionGuidelines = staticPage('mountain-information-network-submission-guidelines', 'Mountain Information Network — Submission Guidelines')
export const About = staticPage('about', 'About — Avalanche Canada')
export const AvalancheRiskReductionProcedures = staticPage('avalanche-risk-reduction-procedures', 'Avalanche Risk Reduction Procedures')
export const MountainInformationNetworkFAQ = staticPage('mountain-information-network-faq', 'Mountain Information Network — FAQ')
export const Ambassadors = staticPage('ambassadors', 'Ambassadors')
export const Sponsors = staticPage('sponsors', 'Sponsors')
export const Collaborators = staticPage('collaborators', 'Collaborators')

export const PrivacyPolicy = generic('about-privacy', 'Privacy Policy')
export const TermsOfUse = generic('about-tou', 'Terms of use')
export const Tutorial = generic('tutorial', 'Tutorial')
export const Auction = generic('auction', 'Auction')
