import React, { memo, createElement } from 'react'
import PropTypes from 'prop-types'
import { Toggle } from 'react-powerplug'
import classnames from 'classnames/bind'
import Dimensions from 'components/Dimensions'
import styles from './Credit.css'

Credit.propTypes = {
    children: PropTypes.string.isRequired,
    compact: PropTypes.bool,
    top: PropTypes.bool,
}

function Credit({ top, compact, children }) {
    return (
        <Toggle>
            {({ on, toggle }) => {
                const className = classNames({
                    Credit: true,
                    Compact: compact,
                    Expanded: on,
                    Top: top,
                })

                return (
                    <span
                        data-label="Credit"
                        className={className}
                        onClick={toggle}>
                        {children}
                    </span>
                )
            }}
        </Toggle>
    )
}

const Credit = memo(Credit)

export default Object.assign(Credit, {
    Managed(props) {
        return (
            <Dimensions>
                {({ width }) =>
                    createElement(Credit, {
                        ...props,
                        compact: width < MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT,
                    })
                }
            </Dimensions>
        )
    },
})

// Constants
const MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT = 250
const classNames = classnames.bind(styles)
