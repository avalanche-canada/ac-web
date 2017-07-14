import { compose, lifecycle, withProps } from 'recompose'
import withRouter from 'react-router/lib/withRouter'
import Post from '~/components/page/post'
import { post } from '~/containers/connectors'
import { parse } from '~/prismic'

export default compose(
    withRouter,
    post,
    withProps(props => ({
        post: parse(props.post),
    })),
    lifecycle({
        componentWillUpdate({ status, router, post, route }) {
            if (status.isLoaded && !post) {
                const [path] = route.path.split('/')

                router.replace(path)
            }
        },
    })
)(Post)
