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
            <Account path="account" />
            <Submissions path="submissions" />
            <Submission path="submissions/:id" />
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
const AccountLayout = lazy(() => import('layouts/min/Account'))

function Account() {
    return (
        <Bundle fallback={<Loading />}>
            <AccountLayout />
        </Bundle>
    )
}
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
