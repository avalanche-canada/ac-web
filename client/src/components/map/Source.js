import React, { Component, PropTypes } from 'react'

export default class Source extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['vector', 'raster', 'geojson', 'image', 'video']),
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    componentWillMount() {
        const {map} = this.context
        const {id, ...source} = this.props

        map.on('load', function addSource() {
            map.addSource(id, source)
        })
    }
    componentWillUnmount() {
        this.context.map.removeSource(this.props.id)
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        return null
    }
}
