import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Term from './Term'
import Definition from './Definition'

Entry.propTypes = {
    term: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}

export default function Entry({ term, children }) {
    return (
        <Fragment>
            <Term>{term}</Term>
            <Definition>{children}</Definition>
        </Fragment>
    )
}
