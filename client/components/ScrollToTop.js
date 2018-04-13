import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

@withRouter
export default class ScrollToTop extends Component {
    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object.isRequired,
    }
    componentWillReceiveProps({ location }) {
        if (location !== this.props.location) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return this.props.children
    }
}
