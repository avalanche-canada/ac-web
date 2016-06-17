import React, { PropTypes } from 'react'
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose'
import Button, {SUBTILE} from 'components/button'
import {Close} from 'components/icons'

export default compose(
    setDisplayName('Close'),
    setPropTypes({
        onClick: PropTypes.func,
    }),
    withProps({
        kind: SUBTILE,
        icon: <Close />,
    })
)(Button)
