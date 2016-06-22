import React, {PropTypes} from 'react'
import {DateElement} from 'components/misc'

Header.propTypes = {
    date: PropTypes.instanceOf(Date),
}

export default function Header({ date }) {
    return (
        <h3>
            <DateElement value={date} />
        </h3>
    )
}
