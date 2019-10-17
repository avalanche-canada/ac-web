import React from 'react'
import PropTypes from 'prop-types'
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
import { StructuredText, SliceZone } from 'prismic/components/base'
import Sidebar from 'components/sidebar'
import { useDocument } from './hooks'

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function StaticPage({ uid, title }) {
    const [document, pending] = useDocument({
        ...params.uid(STATIC_PAGE, uid),
        fetchLinks: `${SPONSOR}.name,${SPONSOR}.url,${SPONSOR}.image-229`,
    })
    const data = document?.data
    const headline = data?.headline
    const content = data?.content
    const banner = data?.banner

    // classes are defined in prismic.css, kind of a hack to have full control
    // styling pages.

    return (
        <Page className={`${STATIC_PAGE}-${uid}`}>
            {banner?.url && <Banner {...banner} />}
            <Header title={data?.title || title} />
            <Content>
                {pending && (
                    <Loading>
                        {title ? `Loading ${title} page...` : 'Loading page...'}
                    </Loading>
                )}
                <Main>
                    {headline && <Headline>{headline}</Headline>}
                    {Array.isArray(content) && <SliceZone value={content} />}
                </Main>
                {data && renderAside(data)}
            </Content>
        </Page>
    )
}

GenericPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function GenericPage({ uid, title }) {
    const [document, pending] = useDocument(params.uid(GENERIC, uid))

    return (
        <Page>
            <Header title={document?.data?.title || title} />
            <Content>
                {pending && (
                    <Loading>
                        {title ? `Loading ${title} page...` : 'Loading page...'}
                    </Loading>
                )}
                <Main>
                    <StructuredText value={document?.data?.body} />
                </Main>
            </Content>
        </Page>
    )
}

Generic.propTypes = {
    uid: PropTypes.string.isRequired,
}

export function Generic({ uid }) {
    const [document, pending] = useDocument(params.generic(uid))

    return pending ? (
        <Loading />
    ) : (
        <StructuredText value={document?.data?.body} />
    )
}

// Constants, utils & renderers
function renderAside({
    sharing,
    following,
    contacting,
    sidebar = [],
    contact,
}) {
    const YES = 'Yes'
    sharing = sharing === YES
    following = following === YES
    contacting = contacting === YES

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
