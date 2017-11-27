import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Table.css'

export default class Table extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        hoverable: PropTypes.bool,
        condensed: PropTypes.bool,
    }
    constructor(props) {
        super(props)

        this.classNames = classnames.bind(styles)
    }
    get className() {
        const { hoverable, condensed } = this.props

        return this.classNames({
            Table: !condensed,
            'Table--Condensed': condensed,
            Hoverable: hoverable,
        })
    }
    render() {
        return <table className={this.className}>{this.props.children}</table>
    }
}
