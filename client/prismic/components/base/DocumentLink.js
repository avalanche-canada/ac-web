import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import {Link} from 'react-router-dom'
import { documentLink } from '~/containers/connectors'
import { pathname } from '~/utils/prismic'
import get from 'lodash/get'

// TODO: rework that component

const Document = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.object,
})

DocumentLink.propTypes = {
    value: PropTypes.shape({
        document: Document.isRequired,
        isBroken: PropTypes.bool.isRequired,
    }).isRequired,
    children: PropTypes.node,
    document: Document,
    status: PropTypes.object,
}

function DocumentLink({ children, value, document }) {
    return (
        <Link to={pathname(value.document)}>
            {children ||
                get(
                    document,
                    ['data', value.document.type, 'title', 'value'],
                    'Loading...'
                )}
        </Link>
    )
}

export default compose(
    withProps(props => ({
        type: props.value.document.type,
        uid: props.value.document.uid,
    })),
    documentLink
)(DocumentLink)
