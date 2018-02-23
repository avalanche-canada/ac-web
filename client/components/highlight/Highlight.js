import React from 'react'
import PropTypes from 'prop-types'
import { Close } from 'components/button'
import classnames from 'classnames'
import styles from './Highlight.css'

export const DANGER = 'danger'
export const WARNING = 'warning'
export const INFO = 'info'
export const SUCCESS = 'success'

const CLASS_NAMES = new Map([
    [DANGER, styles.Danger],
    [WARNING, styles.Warning],
    [INFO, styles.Info],
    [SUCCESS, styles.Success],
])

Highlight.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOf([DANGER, WARNING, INFO, SUCCESS]).isRequired,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
}

export default function Highlight({
    style = WARNING,
    dismissable,
    onDismiss,
    children,
    className,
}) {
    return (
        <div className={classnames(CLASS_NAMES.get(style), className)}>
            {children}
            {dismissable && (
                <Close
                    transparent
                    className={styles.Close}
                    onClick={onDismiss}
                />
            )}
        </div>
    )
}
