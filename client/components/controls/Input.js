import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Controls.css'

export default class Input extends PureComponent {
    static propTypes = {
        // TODO: Remove this stupid property
        withIcon: PropTypes.bool,
        className: PropTypes.string,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    render() {
        const { withIcon, ...props } = this.props
        const className = this.classnames(this.props.className, {
            Input: !withIcon,
            'Input--WithIcon': withIcon,
        })

        return <input {...props} className={className} />
    }
}
