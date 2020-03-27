import React from 'react'
import { Router, Redirect } from '@reach/router'
import { StaticPage, GenericPage } from 'prismic/layouts'
import styles from './AvalancheCanada.css'

export default function MountainInformationNetwork() {
    return (
        <Router>
            <GenericPage uid="min-shutdown-covid" path="submit" />
            <GenericPage uid="min-shutdown-covid" path="submissions" />
            <GenericPage uid="min-shutdown-covid" path="submissions/:id" />
            <GenericPage uid="min-shutdown-covid" path="reports" />
            <Redirect from="account" to="/account" />
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
