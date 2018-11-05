import React, { Fragment } from 'react'
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

// TODO: SUSPENSE

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function StaticPage({ uid, title }) {
    const props = {
        ...params.uid(STATIC_PAGE, uid),
        fetchLinks: `${SPONSOR}.name,${SPONSOR}.url,${SPONSOR}.image-229`,
    }
    function renderPage({ loading, document }) {
        const data = document?.data
        const headline = data?.headline
        const content = data?.content
        const banner = data?.banner

        // classes are defined in prismic.css, kind of a hack to have full control
        // styling pages.

        return (
            <Page className={`${STATIC_PAGE}-${uid}`}>
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
                    {data && renderAside(data)}
                </Content>
            </Page>
        )
    }

    return <Document {...props}>{renderPage}</Document>
}

GenericPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function GenericPage({ uid, title }) {
    function renderPage({ document, loading }) {
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

    return <Document {...params.uid(GENERIC, uid)}>{renderPage}</Document>
}

Generic.propTypes = {
    uid: PropTypes.string.isRequired,
    children: PropTypes.func,
}

Generic.renderers = {
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

export function Generic({ uid, children = Generic.renderers.body }) {
    return <Document {...params.generic(uid)}>{children}</Document>
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
function renderAside({
    sharing,
    following,
    contacting,
    sidebar = [],
    contact,
}) {
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
                <Sidebar share={sharing} follow={following} contact={contact}>
                    <SliceZone value={sidebar} />
                </Sidebar>
            </Aside>
        )
    } else {
        return null
    }
}
