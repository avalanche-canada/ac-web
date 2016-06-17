
import {heading} from 'constants/utils'

export default function rss(level = 2) {
    return `
Avalanche Canada has switched to an RSS feed for its daily forecasts. This is a much more flexible method that allows automatic delivery to your email inbox, or to an RSS reader of your choice.

${heading(level)} What are RSS feeds?

RSS (Really Simple Syndication) is a popular standardized file format allowing up-to-date delivery of web-based content. RSS feeds enable you to receive content updates from websites, delivered to your email through an RSS aggregator (such as [blogtrottr.com](http://blogtrottr.com/)) or viewed through applications called RSS readers (such as [feedly.com](http://feedly.com/)).

${heading(level + 1)} Set up an RSS feed for your email:

Select a RSS aggregator
1. Go to the forecast of your choice and click on the “RSS feed” icon near the bottom of the right-hand pane. This will take you to the RSS feed for that region.
2. Copy the url and paste it into the appropriate field of your RSS aggregator.
3. Fill in your email address.
4. Voila! Watch the Avalanche Canada forecast roll into your inbox.
`
}
