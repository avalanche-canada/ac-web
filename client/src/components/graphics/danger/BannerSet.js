import React, { PropTypes, Children, cloneElement} from 'react'
import {compose, withState} from 'recompose'
import {VALUES as ELEVATIONS} from 'constants/forecast/elevation'

const {ALP, TLN, BTL} = ELEVATIONS
const VALUES = [ALP, TLN, BTL]

BannerSet.propTypes = {
    showTravelAdvice: PropTypes.bool,
    expandable: PropTypes.bool,
}

function BannerSet({ children, showTravelAdvice = false, expanded, setExpanded, expandable = false }) {
    const banners = Children.toArray(children).reverse()

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
