import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Legend, ControlSet } from 'components/form'

const STYLE = {
    margin: 'auto',
    position: 'relative',
}

export default class Layout extends Component {
    static propTypes = {
        legend: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }
    render() {
        return (
            <Form style={STYLE}>
                <Legend>{this.props.legend}</Legend>
                <ControlSet horizontal>{this.props.children}</ControlSet>
            </Form>
        )
    }
}
