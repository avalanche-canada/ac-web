import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'

export default class Confidence extends Component {
    static propTypes = {
        level: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
    }
    shouldComponentUpdate() {
        return false
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
