import React from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Header, Main, Headline, Aside } from 'components/page'
import { Metadata, Entry } from 'components/metadata'
import { DateElement } from 'components/time'
import { StructuredText } from 'prismic/components/base'
import Sidebar from './Sidebar'

// TODO: Move to layouts...

Post.propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    source: PropTypes.string,
    location: PropTypes.string,
    hostedBy: PropTypes.string,
}

export default function Post(props) {
    const {
        uid,
        type,
        title,
        headline,
        content,
        date,
        startDate,
        endDate,
        source,
        location,
        hostedBy,
    } = props
    const hasDateRange = startDate && endDate

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Metadata>
                        {date && (
                            <Entry term="Date">
                                {hasDateRange ? (
                                    <span>
                                        <DateElement value={startDate} />{' '}
                                        <em>to</em>{' '}
                                        <DateElement value={endDate} />
                                    </span>
                                ) : (
                                    <DateElement value={date} />
                                )}
                            </Entry>
                        )}
                        {typeof location === 'string' && (
                            <Entry term="Location">{location}</Entry>
                        )}
                        {source && <Entry term="Source">{source}</Entry>}
                        {hostedBy && <Entry term="Hosted by">{hostedBy}</Entry>}
                    </Metadata>
                    {headline && (
                        <Headline>
                            <StructuredText value={headline} />
                        </Headline>
                    )}
                    <StructuredText value={content} />
                </Main>
                <Aside>
                    <Sidebar type={type} uid={uid} />
                </Aside>
            </Content>
        </Page>
    )
}
