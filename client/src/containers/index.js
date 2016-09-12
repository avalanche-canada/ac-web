import {withProps} from 'recompose'
import Prismic from 'prismic/components/page'

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
function staticPage(uid, title, message) {
    return withProps({
        params: {
            type: 'static-page',
            uid,
        },
        title,
        message,
    })(Prismic)
}
export const Sponsors = staticPage('sponsors-page', 'Sponsors')
export const PrivacyPolicy = staticPage('about-privacy', 'Privacy Policy')
export const TermsOfUse = staticPage('about-tou', 'Terms of use')
export const About = staticPage('about-page', 'About — Avalanche Canada')
export const Collaborators = staticPage('collaborators', 'Collaborators')
export const Ambassadors = staticPage('ambassadors-page', 'Ambassadors')
export const Training = staticPage('training-page', 'Go farther — Get avalanche trained')
export const Tutorial = staticPage('tutorial-page', 'Tutorial')
export const Youth = staticPage('youth-page', 'Youth')
export const Gear = staticPage('essential-gear-page', 'Essential Gear')
export const Sled = staticPage('sled-page', 'Sled')
export const Auction = staticPage('auction-page', 'Auction')
export const MountainInformationNetwork = staticPage('mountain-information-network-overview', 'Mountain Information Network — Overview')
export const MountainInformationNetworkFAQ = staticPage('mountain-information-network-faq', 'Mountain Information Network — FAQ')
export const MountainInformationNetworkSubmissionGuidelines = staticPage('mountain-information-network-submission-guidelines', 'Mountain Information Network — Submission Guidelines')
export const AvalancheRiskReductionProcedures = staticPage('avalanche-risk-reduction-procedures', 'Avalanche Risk Reduction Procedures')
