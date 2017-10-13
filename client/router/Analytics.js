import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactGA from '~/services/analytics'

function pageview({ pathname, search }) {
    ReactGA.pageview(pathname + search)
}

class Analytics extends Component {
    componentDidMount() {
        pageview(this.props.location)
    }
    componentDidUpdate({ location }) {
        if (this.props.location !== location) {
            pageview(this.props.location)
        }
    }
    render() {
        return this.props.children
    }
}

export default withRouter(Analytics)
