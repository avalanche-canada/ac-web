import {compose, lifecycle, flattenProp} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {loadForUid} from 'actions/prismic'
import Post from 'components/page/post'
import mapStateToProps from 'selectors/prismic/post'

export default compose(
    withRouter,
    connect(mapStateToProps, {
        loadForUid
    }),
    lifecycle({
        componentDidMount() {
            const {loadForUid, params: {uid}, type} = this.props

            loadForUid(type, uid)
        },
        componentDidUpdate({isFetching, router, post, route}) {
            if (!isFetching && !post) {
                const [path] = route.path.split('/')

                router.replace(path)
            }
        },
    }),
    flattenProp('post'),
)(Post)
