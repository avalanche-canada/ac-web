import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { Menu as Icon } from 'components/icons'
import Button from './Button'
import { SUBTILE } from './kinds'
import { GRAY, WHITE } from 'constants/colors'

Grouping.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
}

export default function Grouping({ active = false, onClick = noop, ...rest }) {
    return (
        <Button {...rest} onClick={onClick} kind={SUBTILE} active={active}>
            <Icon color={active ? WHITE : GRAY} />
        </Button>
    )
}
