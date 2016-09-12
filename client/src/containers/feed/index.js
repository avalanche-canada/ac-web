import {withProps} from 'recompose'
import Feed from './Feed'
import Post from './Post'

// Feed and Post Pages
function feed(type, title) {
    return withProps({
        type,
        title,
    })(Feed)
}
function post(type) {
    return withProps({
        type,
    })(Post)
}

export const NewsFeed = feed('news', 'Recent news')
export const BlogFeed = feed('blog', 'Blogs')
export const EventFeed = feed('event', 'Events')

export const NewsPost = post('news')
export const BlogPost = post('blog')
export const EventPost = post('event')
