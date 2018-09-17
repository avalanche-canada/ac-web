import React from 'react'
import PropTypes from 'prop-types'
import { Close } from 'components/button'
import classnames from 'classnames'
import styles from './Highlight.css'

export const DANGER = 'danger'
export const WARNING = 'warning'
export const INFO = 'info'
export const SUCCESS = 'success'

Highlight.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([DANGER, WARNING, INFO, SUCCESS]).isRequired,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
}

export default function Highlight({
    type = WARNING,
    dismissable,
    onDismiss,
    children,
    className,
    style,
}) {
    return (
        <div
            className={classnames(CLASS_NAMES.get(type), className)}
            style={style}>
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

const CLASS_NAMES = new Map([
    [DANGER, styles.Danger],
    [WARNING, styles.Warning],
    [INFO, styles.Info],
    [SUCCESS, styles.Success],
])
