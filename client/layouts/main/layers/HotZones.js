import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import * as features from 'containers/features'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Documents } from 'prismic/containers'
import { hotZone } from 'prismic/params'
import { HOT_ZONE_REPORTS as key } from 'constants/drawers'

export default class HotZones extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    add({ data = [] }, { documents = [] }) {
        const zones = turf.featureCollection(data.map(createFeature))
        const regions = new Set(documents.map(pluckRegion))

        for (const zone of zones.features) {
            Object.assign(zone.properties, {
                active: regions.has(zone.id),
            })
        }

        return (
            <Fragment>
                <Source id={key} cluster data={zones} />
                <Layer.Circle
                    id={key}
                    source={key}
                    {...this.props}
                    {...style}
                />
            </Fragment>
        )
    }
    render() {
        return (
            <features.HotZones>
                {zones => (
                    <Documents {...hotZone.reports()}>
                        {reports => this.add(zones, reports)}
                    </Documents>
                )}
            </features.HotZones>
        )
    }
}

// Utils
function createFeature({ id, name, centroid }) {
    return turf.point(centroid, {
        id,
        type: key,
        title: name,
    })
}
function pluckRegion({ data }) {
    return data.region
}

// Styles
const style = {
    paint: {
        'circle-blur': 0.75,
        'circle-opacity': 0.9,
        'circle-color': [
            'case',
            ['get', 'active'],
            '#004285',
            'hsl(0, 0%, 55%)',
        ],
        'circle-radius': {
            base: 1,
            stops: [[0, 0], [5, 35], [10, 250], [20, 2000]],
        },
    },
}
