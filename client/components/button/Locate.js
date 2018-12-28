import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { MyLocation } from 'components/icons'
import { SUBTILE } from './kinds'

Locate.propTypes = {
    ref: PropTypes.func.isRequired,
}

export default function Locate(props) {
    return (
        <Button kind={SUBTILE} {...props}>
            <MyLocation />
        </Button>
    )
}
