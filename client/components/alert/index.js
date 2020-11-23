import React from 'react'
import PropTypes from 'prop-types'
import { Close } from 'components/button'
import styles from './Alert.module.css'

// Types
export const DANGER = 'DANGER'
export const INFO = 'INFO'
export const WARNING = 'WARNING'
export const SUCCESS = 'SUCCESS'

export const Danger = createAlertForType(DANGER)
export const Info = createAlertForType(INFO)
export const Warning = createAlertForType(WARNING)
export const Success = createAlertForType(SUCCESS)

export function forType(type) {
    return Components.get(type.toUpperCase())
}

export function OneLiner({ children }) {
    return <div className={styles.OneLiner}>{children}</div>
}

// Constants
const Components = new Map([[DANGER, Danger], [INFO, Info], [WARNING, Warning], [SUCCESS, Success]])

// Components
Alert.propTypes = {
    type: PropTypes.oneOf([DANGER, INFO, WARNING, SUCCESS]).isRequired,
    children: PropTypes.node.isRequired,
    onDismiss: PropTypes.func,
}

function Alert({ type, children, onDismiss, ...props }) {
    function handleClick(event) {
        event.preventDefault()
        onDismiss()
    }

    return (
        <div className={classNames.get(type)} {...props}>
            <div className={styles.Content}>{children}</div>
            {typeof onDismiss === 'function' && (
                <Close className={styles.Close} onClick={handleClick} />
            )}
        </div>
    )
}

// HOC
function createAlertForType(type) {
    return props => <Alert {...props} type={type} />
}

// Styles
const classNames = new Map([
    [DANGER, styles.Danger],
    [INFO, styles.Info],
    [WARNING, styles.Warning],
    [SUCCESS, styles.Success],
])
