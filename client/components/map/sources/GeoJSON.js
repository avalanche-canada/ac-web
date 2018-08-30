import React, { PureComponent, Children, cloneElement } from 'react'
import { Consumer } from '../Context'

export default class GeoJSONSource extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        data: PropTypes.object,
    }
    static defaultProps = {
        data: {},
    }
    componentDidMount() {
        const { id, data } = this.props

        this.map.addSource(id, {
            type: 'geojson',
            data,
        })
    }
    componentDidUpdate({ data }) {
        if (data !== this.props.data) {
            this.map.getSource(this.props.id).setData(this.props.data)
        }
    }
    componentWillUnmount() {
        this.map.removeSource(this.props.id)
    }
    renderLayer = layer => {
        return cloneElement(layer, {
            source: this.props.id,
        })
    }
    setMap = map => {
        this.map = map

        return map ? Children.map(this.props.children, this.renderLayer) : null
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
