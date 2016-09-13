import React, {PropTypes} from 'react'
import {compose, withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

// TODO: Finishing implementation
// "Showing 61 to 70 of 78 entries" for example

ShowingEntriesHelper.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    total: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
}

function ShowingEntriesHelper({
    min,
    max,
    total,
    prefix = 'Showing',
    suffix = 'entries.',
}) {
    return (
        <div styleName='ShowingEntriesHelper'>
            <div>{prefix}</div>
            <div>
                Finish ;)
            </div>
            <div>{suffix}</div>
        </div>
    )
}

export default compose(
    CSSModules(styles),
)(ShowingEntriesHelper)
