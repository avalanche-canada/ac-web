import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import css from './Shim.css'

const styles = classNames.bind(css)

export default class Shim extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        top: PropTypes.bool,
        right: PropTypes.bool,
        bottom: PropTypes.bool,
        left: PropTypes.bool,
        vertical: PropTypes.bool,
        horizontal: PropTypes.bool,
    }
    render() {
        return <div className={styles(this.props)}>{this.props.children}</div>
    }
}
