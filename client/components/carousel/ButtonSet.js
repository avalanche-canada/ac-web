import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Carousel.css'

ButtonSet.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.node.isRequired,
    slideCount: PropTypes.node.isRequired,
    onActivatePreviousPanel: PropTypes.node.isRequired,
    onActivateNextPanel: PropTypes.node.isRequired,
}

export default function ButtonSet({
    children,
    activeIndex,
    slideCount,
    onActivatePreviousPanel,
    onActivateNextPanel,
}) {
    const handlers = [onActivatePreviousPanel, onActivateNextPanel]
    const isDisabled = [activeIndex === 0, activeIndex === slideCount - 1]

    return (
        <div className={styles.ButtonSet}>
            {Children.map(children, (child, index) =>
                cloneElement(child, {
                    onClick: handlers[index],
                    disabled: isDisabled[index],
                })
            )}
        </div>
    )
}
