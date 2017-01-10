import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {ElementResize} from 'components/misc'
import styles from './Problem.css'

TopicSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function TopicSet({children}) {
    return (
        <ElementResize>
            {width => {
                let classNames = [styles.TopicSet]

                if (width > 300) {
                    if (width > 650) {
                        classNames.push(styles['TopicSet--4PerRow'])
                    } else {
                        classNames.push(styles['TopicSet--2PerRow'])
                    }
                }

                return (
                    <div className={classNames.join(' ')}>
                        {children}
                    </div>
                )
            }}
        </ElementResize>
    )
}
