import React, { PropTypes } from 'react'
import { pure } from 'recompose'

BroughtBy.propTypes = {
    children: PropTypes.node.isRequired
}

function BroughtBy({ children }) {
    return (
        <div>
            <p>Brought to you by</p>
            {children}
        </div>
    )
}

export default pure(BroughtBy)
