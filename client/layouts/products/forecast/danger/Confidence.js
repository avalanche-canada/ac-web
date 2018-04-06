import React from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import Summary from '../Summary'

export default class Confidence extends StaticComponent {
    static propTypes = {
        level: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
    }
    render() {
        const { level, comment } = this.props

        return (
            <Summary title="Confidence">
                <dl>
                    <dt>{level}</dt>
                    <dd>{comment}</dd>
                </dl>
            </Summary>
        )
    }
}
