import { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Layer from '../Layer'

export default class GeoJSONSource extends PureComponent {
    static propTypes = {
        map: PropTypes.object.isRequired,
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
    static defaultProps = {
        data: {},
    }
    componentDidMount() {
        const { id, children, map, ...source } = this.props

        Object.assign(source, {
            type: 'geojson',
        })

        map.addSource(id, source)
        this.forceUpdate()
    }
    componentDidUpdate({ data }) {
        if (data !== this.props.data) {
            const source = this.props.map.getSource(this.props.id)

            source.setData(this.props.data)
        }
    }
    render() {
        const { id, map } = this.props

        return map.getSource(id)
            ? Children.map(this.props.children, layer =>
                  cloneElement(layer, { source: id, map })
              )
            : null
    }
}
