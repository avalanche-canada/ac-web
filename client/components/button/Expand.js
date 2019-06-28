import React from 'react'
import PropTypes from 'prop-types'
import { SUBTILE } from './kinds'
import Button from './Button'
import { Remove, Add, ExpandMore, ExpandLess } from 'components/icons'

Expand.propTypes = {
    expanded: PropTypes.bool.isRequired,
    chevron: PropTypes.bool,
    color: PropTypes.string,
}

export default function Expand({
    chevron = false,
    expanded = false,
    color,
    ...props
}) {
    const Icon = ICONS.get(chevron).get(expanded)

    return (
        <Button kind={SUBTILE} {...props}>
            <Icon color={color} />
        </Button>
    )
}

const ICONS = new Map([
    [true, new Map([[true, ExpandLess], [false, ExpandMore]])],
    [false, new Map([[true, Remove], [false, Add]])],
])
