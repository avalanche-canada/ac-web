import React from 'react'
import {compose, mapProps} from 'recompose'
import {Subscribe} from 'services/mailchimp'

export default compose(
    mapProps(({content: [{url}]}) => ({
        url
    })),
)(Subscribe)
