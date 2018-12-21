import React from 'react'
import Section from './Section'
import Ambassador from './Ambassador'
import Block from './Block'
import Gallery from './Gallery'
import MailChimp from './MailChimp'
import FeedSplash from './FeedSplash'
import Figure from './Figure'
import MultiColumnLayout from './MultiColumnLayout'
import QuestionAnswer from './QuestionAnswer'
import Quote from './Quote'
import Slider from './Slider'
import SponsorSet from './SponsorSet'
import StaffSet from './StaffSet'
import StaticSplash from './StaticSplash'
import Table from './Table'
import SidebarItemSet from './SidebarItemSet'
import ContactForm from './ContactForm'
import { Header } from 'components/sidebar'

function SidebarHeader({ value }) {
    return <Header>{value}</Header>
}

export default new Map([
    ['section', Section],
    ['ambassador', Ambassador],
    ['block', Block],
    ['gallery', Gallery],
    ['mailChimp', MailChimp],
    ['feedSplash', FeedSplash],
    ['figure', Figure],
    ['multiColumnLayout', MultiColumnLayout],
    ['question-answer', QuestionAnswer],
    ['quote', Quote],
    ['slider', Slider],
    ['sponsor-set', SponsorSet],
    ['staff-set', StaffSet],
    ['staticSplash', StaticSplash],
    ['table', Table],
    ['header', SidebarHeader],
    ['items', SidebarItemSet],
    ['contact-form', ContactForm],
])
