import React from 'react'
import {compose, setDisplayName, withProps} from 'recompose'
import {Print} from '../icons'
import Button from './Button'
import {SUBTILE} from './kinds'

function handleClick(event) {
	event.preventDefault()

	window.print()
}

export default compose(
    setDisplayName('Print'),
    withProps({
        onClick: handleClick,
        kind: SUBTILE,
        icon: <Print />,
        children: 'Print',
    })
)(Button)
