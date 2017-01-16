import {withProps} from 'recompose'
import Post from './Post'

export Section from './Section'
export Splash from './Splash'
export Feed from './Feed'
export FilterSet from './FilterSet'

// TODO: Not required once moved to redux-little-router
export const NewsPost = post('news')
export const BlogPost = post('blog')
export const EventPost = post('event')

function post(type) {
    return withProps({
        type,
    })(Post)
}
