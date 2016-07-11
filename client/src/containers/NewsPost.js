import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/prismic/news/post'
import {loadForUid} from 'actions/prismic'
import Post from 'components/page/post'
import {history} from 'router'

export default compose(
    connect(mapStateToProps, {loadForUid}),
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
)(Post)
