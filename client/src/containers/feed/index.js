import feed from './feed'
import post from './post'
import mapStateToPropsNewsFeed from 'selectors/prismic/news/feed'
import mapStateToPropsBlogFeed from 'selectors/prismic/blogs/feed'
import mapStateToPropsEventFeed from 'selectors/prismic/events/feed'
import mapStateToPropsNewsPost from 'selectors/prismic/news/post'
import mapStateToPropsBlogPost from 'selectors/prismic/blogs/post'
import mapStateToPropsEventPost from 'selectors/prismic/events/post'

// Feed and Post Pages

export const NewsFeed = feed(mapStateToPropsNewsFeed, 'Recent news', 'news')
export const BlogFeed = feed(mapStateToPropsBlogFeed, 'Blogs', 'blog')
export const EventFeed = feed(mapStateToPropsEventFeed, 'Events', 'event')

export const NewsPost = post(mapStateToPropsNewsPost, 'news')
export const BlogPost = post(mapStateToPropsBlogPost, 'blog')
export const EventPost = post(mapStateToPropsEventPost, 'event')
