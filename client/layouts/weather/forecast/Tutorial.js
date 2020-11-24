import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Loading } from 'components/text'
import { StructuredText } from 'prismic/components/base'
import { mw } from 'prismic/params'
import { useDocument } from 'prismic/hooks'

Tutorial.propTypes = {
    uid: PropTypes.string.isRequired,
}

export default function Tutorial({ uid }) {
    const [document, pending] = useDocument(mw.tutorial(uid))

    return pending ? (
        <Loading>
            <FormattedMessage
                description="Layout weather/forecast/Tutorial"
                defaultMessage="Loading tutorial..."
            />
        </Loading>
    ) : (
        <StructuredText value={document?.data?.tutorial} />
    )
}
