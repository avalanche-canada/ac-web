import React, { PureComponent } from 'react'
import { Consumer } from '../sources/Context'

export default class FillLayer extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    set(sourceID) {
        const { id } = this.props

        this.map.addLayer(id, sourceID)
    }
    remove() {
        this.map.removeLayer(this.props.id)
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
    render() {
        return <Consumer>{this.set}</Consumer>
    }
}
