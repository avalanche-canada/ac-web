import React from 'react'
import { StaticPage } from '~/prismic/containers'
import { createRoute } from '~/utils/router'

const PROPS = new Map([
    [
        '/early-season-conditions',
        {
            uid: 'early-season-conditions',
            title: 'Early Season Conditions',
        },
    ],
    [
        '/tech',
        {
            uid: 'tech',
            title: 'Tech',
        },
    ],
    [
        '/faq',
        {
            uid: 'faq',
            title: 'FAQ',
        },
    ],
    [
        '/planning',
        {
            uid: 'planning',
            title: 'Planning',
        },
    ],
    [
        '/information',
        {
            uid: 'information',
            title: 'Information',
        },
    ],
    [
        '/sled',
        {
            uid: 'sled',
            title: 'Sled',
        },
    ],
    [
        '/youth',
        {
            uid: 'youth',
            title: 'Youth',
        },
    ],
    [
        '/gear',
        {
            uid: 'essential-gear',
            title: 'Essential Gear',
        },
    ],
    [
        '/training',
        {
            uid: 'training',
            title: 'Go farther — Get avalanche trained',
        },
    ],
    [
        '/instructing-ast',
        {
            uid: 'instructing-ast',
            title: 'Teaching Avalanche Skills Training (AST)',
        },
    ],
    [
        '/mountain-information-network',
        {
            uid: 'mountain-information-network-overview',
            title: 'Mountain Information Network — Overview',
        },
    ],
    [
        '/mountain-information-network/submission-guidelines',
        {
            uid: 'mountain-information-network-submission-guidelines',
            title: 'Mountain Information Network — Submission Guidelines',
        },
    ],
    [
        '/about',
        {
            uid: 'about',
            title: 'About',
        },
    ],
    [
        '/mountain-information-network/faq',
        {
            uid: 'mountain-information-network-faq',
            title: 'Mountain Information Network — FAQ',
        },
    ],
    [
        '/ambassadors',
        {
            uid: 'ambassadors',
            title: 'Ambassadors',
        },
    ],
    [
        '/sponsors',
        {
            uid: 'sponsors',
            title: 'Sponsors',
        },
    ],
    [
        '/collaborators',
        {
            uid: 'collaborators',
            title: 'Collaborators',
        },
    ],
    [
        '/membership',
        {
            uid: 'membership-overview',
            title: 'Membership Overview',
        },
    ],
])

function render({ match }) {
    return <StaticPage {...PROPS.get(match.url)} />
}

export default Array.from(PROPS.keys()).map(path =>
    createRoute({ path, render })
)
