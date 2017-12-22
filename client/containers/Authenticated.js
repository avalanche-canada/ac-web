import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getIsAuthenticated } from 'getters/auth'

@connect(createStructuredSelector({ isAuthenticated: getIsAuthenticated }))
export default class Authenticated extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return this.props.children({
            isAuthenticated: this.props.isAuthenticated,
        })
    }
}
