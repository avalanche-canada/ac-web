import { compose, lifecycle } from 'recompose'
import withRouter from 'react-router/lib/withRouter'
import Post from '~/components/page/post'
import { post } from '~/containers/connectors'

export default compose(
    withRouter,
    post,
    lifecycle({
        componentWillUpdate({ status, router, post, route }) {
            if (status.isLoaded && !post) {
                const [path] = route.path.split('/')

                router.replace(path)
            }
        },
    })
)(Post)
