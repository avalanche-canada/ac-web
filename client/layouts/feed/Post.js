import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from '@reach/router'
import { Loading } from 'components/text'
import * as params from 'prismic/params'
import { Content, Header, Main, Headline, Aside } from 'components/page'
import { Page } from 'layouts/pages'
import { Metadata, Entry } from 'components/metadata'
import { DateElement, Range, dateTimeFormatGetter } from 'components/time'
import TagTitle from './TagTitle'
import { StructuredText } from 'prismic/components/base'
import Sidebar from './Sidebar'
import { useFeedTexts } from 'constants/prismic'
import { TagSet, Tag } from 'components/tag'
import { feed } from 'router/prismic'
import { useDocument } from 'prismic/hooks'
import { useIntl } from 'react-intl'

const feedTexts = useFeedTexts()

Post.propTypes = {
    type: PropTypes.oneOf(feedTexts).isRequired,
    uid: PropTypes.string.isRequired,
}

export default function Post(props) {
    const { type, uid } = props
    const [post, pending] = useDocument(params.uid(type, uid))
    const intl = useIntl()

    if (!pending && !post) {
        // Document not found, redirect to the list
        return <Redirect to={feed.type(type)} />
    }

    return (
        <Page>
            <Header title={post?.data?.title || intl.formatMessage({
                defaultMessage: 'Loading...',
                description: 'Layout feed/Post',
            })} />
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
    const intl = useIntl()

    return (
        <Metadata>
            {date && (
                <Entry term={
                    intl.formatMessage({
                        defaultMessage: 'Date',
                        description: 'Layout feed/Post',
                    })
                }>
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
                <Entry term={
                    intl.formatMessage({
                        defaultMessage: 'Location',
                        description: 'Layout feed/Post',
                    })
                }>{location}</Entry>
            )}
            {source && <Entry term={
                intl.formatMessage({
                    defaultMessage: 'Source',
                    description: 'Layout feed/Post',
                })
            }>{source}</Entry>}
            {hosted_by && <Entry term={
                intl.formatMessage({
                    defaultMessage: 'Hosted by',
                    description: 'Layout feed/Post',
                })
            }>{hosted_by}</Entry>}
            {tags.length > 0 && (
                <Entry term={
                    intl.formatMessage({
                        defaultMessage: 'Tagged under',
                        description: 'Layout feed/Post',
                    })
                }>
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
