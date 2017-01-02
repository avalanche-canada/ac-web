import React, {PropTypes, Children, cloneElement} from 'react'
import {compose, withState} from 'recompose'

BannerSet.propTypes = {
    showTravelAdvice: PropTypes.bool,
    expandable: PropTypes.bool,
}

function BannerSet({
    children,
    showTravelAdvice = false,
    expanded,
    setExpanded,
    expandable = false,
}) {
    return (
        <g>
            {Children.toArray(children).map((banner, index) => (
                cloneElement(banner, {
                    ...banner.props,
                    showTravelAdvice,
                    expandable,
                    onExpandClick: event => setExpanded(expanded === index ? null : index),
                    expanded: expanded === index,
                })
            ))}
        </g>
    )
}

export default compose(
    withState('expanded', 'setExpanded', null)
)(BannerSet)
