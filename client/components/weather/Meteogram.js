import React from 'react'
import PropTypes from 'prop-types'
import { Image, OpenInNewTab } from 'components/misc'
import {
    format,
    POINT_LOCATIONS,
    GROUP_LOCATIONS,
    RDPS,
    GDPS,
    HRDPS,
} from 'services/msc/meteograms/url'

const POINT = 'point'
const GROUP = 'group'

Meteogram.propTypes = {
    model: PropTypes.oneOf([RDPS, GDPS, HRDPS]),
    run: PropTypes.oneOf([0, 6, 12, 18]),
    product: PropTypes.oneOf([POINT, GROUP]),
    location: PropTypes.oneOf([
        ...[...POINT_LOCATIONS],
        ...[...GROUP_LOCATIONS],
    ]),
}

export default function Meteogram(props) {
    return (
        <OpenInNewTab>
            <Image src={format(props)} />
        </OpenInNewTab>
    )
}
