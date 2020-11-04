import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useScroll } from 'hooks'
import * as Buttons from 'components/button'
import styles from './Drawer.css'
import { useIntl } from 'react-intl'

export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

Drawer.propTypes = {
    children: PropTypes.node.isRequired,
    side: PropTypes.oneOf([LEFT, RIGHT]),
    open: PropTypes.bool,
    width: PropTypes.number,
    backdrop: PropTypes.bool,
    onCloseClick: PropTypes.func,
}

export default function Drawer({
    open = false,
    side = LEFT,
    width,
    backdrop = false,
    onCloseClick,
    children,
}) {
    const withBackdrop = open && backdrop
    const style = { width }
    const className = classnames({
        [styles.Left]: side === LEFT,
        [styles.Right]: side === RIGHT,
        [styles.Open]: open,
    })

    return (
        <Fragment>
            {withBackdrop && <Backdrop onClick={onCloseClick} />}
            <section style={style} className={className}>
                {children}
            </section>
        </Fragment>
    )
}

Body.propTypes = {
    children: PropTypes.node,
    onScroll: PropTypes.func,
}

export function Body({ children }) {
    const ref = useRef(null)
    const [x] = useScroll(ref)
    const style = x > 0 ? TOP_BORDER : null

    return (
        <div ref={ref} className={styles.Body} style={style}>
            {children}
        </div>
    )
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export function Navbar({ style, children }) {
    return (
        <nav className={styles.Navbar} style={style}>
            {children}
        </nav>
    )
}

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
}

Subject.propTypes = {
    children: PropTypes.string.isRequired,
}

export function Subject({ children }) {
    return (
        <div className={styles.Subject}>
            <span>{children}</span>
        </div>
    )
}

export function Header({ subject, children, ...props }) {
    return (
        <header {...props} className={styles.Header}>
            {subject && <Subject>{subject}</Subject>}
            {children}
        </header>
    )
}

export function Banner({ children, ...props }) {
    return (
        <div {...props} className={styles.Banner}>
            {children}
        </div>
    )
}

Close.propTypes = {
    children: PropTypes.node,
}

export function Close({ children, ...rest }) {
    return (
        <Buttons.Close className={styles.Close} {...rest}>
            {children}
        </Buttons.Close>
    )
}

DisplayOnMap.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export function DisplayOnMap({ onClick }) {
    const intl = useIntl()
    const tooltip = intl.formatMessage({
        description: 'Component page/drawer/DisplayOnMap',
        defaultMessage: 'Display on map',
    })
    const LOCATE_STYLE = {
        display: 'flex',
    }

    return (
        <Buttons.Locate
            onClick={onClick}
            style={LOCATE_STYLE}
            data-tooltip={tooltip}
            data-tooltip-placement="left"
        />
    )
}

// Utils
Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

function Backdrop({ children, ...props }) {
    return (
        <div {...props} className={styles.Backdrop}>
            {children}
        </div>
    )
}

// Styles
const TOP_BORDER = {
    borderTopColor: 'rgba(0, 0, 0, 0.15)',
}
