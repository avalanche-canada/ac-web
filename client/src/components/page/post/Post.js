import React, { PropTypes } from 'react'
import {Page, Header, Main, Headline} from 'components/page'
import {Metadata, Entry} from 'components/metadata'
import {DateElement, InnerHTML, Muted} from 'components/misc'

Post.propTypes = {
    featured: PropTypes.bool,
    title: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    media: PropTypes.string,
    source: PropTypes.string,
    location: PropTypes.string,
    message: PropTypes.string,
}

export default function Post({
    featured = false,
    title,
    headline,
    content,
    date,
    media,
    source,
    location,
    message
}) {
    return (
        <Page>
            <Header title={title || message} />
            <Metadata>
                {date &&
                    <Entry term='Date'>
                        <DateElement value={date} />
                    </Entry>
                }
                {location &&
                    <Entry term='Location'>
                        {location}
                    </Entry>
                }
                {source &&
                    <Entry term='Source'>
                        {source}
                    </Entry>
                }
            </Metadata>
            {headline && <Headline>{headline}</Headline>}
            {message ?
                <Muted>{message}</Muted> :
                <InnerHTML>
                    {content}
                </InnerHTML>
            }
        </Page>
    )
}
