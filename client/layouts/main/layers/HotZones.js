import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import * as turf from '@turf/helpers'
import * as features from 'containers/features'
import { Consumer } from 'components/map/Context'
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
    withZones = ({ data }) => {
        return (
            <Source id={key} cluster data={createFeatureCollection(data)}>
                <Layer.Circle id={key} {...this.props} {...styles} />
            </Source>
        )
    }
    activate = region => {
        const [feature] = this.map.querySourceFeatures(key, {
            filter: ['==', 'id', region],
        })

        if (feature) {
            this.map.setFeatureState(
                { source: key, feature: feature.id },
                { active: true }
            )
        } else {
            this.map.on('sourcedata', event => {
                if (event.sourceId === key && event.isSourceLoaded) {
                    this.activate(region)
                }
            })
        }
    }
    withReports = ({ documents = [] }) => {
        documents.map(pluckRegion).forEach(this.activate)
    }
    withMap = map => {
        this.map = map

        return <Documents {...hotZone.reports()}>{this.withReports}</Documents>
    }
    render() {
        return (
            <Fragment>
                <features.HotZones>{this.withZones}</features.HotZones>
                <Consumer>{this.withMap}</Consumer>
            </Fragment>
        )
    }
}

// Utils
function createFeature({ id, name, centroid }, index) {
    return turf.point(
        centroid,
        {
            id,
            title: name,
        },
        { id: index }
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
