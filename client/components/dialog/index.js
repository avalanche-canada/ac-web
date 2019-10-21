import React from 'react'
import classnames from 'classnames/bind'
import styles from './dialog.css'

export default function Dialog({ children, open }) {
    const className = classNames({
        Dialog: true,
        Open: open,
    })

    return (
        <section className={className}>
            <div className={styles.Inner}>{children}</div>
        </section>
    )
}

export function Header({ children }) {
    return <header className={styles.Header}>{children}</header>
}

export function Footer({ children }) {
    return <footer className={styles.Footer}>{children}</footer>
}

export function Body({ children }) {
    return <div className={styles.Body}>{children}</div>
}

// Style
const classNames = classnames.bind(styles)
