import {generic} from './compose'

export Root from './Root'

export {
    AvalancheCanada as AvalancheCanadaNavbar,
    AvalancheCanadaFoundation as AvalancheCanadaFoundationNavbar
} from './Navbar'
export Map from './Map'
export About from './About'
export Events from './Events'
export Event from './Event'
export NewsFeed from './NewsFeed'
export NewsPost from './NewsPost'
export Blog from './Blog'
export BlogPost from './BlogPost'
export Ast from './Ast'
export Sponsors from './Sponsors'
export Weather from './Weather'
export Forecast from './Forecast'

export const PrivacyPolicy = generic({
    bookmark: 'about-privacy',
    title: 'Privacy Policy',
})
export const TermsOfUse = generic({
    bookmark: 'about-tou',
    title: 'Terms of use',
})
