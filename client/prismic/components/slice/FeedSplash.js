import {compose, withProps} from 'recompose'
import FeedSplash from '~/containers/feed/Splash'

const types = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])

export default compose(
    withProps(({content: [{type, header, tags}]}) => ({
        type: types.get(type),
        tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : [],
        header,
    }))
)(FeedSplash)
