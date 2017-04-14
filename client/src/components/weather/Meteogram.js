import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, mapProps, setPropTypes, setDisplayName} from 'recompose'
import padstart from 'lodash/padStart'
import {Image} from '~/components/misc'
import {
    format,
    POINT_LOCATIONS,
    GROUP_LOCATIONS,
    RDPS,
    GDPS,
    HRDPS,
} from '~/services/msc/meteograms/url'


const POINT = 'point'
const GROUP = 'group'

const propTypes = {
    model: PropTypes.oneOf([RDPS, GDPS, HRDPS]),
    run: PropTypes.oneOf([0, 6, 12, 18]),
    product: PropTypes.oneOf([POINT, GROUP]),
    location: PropTypes.oneOf([...[...POINT_LOCATIONS], ...[...GROUP_LOCATIONS]]),
}

export default compose(
    setDisplayName('Meteogram'),
    withProps({
        openNewTab: true,
    }),
    setPropTypes(propTypes),
    mapProps(props => ({
        src: format(props)
    })),
)(Image)
