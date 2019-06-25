import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'components/text'
import { StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { mw } from 'prismic/params'

Tutorial.propTypes = {
    uid: PropTypes.string.isRequired,
}

function Tutorial({ uid }) {
    return <Document {...mw.tutorial(uid)}>{children}</Document>
}

export default memo(Tutorial)

// Utils
function children({ pending, document }) {
    return (
        <Fragment>
            <Loading show={pending}>Loading tutorial...</Loading>
            {document && <StructuredText value={document.data.tutorial} />}
        </Fragment>
    )
}
