import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { scrollPosition } from 'utils/dom'

@withRouter
export default class FragmentIdentifier extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        hash: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }
    componentDidMount() {
        const { hash } = this.props.location

        if (hash && this.props.hash && hash === `#${this.props.hash}`) {
            const position = scrollPosition(hash)

            if (position) {
                window.scrollTo(...position)
            }
        }
    }
    render() {
        const { hash, children } = this.props

        return <a href={`#${hash}`}>{children}</a>
    }
}
