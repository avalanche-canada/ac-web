import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Form.css'

Control.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    bordered: PropTypes.bool,
}

export default class Control extends Component {
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    render() {
        const { children, horizontal, bordered, ...props } = this.props
        const classNames = this.classnames({
            Control: !horizontal,
            'Control--Horizontal': horizontal,
            Border: bordered,
        })

        return (
            <div className={classNames} {...props}>
                {children}
            </div>
        )
    }
}
