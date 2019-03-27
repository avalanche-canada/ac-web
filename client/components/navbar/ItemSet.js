import React, { cloneElement, Children, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import keycodes from 'constants/keycodes'
import { useEventListener } from 'utils/react'
import Backdrop from '../misc/Backdrop'
import styles from './Navbar.css'

ItemSet.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
}

export default function ItemSet({ children, location }) {
    const [activeIndex, setActiveIndex] = useState(null)
    const opened = activeIndex !== null
    function close() {
        setActiveIndex(null)
    }
    function handleKeyUp({ keyCode }) {
        if (keycodes.esc !== keyCode) {
            return
        }

        close()
    }

    useEventListener('keyup', handleKeyUp)
    useEffect(close, [location])

    return (
        <div className={styles['ItemSet--Container']}>
            <ul className={styles.ItemSet}>
                {Children.toArray(children)
                    .filter(Boolean)
                    .map((item, index) => {
                        if (Children.count(item.props.children) === 0) {
                            return item
                        }

                        const isActive = activeIndex === index
                        const props = {
                            isActive,
                            onClick(event) {
                                event.preventDefault()

                                if (activeIndex === index) {
                                    close()
                                } else {
                                    setActiveIndex(index)
                                }
                            },
                        }
                        const children = cloneElement(item.props.children, {
                            isOpened: isActive,
                        })

                        return cloneElement(item, props, children)
                    })}
            </ul>
            {opened && <Backdrop onClick={close} />}
        </div>
    )
}
