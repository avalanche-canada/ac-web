import React from 'react'
import { WorkInProgress } from '~/components/page'
import { createRoute } from '~/utils/router'

const PROPS = new Map([
    [
        '/trip-planner',
        {
            name: 'Trip Planner',
            oldUrl:
                'http://old.avalanche.ca/cac/pre-trip-planning/trip-planner/planning',
        },
    ],
    [
        '/incidents',
        {
            name: 'Historic Incidents',
            oldUrl:
                'http://old.avalanche.ca/cac/library/incident-report-database/view',
        },
    ],
    [
        '/auction',
        {
            name: 'Web Auction',
            oldUrl: 'http://old.avalanche.ca/cac/auctions',
        },
    ],
    [
        '/tutoriel',
        {
            name: 'Tutorial / Tutoriel',
            oldUrl: 'http://old.avalanche.ca/fr/cac/training/online-course',
            title(defaultTitle) {
                return `${defaultTitle}<br />Nous travaillons présentement sur cette page...`
            },
            subtitle(defaultSubtitle) {
                return `${defaultSubtitle}<br />Pour l'instant, vous pouvez consulter cette page sur notre ancien site.`
            },
        },
    ],
])

function render({ match }) {
    return <WorkInProgress {...PROPS.get(match.url)} />
}

export default Array.from(PROPS.keys()).map(path =>
    createRoute({ path, render })
)
