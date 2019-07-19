import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Form.css'

Form.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export function Form({ children, style }) {
    return (
        <form className={styles.Form} style={style}>
            {children}
        </form>
    )
}

export Search from './Search'

Fieldset.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Fieldset({ children }) {
    return <fieldset className={styles.Fieldset}>{children}</fieldset>
}

Legend.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Legend({ children }) {
    return <legend className={styles.Legend}>{children}</legend>
}

Control.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    bordered: PropTypes.bool,
}

export function Control({ children, horizontal, bordered, ...props }) {
    const className = classNames({
        Control: !horizontal,
        'Control--Horizontal': horizontal,
        Border: bordered,
    })

    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

ControlSet.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
}

export function ControlSet({ horizontal, children }) {
    const className = horizontal ? 'ControlSet--Horizontal' : 'ControlSet'

    return <div className={styles[className]}>{children}</div>
}

// Styles
const classNames = classnames.bind(styles)
