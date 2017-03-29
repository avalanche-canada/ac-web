import React, {PureComponent, PropTypes} from 'react'

export default class Source extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['vector', 'raster', 'geojson', 'image', 'video']),
        data: PropTypes.shape({
            type: PropTypes.string.isRequired,
            features: PropTypes.array.isRequired,
        }),
        url: PropTypes.string,
        coordinates: PropTypes.array,
    }
    static defaultProps = {
        type: 'geojson'
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    get map() {
        return this.context.map
    }
    remove() {
        this.map.removeSource(this.props.id)
    }
    update() {
        const {map, props} = this
        const {id, ...source} = props

        if (map.getSource(id)) {
            map.removeSource(id)
        }

        map.addSource(id, source)
    }
    componentDidMount() {
        this.update()
    }
    componentWillUnmount() {
        this.remove()
    }
    componentWillReceiveProps() {
        this.update()
    }
    render() {
        return null
    }
}
