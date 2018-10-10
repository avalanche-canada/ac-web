import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Document } from 'prismic/containers'
import * as params from 'prismic/params'
import { STATIC_PAGE, GENERIC, SPONSOR } from 'constants/prismic'
import {
    Page,
    Content,
    Header,
    Headline,
    Main,
    Banner,
    Aside,
} from 'components/page'
import { Loading } from 'components/text'
import { StructuredText } from 'prismic/components/base'
import Sidebar from 'components/sidebar'
import { SliceZone } from 'prismic/components/base'

export class StaticPage extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string,
    }
    renderAside({ sharing, following, contacting, sidebar = [], contact }) {
        sharing = boolean(sharing)
        following = boolean(following)
        contacting = boolean(contacting)

        if (sharing || following || contacting || sidebar.length) {
            contact = contacting
                ? typeof contact === 'string'
                    ? contact.replace(/^mailto:/, '')
                    : true
                : false

            return (
                <Aside>
                    <Sidebar
                        share={sharing}
                        follow={following}
                        contact={contact}>
                        <SliceZone value={sidebar} />
                    </Sidebar>
                </Aside>
            )
        } else {
            return null
        }
    }
    renderPage = ({ loading, document }) => {
        const { uid, title } = this.props
        const data = document?.data
        const headline = data?.headline
        const content = data?.content
        const banner = data?.banner
        const className = `${STATIC_PAGE}-${uid}`
        // classes are defined in prismic.css, kind of a hack to have full control
        // styling pages.

        return (
            <Page className={className}>
                {banner && <Banner {...banner.main} />}
                <Header title={data?.title || title} />
                <Content>
                    <Loading show={loading}>
                        {title ? `Loading ${title} page...` : 'Loading page...'}
                    </Loading>
                    <Main>
                        {headline && <Headline>{headline}</Headline>}
                        {Array.isArray(content) && (
                            <SliceZone value={content} />
                        )}
                    </Main>
                    {data && this.renderAside(data)}
                </Content>
            </Page>
        )
    }
    get params() {
        return {
            ...params.uid(STATIC_PAGE, this.props.uid),
            fetchLinks: `${SPONSOR}.name,${SPONSOR}.url,${SPONSOR}.image-229`,
        }
    }
    render() {
        return <Document {...this.params}>{this.renderPage}</Document>
    }
}

export class GenericPage extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string,
    }
    renderPage = ({ document, loading }) => {
        const { title } = this.props

        return (
            <Page>
                <Header title={document?.data?.title || title} />
                <Content>
                    <Loading show={loading}>
                        {title ? `Loading ${title} page...` : 'Loading page...'}
                    </Loading>
                    <Main>
                        <StructuredText value={document?.data?.body} />
                    </Main>
                </Content>
            </Page>
        )
    }
    get params() {
        return params.uid(GENERIC, this.props.uid)
    }
    render() {
        return <Document {...this.params}>{this.renderPage}</Document>
    }
}

export class Generic extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        children: PropTypes.func,
    }
    static defaultProps = {
        children(props) {
            return Generic.renderers.body(props)
        },
    }
    static renderers = {
        bodyAndTitle({ loading, document }) {
            return (
                <Fragment>
                    <Loading show={loading} />
                    {document && (
                        <Fragment>
                            <h1>{document.data.title}</h1>
                            <StructuredText value={document.data.body} />
                        </Fragment>
                    )}
                </Fragment>
            )
        },
        body({ loading, document }) {
            return (
                <Fragment>
                    <Loading show={loading} />
                    {document && <StructuredText value={document.data.body} />}
                </Fragment>
            )
        },
    }
    render() {
        return (
            <Document {...params.generic(this.props.uid)}>
                {this.props.children}
            </Document>
        )
    }
}

// Constants & utils
const ToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
    [null, false],
])
function boolean(string) {
    return ToBoolean.get(string)
}
