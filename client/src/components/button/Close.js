import React, {PropTypes} from 'react'
import {compose, setDisplayName, withProps, defaultProps} from 'recompose'
import {Remove} from '../icons'
import Button from './Button'
import {SUBTILE} from './kinds'

export default compose(
    setDisplayName('Close'),
    defaultProps({
        kind: SUBTILE,
    }),
    withProps({
        icon: <Remove />,
    }),
)(Button)
