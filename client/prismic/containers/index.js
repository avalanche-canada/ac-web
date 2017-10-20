import { createElement } from 'react'
import PropTypes from 'prop-types'
import { compose, setPropTypes, withProps } from 'recompose'
import * as Pages from 'prismic/components/page'
import { makeGetDocumentAndStatus } from 'selectors/prismic/utils'
import { prismic } from 'containers/connectors'
import { GENERIC, STATIC_PAGE } from 'constants/prismic'

function page(type) {
    return compose(
        setPropTypes({
            uid: PropTypes.string.isRequired,
        }),
        withProps(props => ({
            params: {
                uid: props.uid,
                type,
            },
        })),
        prismic(makeGetDocumentAndStatus)
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
