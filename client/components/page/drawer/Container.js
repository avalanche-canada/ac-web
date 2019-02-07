import React, { useState, Children, cloneElement } from 'react'
import Header from './Header'
import Body from './Body'
import styles from './Drawer.css'

// TODO Improve that component!

export default function Container({ children, ...props }) {
    const [scroll, setScroll] = useState({
        top: 0,
    })

    return (
        <div {...props} className={styles.Container}>
            {Children.toArray(children)
                .filter(Boolean)
                .map(child => {
                    switch (child.type) {
                        case Header:
                            return cloneElement(child, {
                                showBorder: scroll.top > 0,
                            })
                        case Body:
                            return cloneElement(child, {
                                onScroll(scroll) {
                                    setScroll(scroll)
                                },
                            })
                        default:
                            return child
                    }
                })}
        </div>
    )
}
