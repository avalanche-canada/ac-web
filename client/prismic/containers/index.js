import { createElement } from 'react'
import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import * as Pages from '~/prismic/components/page'
import { makeGetDocumentAndStatus } from '~/selectors/prismic/utils'
import { prismicPatch } from '~/containers/connectors'
import { GENERIC, STATIC_PAGE } from '~/constants/prismic'

function page(type) {
    function getParams({ uid }) {
        return { type, uid }
    }

    return compose(
        setPropTypes({
            uid: PropTypes.string.isRequired,
        }),
        prismicPatch(getParams, makeGetDocumentAndStatus(getParams))
    )
}

export const Generic = page(GENERIC)(Pages.Generic)
export const StaticPage = page(STATIC_PAGE)(Pages.StaticPage)

FallbackPage.propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

export function FallbackPage({ type, uid }) {
    const container = type === STATIC_PAGE ? StaticPage : Generic

    return createElement(container, { uid })
}
