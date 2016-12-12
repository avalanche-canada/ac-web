import React, {Component} from 'react'
import debounce from 'lodash/debounce'

export default class Ratio extends React.Component {
    static propTypes = {
        x: React.PropTypes.number,
        y: React.PropTypes.number,
        children: React.PropTypes.func.isRequired,
        traverse: PropTypes.bool,
    }
    static defaultProps = {
        x: 16,
        y: 9,
        traverse: false,
    }
    state = {
        width: 0,
        height: 0,
    }
    getComputedDimensions(props) {
        return this.computeDimensionsElement(this.container, props)
    }
    computeDimensionsElement(element, props) {
        const {x, y, traverse} = props
        const {width} = element.getBoundingClientRect()

        if (traverse === true && width === 0) {
            return this.computeDimensionsElement(element.parentNode, props)
        }

        return {
            width: Math.round(width),
            height: Math.round(width * (y / x)),
        }
    }
    componentWillReceiveProps(next) {
        this.setState(this.getComputedDimensions(next))
    }
    componentDidMount() {
        this.setState({
            ...this.getComputedDimensions(this.props),
            hasComputed: true,
        })

        window.addEventListener('resize', this.handleResize, false)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false)
    }
    handleResize = debounce(() => {
        this.setState({
            hasComputed: false,
        }, () => {
            this.setState({
                hasComputed: true,
                ...this.getComputedDimensions(this.props),
            })
        })
    }, 100)
    render() {
        return (
            <div ref={ref => this.container = ref}>
                {this.props.children(this.state.width, this.state.height, this.state.hasComputed)}
            </div>
        )
    }
}
