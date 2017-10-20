import { feed } from 'containers/connectors'
import {
    Feed as FeedComponent,
    FilterSet as FilterSetComponent,
} from 'components/feed'
import Post from './Post'
import { withProps } from 'recompose'

export Splash from './Splash'
export const Feed = feed(FeedComponent)
export const FilterSet = feed(FilterSetComponent)

// TODO: Use constants

export const NewsPost = post('news')
export const BlogPost = post('blog')
export const EventPost = post('event')

function post(type) {
    return withProps({
        type,
    })(Post)
}
