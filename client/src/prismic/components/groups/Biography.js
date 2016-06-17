import React, { PropTypes } from 'react'
import {compose, setPropTypes, mapProps} from 'recompose'
import {Biography} from 'components/biography'

export default compose(
    setPropTypes({
        document: PropTypes.object.isRequired,
    }),
    mapProps(({document}) => ({
        
    })),
)(Biography)
