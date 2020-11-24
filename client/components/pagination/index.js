import React from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.module.css'
import Segment, { Disabled } from './Segment'
import pagination from 'utils/pagination'
import { noop } from 'utils/function'

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default function Pagination({ total = 0, active = 1, onChange = noop }) {
    total = Math.ceil(total)

    if (total < 2) {
        return null
    }

    const segments = total <= 10 ? generateSequence(total) : pagination(active, total, 3, null)

    function createSegment(page) {
        if (typeof page === 'number') {
            return (
                <Segment key={page} page={page} onActivate={onChange} isActive={active === page} />
            )
        } else {
            return <Disabled key={page}>…</Disabled>
        }
    }

    return <div className={styles.Container}>{segments.map(createSegment)}</div>
}

// Utils
function generateSequence(length) {
    return Array(length)
        .fill(1)
        .map((value, index) => value + index)
}
