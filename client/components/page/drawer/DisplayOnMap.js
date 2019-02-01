import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Locate } from 'components/button'
import { Wrapper } from 'components/tooltip'
import { isTouchable } from 'utils/device'

DisplayOnMap.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function DisplayOnMap({ onClick }) {
    const link = <Locate onClick={onClick} style={LOCATE_STYLE} />

    return isTouchable ? (
        link
    ) : (
        <Wrapper tooltip="Display on map" placement="left">
            {link}
        </Wrapper>
    )
}

export default memo(DisplayOnMap)

const LOCATE_STYLE = {
    padding: '0.15em',
}
