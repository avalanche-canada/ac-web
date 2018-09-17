import React from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.css'

export const DANGER = 'DANGER'
export const INFO = 'INFO'
export const WARNING = 'WARNING'
export const SUCCESS = 'SUCCESS'

Alert.propTypes = {
    type: PropTypes.oneOf([DANGER, INFO, WARNING, SUCCESS]).isRequired,
    children: PropTypes.node.isRequired,
}

export default function Alert({ type = DANGER, children, ...props }) {
    return (
        <div className={classNames.get(type)} {...props}>
            {children}
        </div>
    )
}

const classNames = new Map([
    [DANGER, styles.Danger],
    [INFO, styles.Info],
    [WARNING, styles.Warning],
    [SUCCESS, styles.Success],
])
