import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import isEqual from 'lodash/isEqual'

export default class Layer extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
            'fill',
            'line',
            'symbol',
            'circle',
            'heatmap',
            'fill-extrusion',
            'raster',
            'hillshade',
            'composite',
        ]).isRequired,
        source: PropTypes.string.isRequired,
        sourceLayer: PropTypes.string,
        minzoom: PropTypes.number,
        maxzoom: PropTypes.number,
        filter: PropTypes.array,
        layout: PropTypes.object,
        paint: PropTypes.object,
        before: PropTypes.string,
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    static defaultProps = {
        paint: {},
        layout: {},
    }
    setVisibility() {
        this.map.setLayoutProperty(
            this.props.id,
            'visibility',
            this.props.visible === false ? 'none' : 'visible'
        )
    }
    componentDidUpdate({ visible, filter }) {
        if (visible !== this.props.visible) {
            this.setVisibility()
        }
        if (!isEqual(filter, this.props.filter)) {
            const { id, filter } = this.props

            this.map.setFilter(id, filter)
        }
    }
    setMap = map => {
        this.map = map

        return null
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
