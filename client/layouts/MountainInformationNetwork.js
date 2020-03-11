import React, { lazy } from 'react'
import { Router } from '@reach/router'
import Bundle from 'components/Bundle'
import Submission from 'layouts/min/Submission'
import { StaticPage } from 'prismic/layouts'
import { Loading } from 'layouts/pages'
import styles from './AvalancheCanada.css'

export default function MountainInformationNetwork() {
    return (
        <Router>
            <Submit path="submit" />
            <Submissions path="submissions" />
            <Submission path="submissions/:id" />
            <Reports path="reports" />
            <StaticPage
                path="submission-guidelines"
                uid="mountain-information-network-submission-guidelines"
                title="Mountain Information Network — Submission Guidelines"
            />
            <StaticPage
                path="faq"
                uid="mountain-information-network-faq"
                title="Mountain Information Network — FAQ"
            />
            <StaticPage
                path="/"
                uid="mountain-information-network-overview"
                title="Mountain Information Network — Overview"
                className={styles.MINOverview}
            />
        </Router>
    )
}

// Code splitted subroutes
const SubmitContainer = lazy(() => import('layouts/min/Form'))
const SubmissionList = lazy(() => import('layouts/min/SubmissionList'))
const Report = lazy(() => import('layouts/min/Report'))

function Submit(props) {
    return (
        <Bundle fallback={<Loading />}>
            <SubmitContainer {...props} />
        </Bundle>
    )
}

function Submissions({ navigate }) {
    return (
        <Bundle fallback={<Loading />}>
            <SubmissionList navigate={navigate} />
        </Bundle>
    )
}

function Reports({ navigate }) {
    return (
        <Bundle fallback={<Loading />}>
            <Report navigate={navigate} />
        </Bundle>
    )
}
