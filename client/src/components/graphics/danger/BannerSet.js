import React, {PropTypes, Children, cloneElement} from 'react'
import {compose, withState} from 'recompose'
import Elevations, {ALP, TLN, BTL} from 'constants/forecast/elevation'

const VALUES = [ALP, TLN, BTL]

BannerSet.propTypes = {
    showTravelAdvice: PropTypes.bool,
    expandable: PropTypes.bool,
}

function BannerSet({ children, showTravelAdvice = false, expanded, setExpanded, expandable = false }) {
    //TODO(wnh): Make this list not order specific. Dont know why it was reversed before.
    const banners = Children.toArray(children)

    return (
        <g>
            {banners.map((banner, index) => (
                cloneElement(banner, {
                    elevation: VALUES[index],
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
