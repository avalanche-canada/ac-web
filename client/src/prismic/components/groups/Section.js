import React, { PropTypes } from 'react'
import {compose, setPropTypes, mapProps} from 'recompose'
import {Section} from 'components/page'
import {Html} from 'prismic'

export default compose(
    setPropTypes({
        document: PropTypes.object.isRequired,
    }),
    mapProps(({document}) => ({
        title: document.getText('title'),
        children: <Html document={document} fragment='content' />,
    }))
)(Section)
