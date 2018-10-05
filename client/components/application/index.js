import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Match } from '@reach/router'
import classnames from 'classnames'
import styles from './Application.css'

export default function Application({ children }) {
    return <div className={styles.Application}>{children}</div>
}

export class Banner extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    children = ({ match }) =>
        cloneElement(this.props.children, {
            className: classnames(styles.BannerContent, {
                [styles.Map]: Boolean(match),
            }),
        })
    render() {
        return (
            <div className={styles.Banner}>
                <Match path="/map">{this.children}</Match>
            </div>
        )
    }
}
