import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { scrollPosition } from 'utils/dom'

class ScrollTo extends Component {
    componentDidUpdate({ location }) {
        if (this.props.location.hash !== location.hash) {
            const position = scrollPosition(this.props.location.hash)

            if (position) {
                window.scrollTo(...position)
            }
        }

        if (this.props.location.pathname !== location.pathname) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollTo)
