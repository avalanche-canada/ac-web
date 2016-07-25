import React, { PropTypes, createElement} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps, withProps, defaultProps} from 'recompose'
import * as Icons from 'components/icons'
import Button from 'components/button'

export default compose(
    setDisplayName('Segment'),
    setPropTypes({
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        active: PropTypes.bool,
    }),
    defaultProps({
        active: false,
    }),
)(Button)

function quickNavigation(name) {
    return compose(
        setDisplayName(name),
        withProps({
            icon: createElement(Icons[name], {
                inverse: true
            })
        })
    )(Button)
}

export const First = quickNavigation('First')
export const Previous = quickNavigation('Previous')
export const Next = quickNavigation('Next')
export const Last = quickNavigation('Last')
