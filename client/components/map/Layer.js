import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'

// TODO: Rework all that

export default class Layer extends StaticComponent {
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
            'background',
        ]).isRequired,
        before: PropTypes.string,
        source: PropTypes.string,
        metadata: PropTypes.object,
        minzoom: PropTypes.number,
        maxzoom: PropTypes.number,
        filter: PropTypes.array,
        layout: PropTypes.object,
        paint: PropTypes.object,
        visibility: PropTypes.oneOf(['none', 'visible']),
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    static defaultProps = {
        visibility: 'visible',
        paint: {},
        layout: {},
    }
    get map() {
        return this.context.map
    }
    get id() {
        return this.props.id
    }
    get layout() {
        const { layout, visibility } = this.props

        return Object.assign(layout, { visibility })
    }
    get layer() {
        const { visibility, before, layout, ...layer } = this.props

        return Object.assign(layer, {
            layout: this.layout,
        })
    }
    componentWillReceiveProps({ visibility }) {
        if (visibility !== this.props.visibility) {
            this.map.setLayoutProperty(this.id, 'visibility', visibility)
        }
    }
    componentDidMount() {
        this.map.addLayer(this.layer, this.props.before)
    }
    componentWillUnmount() {
        if (this.map.getLayer(this.id)) {
            this.map.removeLayer(this.id)
        }
    }
    render() {
        return null
    }
}
