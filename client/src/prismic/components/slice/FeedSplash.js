import {compose, withProps} from 'recompose'
import FeedSplash from 'containers/feed/Splash'

const types = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])

export default compose(
    withProps(({content: [{type, header}]}) => ({
        type: types.get(type),
        header,
    }))
)(FeedSplash)
