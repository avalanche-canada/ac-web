import React from 'react'
import { Generic } from '~/prismic/containers'
import { createRoute } from '~/utils/router'

const PROPS = new Map([
    [
        '/privacy-policy',
        {
            uid: 'privacy-policy',
            title: 'Privacy Policy',
        },
    ],
    [
        '/terms-of-use',
        {
            uid: 'terms-of-use',
            title: 'Terms of use',
        },
    ],
])

function render({ match }) {
    return <Generic {...PROPS.get(match.url)} />
}

export default Array.from(PROPS.keys()).map(path =>
    createRoute({ path, render })
)
