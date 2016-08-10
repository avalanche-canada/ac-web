import prismic from 'prismic/components/page'

export Root from './Root'

// Map - kind of the home page
export Map from './Map'

// Full page
export Forecast from './Forecast'
export MountainInformationNetworkSubmission from './MountainInformationNetworkSubmission'

// Feed and Post Pages
export EventFeed from './EventFeed'
export EventPost from './EventPost'
export NewsFeed from './NewsFeed'
export NewsPost from './NewsPost'
export BlogFeed from './BlogFeed'
export BlogPost from './BlogPost'

// Training
export Ast from './Ast'

// Weather
export Weather from './Weather'

// Static Pages
export const Sponsors = prismic({
    bookmark: 'sponsors-page',
    title: 'Sponsors'
})
export const PrivacyPolicy = prismic({
    bookmark: 'about-privacy',
    title: 'Privacy Policy',
})
export const TermsOfUse = prismic({
    bookmark: 'about-tou',
    title: 'Terms of use',
})
export const About = prismic({
    bookmark: 'about-page',
    title: 'About — Avalanche Canada',
})
export const Collaborators = prismic({
    bookmark: 'collaborators',
    title: 'Collaborators',
})
export const Ambassadors = prismic({
    bookmark: 'ambassadors-page',
    title: 'Ambassadors',
})
export const Training = prismic({
    bookmark: 'training-page',
    title: 'Go farther — Get avalanche trained',
})
export const Tutorial = prismic({
    bookmark: 'tutorial-page',
    title: 'Tutorial',
})
export const Youth = prismic({
    bookmark: 'youth-page',
    title: 'Youth',
})
export const Gear = prismic({
    bookmark: 'gear-page',
    title: 'Essential Gear',
})
export const Sled = prismic({
    bookmark: 'sled-page',
    title: 'Sled',
})
export const Auction = prismic({
    bookmark: 'auction-page',
    title: 'Auction',
})

export const MountainInformationNetwork = prismic({
    bookmark: 'mountain-information-network-overview',
    title: 'Mountain Information Network — Overview',
})
export const MountainInformationNetworkSubmit = prismic({
    bookmark: 'mountain-information-network-submit',
    title: 'Mountain Information Network — Submit',
})
export const MountainInformationNetworkFAQ = prismic({
    bookmark: 'mountain-information-network-faq',
    title: 'Mountain Information Network — FAQ',
})
export const MountainInformationNetworkSubmissionGuidelines = prismic({
    bookmark: 'mountain-information-network-submission-guidelines',
    title: 'Mountain Information Network — Submission Guidelines',
})

export Sponsor from './Sponsor'
