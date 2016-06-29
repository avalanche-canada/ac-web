import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {getNewsPostProps} from 'reducers/prismic/news'
import {loadForUid} from 'actions/prismic'
import {NewsPost} from 'pages'
import {history} from 'router'

export default compose(
    connect(getNewsPostProps, {loadForUid}),
    lifecycle({
        componentDidMount() {
            const {loadForUid, params: {uid}} = this.props

            loadForUid('news', uid)
        },
        componentDidUpdate({message, post}) {
            if (!message && !post) {
                history.push('/news')
            }
        },
    }),
)(NewsPost)
