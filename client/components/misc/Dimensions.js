import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Dimensions extends PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        width: null,
        height: null,
    }
    update = () => {
        const { offsetWidth, offsetHeight } = this.refs.dimensions

        this.setState({
            width: offsetWidth,
            height: offsetHeight,
        })
    }
    componentDidMount() {
        this.update()
        window.addEventListener('resize', this.update, false)
        window.addEventListener('orientationchange', this.update, false)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.update)
        window.removeEventListener('orientationchange', this.update)
    }
    render() {
        const { children, ...props } = this.props

        return (
            <div {...props} ref="dimensions">
                {children(this.state)}
            </div>
        )
    }
}
