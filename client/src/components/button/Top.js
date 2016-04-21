import React from 'react'
import { compose, setDisplayName, mapProps } from 'recompose'
import { ExpandLess } from '../icons'
import Button from './Button'

function scrollTop(event) {
	event.preventDefault()
	window.scrollTop = 0
}

function propsMapper() {
    return {
        children: (
            <span>
                <ExpandLess inverse height={8} viewBox='0 8 24 8' />
                <div>Top</div>
            </span>
        ),
        onClick: scrollTop
    }
}


export default compose(
    setDisplayName('Top'),
    mapProps(propsMapper)
)(Button)
