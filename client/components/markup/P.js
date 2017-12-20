import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './P.css'

export default class P extends PureComponent {
    static propTypes = {
        children: PropTypes.string,
        capAt: PropTypes.number,
        title: PropTypes.string,
    }
    static defaultProps = {
        children: '',
        capAt: Infinity,
    }
    state = {
        capAt: this.props.capAt,
    }
    render() {
        let { children, capAt, title, ...props } = this.props
        const capped = children.length > capAt
        const className = capped ? 'Capped' : null

        title = capped ? 'Click to read more' : title
        children = capped ? children.substr(0, capAt) : children

        return (
            <p className={styles[className]} {...props}>
                {children}
            </p>
        )
    }
}
