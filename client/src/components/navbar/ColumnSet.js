import React, { PropTypes } from 'react'

function createStyle(count, gap) {
    if (count === 1) {
        return null
    }

    return {
        columnCount: count,
        WebkitColumnCount: count,
        MozColumnCount: count,
        columnGap: gap,
        WebkitColumnGap: gap,
        MozColumnGap: gap,
    }
}

ColumnSet.propTypes = {
    count: PropTypes.number,
    gap: PropTypes.number,
}

export default function ColumnSet({ count = 1, gap = 25, children }) {
    return (
        <div style={createStyle(count, gap)}>
            {children}
        </div>
    )
}
