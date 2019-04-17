import React from 'react'
import PropTypes from 'prop-types'
import { forType } from 'components/alert'
import { StructuredText } from 'prismic/components/base'
import Shim from 'components/Shim'

Alert.propTypes = {
    nonRepeat: PropTypes.shape({
        type: PropTypes.oneOf(['Warning', 'Information', 'Danger']).isRequired,
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
}

export default function Alert({ nonRepeat }) {
    const { type, content } = nonRepeat
    const Alert = forType(type)

    return (
        <Shim vertical>
            <Alert>
                <StructuredText value={content} />
            </Alert>
        </Shim>
    )
}
