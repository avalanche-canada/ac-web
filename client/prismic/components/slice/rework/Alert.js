import React from 'react'
import PropTypes from 'prop-types'
import { Danger, Info, Warning, Success } from 'components/alert'
import { StructuredText } from 'prismic/components/base'

Alert.propTypes = {
    nonRepeat: PropTypes.shape({
        type: PropTypes.oneOf(['Warning', 'Information', 'Danger']).isRequired,
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
}

export default function Alert({ nonRepeat }) {
    const { type, content } = nonRepeat
    const Component = Components.get(type)

    return (
        <Component>
            <StructuredText value={content} />
        </Component>
    )
}

// Constants
const Components = new Map([
    ['Warning', Warning],
    ['Information', Info],
    ['Danger', Danger],
    ['Success', Success],
])
