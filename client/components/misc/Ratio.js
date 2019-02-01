import { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

// TODO: HOOKS
// Where the heck this ref is coming from?

export default class Ratio extends Component {
    static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number,
        children: PropTypes.func.isRequired,
    }
    static defaultProps = {
        x: 16,
        y: 9,
    }
    state = {
        width: 0,
        height: 0,
    }
    ref = createRef()
    computeDimensionsElement(element = this.ref?.current) {
        if (!element) {
            return this.state
        }

        const { x, y } = this.props
        const { width } = element.getBoundingClientRect()

        return {
            width: Math.round(width),
            height: Math.round(width * (y / x)),
        }
    }
    componentDidMount() {
        this.setState(this.computeDimensionsElement())

        window.addEventListener('resize', this.handleResize)
    }
    componentDidUpdate({ x, y }) {
        if (x !== this.props.x || y !== this.props.y) {
            this.setState(this.computeDimensionsElement())
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    handleResize = debounce(() => {
        this.setState(this.computeDimensionsElement())
    }, 100)
    render() {
        return this.props.children(this.ref, this.state)
    }
}
