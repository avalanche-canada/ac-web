import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import Layer from '../Layer'
import { WithMap } from '../context'

GeoJSONSource.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    maxzoom: PropTypes.number,
    attribution: PropTypes.string,
    buffer: PropTypes.number,
    tolerance: PropTypes.number,
    cluster: PropTypes.bool,
    clusterRadius: PropTypes.number,
    clusterMaxZoom: PropTypes.number,
    lineMetrics: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.instanceOf(Layer),
        PropTypes.arrayOf(PropTypes.instanceOf(Layer)),
    ]),
}

export default function Source(props) {
    return (
        <WithMap loaded>
            <GeoJSONSource {...props} />
        </WithMap>
    )
}

class GeoJSONSource extends Component {
    static defaultProps = {
        data: turf.featureCollection([]),
    }
    componentDidMount() {
        const { id, children, map, ...source } = this.props

        Object.assign(source, { type: 'geojson' })

        map.addSource(id, source)
        this.forceUpdate()
    }
    componentDidUpdate({ data }) {
        if (data !== this.props.data) {
            setData.call(this)
        }
    }
    componentWillUnmount() {
        const { map } = this.props

        if (!map.getStyle()) {
            return
        }

        Children.map(this.props.children, child => {
            map.removeLayer(child.props.id)
        })

        map.removeSource(this.props.id)
    }
    render() {
        const { id, map } = this.props

        return map.getSource(id)
            ? Children.map(this.props.children, layer =>
                  cloneElement(layer, {
                      source: id,
                      map,
                  })
              )
            : null
    }
}

// Utils
function setData() {
    const { map, id, data } = this.props

    map.getSource(id).setData(data)
}
