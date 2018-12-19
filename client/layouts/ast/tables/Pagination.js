import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Base from 'components/pagination'

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    count: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

function Pagination({ page, count, pageSize = 25, onChange }) {
    const total = Math.ceil(count / pageSize)

    return <Base total={total} active={page} onChange={onChange} />
}

export default memo(Pagination)
