import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Status } from 'components/misc'
import { Post as Container } from 'prismic/containers'
import { Page, Content, Header, Main, Headline, Aside } from 'components/page'
import { Metadata, Entry } from 'components/metadata'
import { DateElement } from 'components/time'
import { StructuredText } from 'prismic/components/base'
import Sidebar from './Sidebar'
import { NEWS, BLOG, EVENT } from 'constants/prismic'

class Post extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }
    renderHeader(status, post) {
        const title = status.isLoading ? 'Loading...' : post.title

        return <Header title={title} />
    }
    renderMetadata({ date, source, location, hostedBy, startDate, endDate }) {
        const hasDateRange = startDate && endDate

        return (
            <Metadata>
                {date && (
                    <Entry term="Date">
                        {hasDateRange ? (
                            <span>
                                <DateElement value={startDate} /> <em>to</em>{' '}
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
        )
    }
    renderContent({ headline, content }) {
        return [
            headline ? (
                <Headline>
                    <StructuredText value={headline} />
                </Headline>
            ) : null,
            <StructuredText value={content} />,
        ]
    }
    children = ({ status, post }) => {
        if (status.isLoaded && !post) {
            // Post not found, redirecting to feed
            return <Redirect to={this.props.type} />
        }

        const { uid, type } = this.props

        return [
            this.renderHeader(status, post),
            <Content>
                <Main>
                    {post && this.renderMetadata(post)}
                    {post && this.renderContent(post)}
                    <Status {...status} />
                </Main>
                <Aside>
                    <Sidebar type={type} uid={uid} />
                </Aside>
            </Content>,
        ]
    }
    render() {
        return (
            <Page>
                <Container {...this.props}>{this.children}</Container>
            </Page>
        )
    }
}

export function NewsPost(props) {
    return <Post uid={uid(props)} type={NEWS} />
}
export function BlogPost(props) {
    return <Post uid={uid(props)} type={BLOG} />
}
export function EventPost(props) {
    return <Post uid={uid(props)} type={EVENT} />
}

function uid({ match }) {
    return match.params.uid
}
