import React from 'react'
import PropTypes from 'prop-types'
import { Close } from 'components/button'
import { Link } from 'prismic/components/base'
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

export function forType(type) {
    return Components.get(type.toUpperCase())
}

export function OneLiner({ children }) {
    return <div className={styles.OneLiner}>{children}</div>
}

// SPAW
SPAW.propTypes = {
    link: PropTypes.object,
    children: PropTypes.node,
}

export function SPAW({
    children = 'Special Public Avalanche Warning',
    link,
    ...rest
}) {
    const content = (
        <Danger {...rest}>
            <OneLiner>{children}</OneLiner>
        </Danger>
    )

    return link ? <Link {...link}>{content}</Link> : content
}

// Constants
const Components = new Map([
    [DANGER, Danger],
    [INFO, Info],
    [WARNING, Warning],
    [SUCCESS, Success],
])

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
