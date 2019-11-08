import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Form.css'

Form.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export function Form({ children, style }) {
    return (
        <form className={css.Form} style={style}>
            {children}
        </form>
    )
}

export Search from './Search'

Fieldset.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Fieldset({ children }) {
    return <fieldset className={css.Fieldset}>{children}</fieldset>
}

Legend.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Legend({ children }) {
    return <legend className={css.Legend}>{children}</legend>
}

Control.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    bordered: PropTypes.bool,
}

export function Control({ children, horizontal, bordered, ...props }) {
    const className = classnames({
        [css.Control]: !horizontal,
        [css['Control--Horizontal']]: horizontal,
        [css.Border]: bordered,
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

    return <div className={css[className]}>{children}</div>
}
