import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Locate } from 'components/button'

DisplayOnMap.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function DisplayOnMap({ onClick }) {
    const LOCATE_STYLE = {
        display: 'flex',
    }

    return (
        <Locate
            onClick={onClick}
            style={LOCATE_STYLE}
            data-tooltip="Display on map"
            data-tooltip-placement="left"
        />
    )
}

export default memo(DisplayOnMap)
