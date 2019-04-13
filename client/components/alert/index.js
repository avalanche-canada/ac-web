import React from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.css'

// Types
const DANGER = 'DANGER'
const INFO = 'INFO'
const WARNING = 'WARNING'
const SUCCESS = 'SUCCESS'

export const Danger = alert(DANGER)
export const Info = alert(INFO)
export const Warning = alert(WARNING)
export const Success = alert(SUCCESS)

// Component
Alert.propTypes = {
    type: PropTypes.oneOf([DANGER, INFO, WARNING, SUCCESS]).isRequired,
    children: PropTypes.node.isRequired,
}

function Alert({ type, children, ...props }) {
    return (
        <div className={classNames.get(type)} {...props}>
            {children}
        </div>
    )
}

// HOC
function alert(type) {
    return props => <Alert {...props} type={type} />
}

// Styles
const classNames = new Map([
    [DANGER, styles.Danger],
    [INFO, styles.Info],
    [WARNING, styles.Warning],
    [SUCCESS, styles.Success],
])
