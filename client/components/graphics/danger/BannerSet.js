import React, { Children, cloneElement, useState } from 'react'
import PropTypes from 'prop-types'

BannerSet.propTypes = {
    showTravelAdvice: PropTypes.bool,
    expandable: PropTypes.bool,
    children: PropTypes.node,
}

export default function BannerSet({
    showTravelAdvice = false,
    expandable = false,
    children,
}) {
    const [value, set] = useState(null)

    return (
        <g>
            {Children.map(children, (banner, index) =>
                cloneElement(banner, {
                    showTravelAdvice,
                    expandable,
                    expanded: value === index,
                    onExpandClick() {
                        set(value === index ? null : index)
                    },
                })
            )}
        </g>
    )
}
