import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import * as params from 'prismic/params'
import { STATIC_PAGE, SPONSOR } from 'constants/prismic'
import { Content, Header, Headline, Main, Banner, Aside } from 'components/page'
import { Page } from 'layouts/pages'
import { Loading, Error } from 'components/text'
import { StructuredText, SliceZone } from 'prismic/components/base'
import Sidebar from 'components/sidebar'
import { useDocument, useGeneric } from '../hooks'
import * as Async from 'contexts/async'
import { Details } from 'components/error'
import { FormattedMessage } from 'react-intl'

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function StaticPage({ uid, title, ...props }) {
    return (
        <Page {...props}>
            <Static uid={uid} title={title} />
        </Page>
    )
}

export function Static({ uid, title }) {
    const name = title || uid
    const props = {
        ...params.uid(STATIC_PAGE, uid),
        fetchLinks: `${SPONSOR}.name,${SPONSOR}.url,${SPONSOR}.image-229`,
    }

    return (
        <Async.Provider value={useDocument(props)}>
            <Async.Found>
                <PageBanner />
            </Async.Found>
            <Header title={<Title>{title}</Title>} />
            <Content>
                <Pending title={title} />
                <Main>
                    <Async.Empty>
                        <DocumentNotFound title={name} />
                    </Async.Empty>
                    <Async.Found>
                        <StaticPageBody />
                    </Async.Found>
                </Main>
                <Async.Found>
                    <PageAside />
                </Async.Found>
                <Async.FirstError>
                    <Async.HTTPError>
                        <Details
                            summary={
                                <FormattedMessage
                                    description="Prismic layouts/Static"
                                    defaultMessage="An error happened while getting document {title}."
                                    values={{ title: name }}
                                />
                            }></Details>
                    </Async.HTTPError>
                    <Async.Throw />
                </Async.FirstError>
            </Content>
        </Async.Provider>
    )
}

GenericPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function GenericPage({ uid, title }) {
    return (
        <Async.Provider value={useDocument(params.generic(uid))}>
            <Page>
                <Header title={<Title>{title}</Title>} />
                <Content>
                    <Pending title={title} />
                    <Main>
                        <Async.Found>
                            <GenericContent />
                        </Async.Found>
                        <Async.FirstError>
                            <Async.Empty>
                                <DocumentNotFound title={title || uid} />
                            </Async.Empty>
                            <Async.Throw />
                        </Async.FirstError>
                    </Main>
                </Content>
            </Page>
        </Async.Provider>
    )
}

Generic.propTypes = {
    uid: PropTypes.string.isRequired,
    children: PropTypes.func,
}

export function Generic({ uid, children }) {
    return (
        <GenericProvider uid={uid}>
            <Async.Pending>
                <Loading />
            </Async.Pending>
            <Async.Found>{children || <GenericContent />}</Async.Found>
        </GenericProvider>
    )
}

export function GenericProvider({ uid, children }) {
    return <Async.Provider value={useGeneric(uid)}>{children}</Async.Provider>
}

// Util components
export function GenericContent({ payload }) {
    return <StructuredText value={payload.data.body} />
}
function StaticPageBody({ payload }) {
    const { headline, content, title } = payload.data

    return (
        <Fragment>
            <Helmet>
                <title>{title}</title>
                {headline && <meta name="description" content={headline} />}
            </Helmet>
            {headline && <Headline>{headline}</Headline>}
            {Array.isArray(content) && <SliceZone value={content} />}
        </Fragment>
    )
}
export function Title({ children = null }) {
    return (
        <Fragment>
            <Async.Pending>
                <Loading as="span">{children}</Loading>
            </Async.Pending>
            <Async.Found>
                {document => document.data.title || children}
            </Async.Found>
            <Async.Empty>
                <DocumentNotFound />
            </Async.Empty>
            <Async.Error>{children}</Async.Error>
        </Fragment>
    )
}
function DocumentNotFound({ title = '' }) {
    return (
        <Error>
            <FormattedMessage
                description="Prismic layouts/Static"
                defaultMessage="Document {title} not found."
                values={{ title }}
            />
        </Error>
    )
}
function Pending({ title }) {
    return (
        <Async.Pending>
            <Loading>
                <FormattedMessage
                    description="Prismic layouts"
                    defaultMessage="Loading {title} page..."
                    values={{ title }}
                />
            </Loading>
        </Async.Pending>
    )
}
function PageAside({ payload }) {
    let { sharing, following, contacting, sidebar = [], contact } = payload.data

    sharing = sharing === 'Yes'
    following = following === 'Yes'
    contacting = contacting === 'Yes'

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
function PageBanner({ payload }) {
    const { banner } = payload.data

    return banner?.url ? <Banner {...banner} /> : null
}
