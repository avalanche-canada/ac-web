import React from 'react'
import { Router } from '@reach/router'
import Navbar from 'components/navbar'
import { SliceZone } from 'prismic/components/base'
import { Boundary } from 'components/error'
import { Static } from 'prismic/layouts'
import * as Pages from 'layouts/pages'
import { useDocument } from 'prismic/hooks'
import * as params from 'prismic/params'
import { STATIC_PAGE } from 'constants/prismic'
import * as Async from 'contexts/async'
import menu from /* preval */ '../constants/menus/foundation'
import logo from 'styles/AvalancheCanadaFoundation.svg'
import styles from './AvalancheCanadaFoundation.module.css'

// TODO Could have an AvCan Foundation not found page, not just the AvCan one
// TODO Should provide some useful links to the fallback page

export default function AvalancheCanadaFoundation() {
    const fallback = <Pages.Fallback navbar={<FoundationNavbar />} />

    return (
        <Boundary fallback={fallback}>
            <Router>
                <Home path="/" />
                <StaticPage path="about" uid="foundation-about" title="About" />
                <StaticPage path="programs" uid="foundation-programs" title="Programs" />
                <StaticPage path="donors" uid="foundation-donors" title="Donors" />
                <StaticPage
                    path="event-sponsors"
                    uid="foundation-event-sponsors"
                    title="Event Sponsors"
                />
                <StaticPage
                    path="news-and-events"
                    uid="foundation-news-and-events"
                    className={styles.NewsAndEvents}
                />
                <StaticPage
                    path="donate"
                    uid="foundation-donate"
                    title="Donate to Public Avalanche Safety"
                />
                <Funds path="funds/*" />
                <Pages.NotFound default navbar={<FoundationNavbar />} />
            </Router>
        </Boundary>
    )
}

// Subroutes
function Funds() {
    return (
        <Router>
            <StaticPage
                path="hugh-and-helen-hincks-memorial"
                uid="hugh-and-helen-hincks-memorial-fund"
                title="Hugh & Helen Hincks Memorial Fund"
            />
            <StaticPage
                path="craig-kelly-memorial-scholarship"
                uid="craig-kelly-memorial-scholarship-fund"
                title="Craig Kelly Memorial Scholarship Fund"
            />
            <StaticPage
                path="cora-shea-memorial"
                uid="cora-shea-memorial-fund"
                title="Cora Shea Memorial Fund"
            />
            <StaticPage
                path="al-hodgson-memorial"
                uid="al-hodgson-memorial-fund"
                title="Al Hodgson Memorial Fund"
            />
            <StaticPage path="issw" uid="issw-fund" title="ISSW Fund" />
        </Router>
    )
}

// Page components
function Home() {
    const value = useDocument(params.uid(STATIC_PAGE, 'foundation-home'))

    return (
        <Pages.Screen navbar={<FoundationNavbar />} className={styles.Home}>
            <Async.Provider value={value}>
                <Async.Found>{paylod => <SliceZone value={paylod.data.content} />}</Async.Found>
            </Async.Provider>
        </Pages.Screen>
    )
}
function StaticPage({ uid, title, className }) {
    return (
        <Pages.Page navbar={<FoundationNavbar />} className={className}>
            <Static uid={uid} title={title} />
        </Pages.Page>
    )
}

// Page items
function FoundationNavbar() {
    return <Navbar logo={logo} menu={menu} donate="/foundation/donate" />
}
