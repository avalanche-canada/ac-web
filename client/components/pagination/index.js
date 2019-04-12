import React, { createElement, memo } from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.css'
import Segment, { Disabled } from './Segment'
import pagination from 'utils/pagination'

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

function Pagination({ total = 0, active = 1, onChange = () => {} }) {
    total = Math.ceil(total)

    if (total < 2) {
        return null
    }

    const segments =
        total <= 10
            ? Array(total)
                  .fill(1)
                  .map((value, index) => value + index)
            : pagination(active, total, 3, null)
    function createSegment(page, index) {
        if (typeof page === 'number') {
            return createElement(Segment, {
                key: index,
                page,
                onActivate: onChange,
                isActive: active === page,
            })
        } else {
            return <Disabled key={index}>…</Disabled>
        }
    }

    return <div className={styles.Container}>{segments.map(createSegment)}</div>
}

export default memo(Pagination)
