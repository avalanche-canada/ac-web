import { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Layer from './Layer'

// TODO: Rework all that

export default class Source extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
            'vector',
            'raster',
            'geojson',
            'image',
            'video',
            'canvas',
        ]).isRequired,
        children: PropTypes.node,
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    static defaultProps = {
        type: 'geojson',
    }
    get map() {
        return this.context.map
    }
    get id() {
        return this.props.id
    }
    get source() {
        const { id, type, children, ...source } = this.props

        return Object.assign(source, { type })
    }
    add() {
        this.map.addSource(this.id, this.source)
    }
    remove() {
        this.map.removeSource(this.id)
    }
    componentDidUpdate() {
        this.remove()
        this.add()
    }
    componentWillMount() {
        this.add()
    }
    componentWillUnmount() {
        this.remove()
    }
    childMapper = child => {
        if (child.type === Layer) {
            return cloneElement(child, {
                source: this.id,
            })
        }

        return child
    }
    render() {
        return Children.map(this.props.children, this.childMapper)
    }
}
