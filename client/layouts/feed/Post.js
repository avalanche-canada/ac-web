import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from '@reach/router'
import { Loading } from 'components/text'
import { Document } from 'prismic/containers'
import * as params from 'prismic/params'
import { Page, Content, Header, Main, Headline, Aside } from 'components/page'
import { Metadata, Entry } from 'components/metadata'
import { DateElement, Range, dateTimeFormatGetter } from 'components/time'
import { StructuredText } from 'prismic/components/base'
import Sidebar from './Sidebar'
import { NEWS, BLOG, EVENT } from 'constants/prismic'

Post.propTypes = {
    type: PropTypes.oneOf([NEWS, BLOG, EVENT]).isRequired,
    uid: PropTypes.string.isRequired,
}

export default function Post(props) {
    return (
        <Page>
            <Document {...params.uid(props)}>{page.bind(null, props)}</Document>
        </Page>
    )
}

export function NorthRockies() {
    const category = 'north-rockies'
    const pageSize = 1

    return (
        <Document {...params.feed.blog({ pageSize, category })}>
            {minimal}
        </Document>
    )
}

// Utils
function page(props, { pending, fulfilled, document }) {
    // Post not found, redirecting to feed
    if (fulfilled && !document) {
        return <Redirect to={`/${props.type}`} />
    }

    return (
        <Fragment>
            <PostHeader post={document} />
            <Content>
                <Main>
                    {document && <PostMetadata {...document} />}
                    {document && <PostContent {...document} />}
                    <Loading show={pending} />
                </Main>
                <Aside>
                    <Sidebar {...props} />
                </Aside>
            </Content>
        </Fragment>
    )
}
function minimal({ pending, document }) {
    return (
        <Fragment>
            {document && <PostMetadata {...document} />}
            {document && <PostContent {...document} />}
            <Loading show={pending} />
        </Fragment>
    )
}
function PostMetadata({
    date,
    source,
    location,
    hostedBy,
    startDate,
    endDate,
}) {
    const hasDateRange =
        startDate && endDate && startDate.getTime() !== endDate.getTime()

    return (
        <Metadata>
            {date && (
                <Entry term="Date">
                    {hasDateRange ? (
                        <Range
                            from={startDate}
                            to={endDate}
                            format={dateTimeFormatGetter}
                        />
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
    )
}
function PostContent({ headline, content }) {
    return (
        <Fragment>
            {headline && (
                <Headline>
                    <StructuredText value={headline} />
                </Headline>
            )}
            <StructuredText value={content} />
        </Fragment>
    )
}
function PostHeader({ post }) {
    return <Header title={post?.title || 'Loading...'} />
}
