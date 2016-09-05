import feed from './feed'
import post from './post'
import splash from './splash'
import * as news from 'selectors/prismic/news'
import * as blogs from 'selectors/prismic/blogs'
import * as events from 'selectors/prismic/events'

// Feed and Post Pages

export const NewsFeed = feed(news.feed, 'Recent news', 'news')
export const BlogFeed = feed(blogs.feed, 'Blogs', 'blog')
export const EventFeed = feed(events.feed, 'Events', 'event')

export const NewsPost = post(news.post, 'news')
export const BlogPost = post(blogs.post, 'blog')
export const EventPost = post(events.post, 'event')

export const NewsSplash = splash(news.splash, 'news')
export const EventsSplash = splash(events.splash, 'event')
