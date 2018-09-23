import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ScrollTo extends Component {
    static propTypes = {
        location: PropTypes.object,
        x: PropTypes.number,
        y: PropTypes.number,
        children: PropTypes.element,
    }
    static defaultProps = {
        x: 0,
        y: 0,
    }
    scrollTo() {
        const { x, y } = this.props

        requestAnimationFrame(() => {
            window.scrollTo(x, y)
        })
    }
    componentDidMount() {
        this.scrollTo()
    }
    componentDidUpdate({ location }) {
        const { pathname, search } = this.props.location

        if (location.pathname !== pathname || location.search !== search) {
            this.scrollTo()
        }
    }
    render() {
        return this.props.children
    }
}
