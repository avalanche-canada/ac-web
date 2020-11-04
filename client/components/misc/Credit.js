import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useToggle, useClientRect } from 'hooks'
import css from './Credit.css'
import { useIntl } from 'react-intl'

Credit.propTypes = {
    children: PropTypes.string.isRequired,
    compact: PropTypes.bool,
    top: PropTypes.bool,
}

function Credit({ top, compact, children }) {
    const intl = useIntl()
    const [on, toggle] = useToggle(false)
    const label = intl.formatMessage({
        description: 'Component misc/Credit',
        defaultMessage: 'Credit',
    })
    const className = classnames({
        [css.Credit]: true,
        [css.Compact]: compact,
        [css.Expanded]: on,
        [css.Top]: top,
    })

    return (
        <span data-label={label} className={className} onClick={toggle}>
            {children}
        </span>
    )
}

const OptimizedCredit = memo(Credit)

export default Object.assign(OptimizedCredit, {
    Managed(props) {
        const [{ width }, ref] = useClientRect({ width: window.innerWidth })

        return (
            <div ref={ref}>
                <OptimizedCredit
                    {...props}
                    compact={width < MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT}
                />
            </div>
        )
    },
})

// Constants
const MAGIC_MAX_WIDTH_TO_SHOW_COMPACT_CREDIT = 250
