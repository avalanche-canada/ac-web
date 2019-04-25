import React, {
    cloneElement,
    Children,
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { useEventListener } from 'utils/react/hooks'
import keycodes from 'constants/keycodes'
import styles from './Navbar.css'

ItemSet.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
}

export default function ItemSet({ children, location }) {
    const [activeIndex, setActiveIndex] = useState(null)
    const opened = activeIndex !== null
    const container = useRef()
    function close() {
        setActiveIndex(null)
    }
    function keyUpEventHandler(event) {
        if (keycodes.esc !== event.keyCode) {
            return
        }

        close()
    }
    function clickEventHandler(event) {
        if (!container.current.contains(event.target)) {
            close()
        }
    }
    const handleClick = useMemo(() => (opened ? clickEventHandler : null), [
        opened,
    ])
    const handleKeyUp = useMemo(() => (opened ? keyUpEventHandler : null), [
        opened,
    ])

    useEventListener('keyup', handleKeyUp)
    useEventListener('click', handleClick, document)
    useEffect(close, [location])

    return (
        <div ref={container} className={styles['ItemSet--Container']}>
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
        </div>
    )
}
