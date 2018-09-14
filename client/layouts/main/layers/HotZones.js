import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import * as turf from '@turf/helpers'
import * as features from 'containers/features'
import { Source, Layer, Map } from 'components/map'
import { Documents } from 'prismic/containers'
import { hotZone } from 'prismic/params'
import { HOT_ZONE_REPORTS as key } from 'constants/drawers'

export default class HotZones extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    withZones = ({ data }) => {
        return (
            <Map.With loaded>
                <Source id={key} data={createFeatureCollection(data)}>
                    <Layer.Circle id={key} {...this.props} {...styles} />
                </Source>
            </Map.With>
        )
    }
    render() {
        return (
            <Fragment>
                <features.HotZones>{this.withZones}</features.HotZones>
                <Map.With loaded>
                    <HotZoneActivator />
                </Map.With>
            </Fragment>
        )
    }
}

class HotZoneActivator extends Component {
    static propTypes = {
        map: PropTypes.object.isRequired,
    }
    activate = region => {
        const { map } = this.props
        const [feature] = map.querySourceFeatures(key, {
            filter: ['==', 'id', region],
        })

        if (feature) {
            map.setFeatureState(
                { source: key, id: feature.id },
                { active: true }
            )
        } else {
            map.on('sourcedata', event => {
                if (event.sourceId === key) {
                    this.activate(region)
                }
            })
        }
    }
    withReports = ({ documents = [] }) => {
        documents.map(pluckRegion).forEach(this.activate)
    }
    render() {
        return <Documents {...hotZone.reports()}>{this.withReports}</Documents>
    }
}

// Utils
function createFeature({ id, name, centroid }, index) {
    return turf.point(
        centroid,
        {
            id,
            type: key,
            title: name,
        },
        { id: index + 1 }
    )
}
const createFeatureCollection = memoize((data = []) =>
    turf.featureCollection(data.map(createFeature))
)
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
            ['boolean', ['feature-state', 'active'], false],
            '#004285',
            'hsl(0, 0%, 55%)',
        ],
        'circle-radius': {
            base: 1,
            stops: [[0, 0], [5, 35], [10, 250], [20, 2000]],
        },
    },
}
