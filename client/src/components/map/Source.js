import React, { Component, PropTypes } from 'react'

export default class Source extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['vector', 'raster', 'geojson', 'image', 'video']),
        data: PropTypes.shape({
            type: PropTypes.string.isRequired,
            features: PropTypes.array.isRequired,
        }),
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    get map() {
        return this.context.map
    }
    componentWillMount() {
        const {map} = this
        const {id, ...source} = this.props

        map.on('load', function addSource() {
            map.addSource(id, source)
        })
    }
    componentWillUnmount() {
        this.map.removeSource(this.props.id)
    }
    componentWillReceiveProps({id, ...source}) {
        this.map.removeSource(id).addSource(id, source)
    }
    shouldComponentUpdate({data}) {
        return data.features !== this.props.data.features
    }
    render() {
        return null
    }
}
