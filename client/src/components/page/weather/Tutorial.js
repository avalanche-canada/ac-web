import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {InnerHTML} from 'components/misc'
import {getTutorial} from 'selectors/prismic/weather'
import {compose, withProps} from 'recompose'

Tutorial.propTypes = {
    uid: PropTypes.string.isRequired,
}

function Tutorial({body}) {
    return (
        <InnerHTML>
            {body}
        </InnerHTML>
    )
}

export default connect(getTutorial)(Tutorial)
