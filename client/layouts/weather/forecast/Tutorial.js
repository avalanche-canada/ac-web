import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'components/text'
import { StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { mw } from 'prismic/params'

Tutorial.propTypes = {
    uid: PropTypes.string.isRequired,
}

export default function Tutorial({ uid }) {
    return <Document {...mw.tutorial(uid)}>{children}</Document>
}

// Utils
function children({ pending, document }) {
    return (
        <Fragment>
            {pending && <Loading>Loading tutorial...</Loading>}
            {document && <StructuredText value={document.data.tutorial} />}
        </Fragment>
    )
}
