import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Base, { DANGER, INFO, WARNING, SUCCESS } from 'components/alert'
import { StructuredText } from 'prismic/components/base'

Alert.propTypes = {
    nonRepeat: PropTypes.shape({
        type: PropTypes.oneOf(['Warning', 'Information', 'Danger']).isRequired,
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
}

function Alert({ nonRepeat }) {
    const { type, content } = nonRepeat

    return (
        <Base type={TYPES.get(type)}>
            <StructuredText value={content} />
        </Base>
    )
}

export default memo(Alert)

// Constants
const TYPES = new Map([
    ['Warning', WARNING],
    ['Information', INFO],
    ['Danger', DANGER],
    ['Success', SUCCESS],
])
