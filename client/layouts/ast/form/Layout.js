import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Legend, ControlSet } from 'components/form'
import { locate } from 'actions/geolocation'

const STYLE = {
    margin: 'auto',
    position: 'relative',
}

@connect(null, { locate })
export default class Layout extends Component {
    static propTypes = {
        legend: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        locate: PropTypes.func,
    }
    componentDidMount() {
        this.props.locate()
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
