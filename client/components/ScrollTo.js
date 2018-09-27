import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ScrollTo extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
        x: PropTypes.number,
        y: PropTypes.number,
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
        if (location.pathname !== this.props.location.pathname) {
            this.scrollTo()
        }
    }
    render() {
        return this.props.children
    }
}
