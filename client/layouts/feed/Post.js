import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Loading } from 'components/text'
import * as params from 'prismic/params'
import { Page, Content, Header, Main, Headline, Aside } from 'components/page'
import { Metadata, Entry } from 'components/metadata'
import { DateElement, Range, dateTimeFormatGetter } from 'components/time'
import TagTitle from './TagTitle'
import { StructuredText } from 'prismic/components/base'
import Sidebar from './Sidebar'
import { FEED } from 'constants/prismic'
import { TagSet, Tag } from 'components/tag'
import { feed } from 'router/prismic'
import { useDocument } from 'prismic/hooks'

Post.propTypes = {
    type: PropTypes.oneOf(FEED).isRequired,
    uid: PropTypes.string.isRequired,
}

export default function Post(props) {
    const { type, uid } = props
    const [post, pending] = useDocument(params.uid(type, uid))

    // TODO Post not found, redirecting to feed page or showing information to the user
    // if (!pending && !post) {
    //     return <Redirect to={feed.type(type)} />
    // }

    return (
        <Page>
            <Header title={post?.data?.title || 'Loading...'} />
            <Content>
                <Main>
                    {pending && <Loading />}
                    {post && <PostMetadata {...post} />}
                    {post && <PostContent {...post} />}
                </Main>
                <Aside>
                    <Sidebar {...props} />
                </Aside>
            </Content>
        </Page>
    )
}

// Components
function PostMetadata({ tags, type, data }) {
    const {
        source,
        location,
        hosted_by,
        start_date,
        end_date,
        date = start_date,
    } = data
    const hasDateRange =
        start_date &&
        end_date &&
        Date.parse(start_date) !== Date.parse(end_date)

    return (
        <Metadata>
            {date && (
                <Entry term="Date">
                    {hasDateRange ? (
                        <Range
                            from={start_date}
                            to={end_date}
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
            {hosted_by && <Entry term="Hosted by">{hosted_by}</Entry>}
            {tags.length > 0 && (
                <Entry term="Tagged under">
                    <TagSet>
                        {tags.map(tag => (
                            <Tag key={tag}>
                                <Link to={feed.tags(type, tag)}>
                                    <TagTitle value={tag} />
                                </Link>
                            </Tag>
                        ))}
                    </TagSet>
                </Entry>
            )}
        </Metadata>
    )
}
function PostContent({ data }) {
    const { shortlede, body, description } = data

    return (
        <Fragment>
            {shortlede && (
                <Headline>
                    <StructuredText value={shortlede} />
                </Headline>
            )}
            <StructuredText value={body || description} />
        </Fragment>
    )
}
