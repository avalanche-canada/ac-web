import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Controls.css'

export default class Input extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    }
    render() {
        const { className, ...props } = this.props

        return (
            <input {...props} className={classnames(styles.Input, className)} />
        )
    }
}
