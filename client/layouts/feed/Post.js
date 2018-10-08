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

export default class Post extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf([NEWS, BLOG, EVENT]).isRequired,
        uid: PropTypes.string.isRequired,
    }
    renderHeader(post) {
        return <Header title={post?.title || 'Loading...'} />
    }
    renderMetadata({ date, source, location, hostedBy, startDate, endDate }) {
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
    renderContent({ headline, content }) {
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
    children = ({ pending, fulfilled, document }) => {
        // Post not found, redirecting to feed
        if (fulfilled && !document) {
            return <Redirect to={`/${this.props.type}`} />
        }

        return (
            <Fragment>
                {this.renderHeader(document)}
                <Content>
                    <Main>
                        {document && this.renderMetadata(document)}
                        {document && this.renderContent(document)}
                        <Loading show={pending} />
                    </Main>
                    <Aside>
                        <Sidebar {...this.props} />
                    </Aside>
                </Content>
            </Fragment>
        )
    }
    render() {
        return (
            <Page>
                <Document {...params.uid(this.props)}>{this.children}</Document>
            </Page>
        )
    }
}
