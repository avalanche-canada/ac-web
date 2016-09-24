import React, {PropTypes} from 'react'
import {Page, Content, Header, Main, Headline, Aside} from 'components/page'
import {Metadata, Entry} from 'components/metadata'
import {DateElement, InnerHTML, Muted} from 'components/misc'
import Sidebar from './Sidebar'

Post.propTypes = {
    post: PropTypes.shape({
        featured: PropTypes.bool,
        title: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        media: PropTypes.string,
        source: PropTypes.string,
        location: PropTypes.string,
    }).isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string,
}

export default function Post({post = {}, message, type}) {
    const {
        uid,
        featured = false,
        title,
        headline,
        content,
        date,
        media,
        source,
        location,
    } = post

    return (
        <Page>
            <Header title={title || message} />
            <Content>
                <Metadata>
                    {date &&
                        <Entry term='Date'>
                            <DateElement value={date} />
                        </Entry>
                    }
                    {typeof location === 'string' &&
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
                <Main>
                    {headline &&
                        <Headline>
                            <InnerHTML>
                                {headline}
                            </InnerHTML>
                        </Headline>
                    }
                    {message ?
                        <Muted>{message}</Muted> :
                        <InnerHTML>
                            {content}
                        </InnerHTML>
                    }
                </Main>
                <Aside>
                    <Sidebar type={type} uid={uid} />
                </Aside>
            </Content>
        </Page>
    )
}
