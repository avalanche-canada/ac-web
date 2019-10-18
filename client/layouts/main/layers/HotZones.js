import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import { useAdvisoriesMetadata } from 'hooks/async/features'
import { Source, Circle } from 'components/map'
import { hotZone } from 'prismic/params'
import { HOT_ZONE_REPORTS as key } from 'constants/drawers'
import { useDocuments } from 'prismic/hooks'

HotZones.propTypes = {
    visible: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export default function HotZones(props) {
    const [areas = []] = useAdvisoriesMetadata()
    const [documents = []] = useDocuments(hotZone.reports())
    const data = useMemo(() => {
        const regions = documents.map(pluckRegion)

        return turf.featureCollection(
            areas.map(zone => createFeature(zone, regions.includes(zone.id)))
        )
    }, [areas, documents])

    return (
        <Source id={key} data={data}>
            <Circle id={key} {...props} {...styles} />
        </Source>
    )
}

// Utils
function createFeature({ id, name, centroid }, active) {
    return turf.point(
        centroid,
        {
            id,
            type: key,
            title: name,
            active,
        },
        { id }
    )
}
function pluckRegion({ data }) {
    return data.region
}

// Styles
const styles = {
    paint: {
        'circle-blur': 0.75,
        'circle-opacity': 0.9,
        'circle-color': [
            'case',
            ['boolean', ['get', 'active'], false],
            '#004285',
            'hsl(0, 0%, 55%)',
        ],
        'circle-radius': {
            base: 1,
            stops: [[0, 0], [5, 35], [10, 250], [20, 2000]],
        },
    },
}
