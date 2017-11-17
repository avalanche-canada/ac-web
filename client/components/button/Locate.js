import React from 'react'
import { compose, setDisplayName, withProps } from 'recompose'
import { MyLocation } from 'components/icons'
import Button from './Button'
import { SUBTILE } from './kinds'

const Locate = compose(
    setDisplayName('Locate'),
    withProps({
        kind: SUBTILE,
        icon: <MyLocation />,
    })
)(Button)

export default Locate
