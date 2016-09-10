import {compose, flattenProp, withProps, renameProp} from 'recompose'
import Prismic, {withPrismic} from 'prismic/components/page'

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

// Static Pages
export const Sponsors = withPrismic({
    bookmark: 'sponsors-page',
    title: 'Sponsors'
})
export const PrivacyPolicy = withPrismic({
    bookmark: 'about-privacy',
    title: 'Privacy Policy',
})
export const TermsOfUse = withPrismic({
    bookmark: 'about-tou',
    title: 'Terms of use',
})
export const About = withPrismic({
    bookmark: 'about-page',
    title: 'About — Avalanche Canada',
})
export const Collaborators = withPrismic({
    bookmark: 'collaborators',
    title: 'Collaborators',
})
export const Ambassadors = withPrismic({
    bookmark: 'ambassadors-page',
    title: 'Ambassadors',
})
export const Training = withPrismic({
    bookmark: 'training-page',
    title: 'Go farther — Get avalanche trained',
})
export const Tutorial = withPrismic({
    bookmark: 'tutorial-page',
    title: 'Tutorial',
})
export const Youth = withPrismic({
    bookmark: 'youth-page',
    title: 'Youth',
})
export const Gear = withPrismic({
    bookmark: 'essential-gear-page',
    title: 'Essential Gear',
})
export const Sled = withPrismic({
    bookmark: 'sled-page',
    title: 'Sled',
})
export const Auction = withPrismic({
    bookmark: 'auction-page',
    title: 'Auction',
})

export const MountainInformationNetwork = withPrismic({
    bookmark: 'mountain-information-network-overview',
    title: 'Mountain Information Network — Overview',
})
export const MountainInformationNetworkFAQ = withPrismic({
    bookmark: 'mountain-information-network-faq',
    title: 'Mountain Information Network — FAQ',
})
export const MountainInformationNetworkSubmissionGuidelines = withPrismic({
    bookmark: 'mountain-information-network-submission-guidelines',
    title: 'Mountain Information Network — Submission Guidelines',
})
export const AvalancheRiskReductionProcedures = withPrismic({
    bookmark: 'avalanche-risk-reduction-procedures',
    title: 'Avalanche Risk Reduction Procedures',
})

// Dynamic static page
export const PrismicPage = compose(
    flattenProp('params'),
)(Prismic)

export Sponsor from './Sponsor'
