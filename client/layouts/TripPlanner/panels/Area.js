import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Panel from './Panel'

export default class AreaPanel extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
    }
    render() {
        const { name, rating } = this.props

        return (
            <Panel expanded header="ATES Area">
                <header>
                    <h2>{name}</h2>
                </header>
                <p>{rating}</p>
                <p>Algorithm needs to be implemented.</p>
            </Panel>
        )
    }
}
