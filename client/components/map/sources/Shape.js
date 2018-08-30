import React, { PureComponent, Children, cloneElement } from 'react'
import { Consumer } from '../Context'

export default class ShapeSource extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        features: PropTypes.object,
    }
    set(map) {
        const { id, features } = this.props

        this.map.addSource(id, features)
    }
    remove() {
        this.map.removeSource(this.props.id)
    }
    componentDidMount() {
        this.set()
    }
    componentDidUpdate() {
        this.set()
    }
    componentWillUnmount() {
        this.remove()
    }
    renderLayer = layer => {
        return cloneElement(layer, {
            sourceID: this.props.id,
        })
    }
    instance = map => {
        if (!map) {
            return null
        }

        this.map = map

        return Children.map(this.props.children, this.renderLayer)
    }
    render() {
        return <Consumer>{this.children}</Consumer>
    }
}
