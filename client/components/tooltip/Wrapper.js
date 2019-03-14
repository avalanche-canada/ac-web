import React, { useRef, useState, useMemo, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'react-overlays/lib/Overlay'
import Tooltip from './Tooltip'
import styles from './Tooltip.css'

Wrapper.propTypes = {
    placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    children: PropTypes.node.isRequired,
    tooltip: PropTypes.node.isRequired,
    trigger: PropTypes.oneOf(['hover', 'click']),
}

export default function Wrapper({
    children,
    placement = 'top',
    tooltip,
    trigger = 'hover',
    ...props
}) {
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    const events = useMemo(
        () =>
            trigger === 'hover'
                ? {
                      onMouseOver() {
                          setVisible(true)
                      },
                      onMouseOut() {
                          setVisible(false)
                      },
                  }
                : {
                      onClick() {
                          setVisible(!visible)
                      },
                  },
        [trigger]
    )

    return (
        <div ref={ref} className={styles.Wrapper}>
            {cloneElement(children, events)}
            <Overlay
                show={visible}
                container={document.body}
                target={ref.current}
                placement={placement}>
                <Tooltip placement={placement} {...props}>
                    {tooltip}
                </Tooltip>
            </Overlay>
        </div>
    )
}
