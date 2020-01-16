import React from 'react'
import classnames from 'classnames'
import css from './dialog.css'

export default function Dialog({ children, open }) {
    const className = classnames({
        [css.Dialog]: true,
        [css.Open]: open,
    })

    return (
        <section className={className}>
            <div className={css.Inner}>{children}</div>
        </section>
    )
}

export function Header({ children }) {
    return <header className={css.Header}>{children}</header>
}

export function Footer({ children }) {
    return <footer className={css.Footer}>{children}</footer>
}

export function Body({ children }) {
    return <div className={css.Body}>{children}</div>
}
