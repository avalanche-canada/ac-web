import React from 'react'
import PropTypes from 'prop-types'
import { memo } from 'utils/react'

ColumnSet.propTypes = {
    count: PropTypes.number,
    gap: PropTypes.number,
    children: PropTypes.node,
}

function ColumnSet({ count, gap, children }) {
    const style =
        count === 1
            ? null
            : {
                  columnCount: count,
                  WebkitColumnCount: count,
                  MozColumnCount: count,
                  columnGap: gap,
                  WebkitColumnGap: gap,
                  MozColumnGap: gap,
              }

    return <div style={style}>{children}</div>
}

export default memo.static(ColumnSet)
