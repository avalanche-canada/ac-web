import { createElement } from 'react'
import PropTypes from 'prop-types'
import Section from '../slice/Section'
import Ambassador from '../slice/Ambassador'
import Block from '../slice/Block'
import Gallery from '../slice/Gallery'
import MailChimp from '../slice/MailChimp'
import FeedSplash from '../slice/FeedSplash'
import Figure from '../slice/Figure'
import MountainInformationNetworkFeatures
    from '../slice/MountainInformationNetworkFeatures'
import MultiColumnLayout from '../slice/MultiColumnLayout'
import QuestionAnswer from '../slice/QuestionAnswer'
import Quote from '../slice/Quote'
import Slider from '../slice/Slider'
import SponsorSet from '../slice/SponsorSet'
import StaffSet from '../slice/StaffSet'
import StaticSplash from '../slice/StaticSplash'
import Table from '../slice/Table'
import Video from '../slice/Video'
import SidebarHeader from '../slice/SidebarHeader'
import SidebarItemSet from '../slice/SidebarItemSet'

const Components = new Map([
    ['section', Section],
    ['ambassador', Ambassador],
    ['block', Block],
    ['gallery', Gallery],
    ['mailChimp', MailChimp],
    ['feedSplash', FeedSplash],
    ['figure', Figure],
    [
        'mountain-information-network-features',
        MountainInformationNetworkFeatures,
    ],
    ['multiColumnLayout', MultiColumnLayout],
    ['question-answer', QuestionAnswer],
    ['quote', Quote],
    ['slider', Slider],
    ['sponsor-set', SponsorSet],
    ['staff-set', StaffSet],
    ['staticSplash', StaticSplash],
    ['table', Table],
    ['video', Video],
    ['header', SidebarHeader],
    ['items', SidebarItemSet],
])

Slice.propTypes = {
    value: PropTypes.object.isRequired,
    type: PropTypes.oneOf(Array.from(Components.keys())).isRequired,
}

export default function Slice({ type, value }) {
    return createElement(Components.get(type), value)
}
