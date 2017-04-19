import React from 'react'
import PropTypes from 'prop-types'
import {Page, Content, Header, Main, Headline, Aside} from '~/components/page'
import {Metadata, Entry} from '~/components/metadata'
import {DateElement, InnerHTML, Muted} from '~/components/misc'
import Sidebar from './Sidebar'

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
        source: PropTypes.string,
        location: PropTypes.string,
        hostedBy: PropTypes.string,
    }).isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string,
}

export default function Post({post = {}, message, type}) {
    const {
        uid,
        title,
        headline,
        content,
        date,
        startDate,
        endDate,
        source,
        location,
        hostedBy,
    } = post
    const hasDateRange = startDate && endDate

    return (
        <Page>
            <Header title={title || message} />
            <Content>
                <Main>
                <Metadata>
                    {date &&
                        <Entry term='Date'>
                            {hasDateRange ?
                                <span>
                                    <DateElement value={startDate} /> <em>to</em> <DateElement value={endDate} />
                                </span> :
                                <DateElement value={date} />
                            }
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
                    {hostedBy &&
                        <Entry term='Hosted by'>
                            {hostedBy}
                        </Entry>
                    }
                </Metadata>
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
