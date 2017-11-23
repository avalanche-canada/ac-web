import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.css'

export default class Segment extends PureComponent {
    static propTypes = {
        page: PropTypes.number.isRequired,
        onActivate: PropTypes.func.isRequired,
        isActive: PropTypes.bool,
        style: PropTypes.object,
        children: PropTypes.node,
    }
    handleClick = event => {
        event.preventDefault()

        this.props.onActivate(this.props.page)
    }
    render() {
        const { page, isActive, children, style } = this.props
        const className = isActive ? 'Segment--Active' : 'Segment'

        return (
            <a
                href="#"
                onClick={this.handleClick}
                className={styles[className]}
                style={style}>
                {children || page}
            </a>
        )
    }
}

export function Disabled({ children }) {
    return <span className={styles.Disabled}>{children}</span>
}
