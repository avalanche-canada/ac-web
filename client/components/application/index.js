import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Match } from '@reach/router'
import classnames from 'classnames'
import styles from './Application.css'

export default function Application({ children }) {
    return <div className={styles.Application}>{children}</div>
}

Banner.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Banner({ children }) {
    return (
        <div className={styles.Banner}>
            <Match path="/map">
                {({ match }) =>
                    cloneElement(children, {
                        className: classnames(styles.BannerContent, {
                            [styles.Map]: Boolean(match),
                        }),
                    })
                }
            </Match>
        </div>
    )
}
