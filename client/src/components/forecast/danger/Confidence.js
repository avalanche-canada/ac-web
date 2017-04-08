import React from 'react'
import PropTypes from 'prop-types'
import {compose, setPropTypes, setDisplayName, mapProps} from 'recompose'
import Summary from '../Summary'

export default compose(
    setDisplayName('Confidence'),
    setPropTypes({
        level: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
    }),
    mapProps(({level, comment}) => ({
        title: 'Confidence',
        children: (
            <dl>
                <dt>{level}</dt>
                <dd>{comment}</dd>
            </dl>
        )
    }))
)(Summary)
