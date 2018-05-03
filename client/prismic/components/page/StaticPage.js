import React from 'react'
import PropTypes from 'prop-types'
import { Contact } from 'components/sidebar'
import {
    Page,
    Content,
    Header,
    Headline,
    Main,
    Banner,
    Aside,
} from 'components/page'
import Sidebar from 'components/sidebar'
import { Status } from 'components/misc'
import { parse } from 'prismic'
import { SliceZone } from 'prismic/components/base'
import { STATIC_PAGE } from 'constants/prismic'

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
    status: PropTypes.object.isRequired,
    document: PropTypes.object,
}

const ARRAY = []

export default function StaticPage({ uid, title, status, document }) {
    const defaults = {
        title,
        content: ARRAY,
    }
    const { data } = parse(document, defaults)
    const { headline, content, sidebar, banner } = data
    const contact =
        typeof contact === 'string' ? <Contact email={contact} /> : contact
    // classes are defined in prismic.css, kind of a hack to have full control
    // styling pages.
    const className = `${STATIC_PAGE}-${uid}`

    return (
        <Page className={className}>
            {banner && <Banner {...banner.main} />}
            <Header title={data.title} />
            <Content>
                <Status {...status} />
                <Main>
                    {headline && <Headline>{headline}</Headline>}
                    <SliceZone value={content} />
                </Main>
                {sidebar && (
                    <Aside>
                        <Sidebar {...sidebar}>
                            <SliceZone value={sidebar.content} />
                        </Sidebar>
                    </Aside>
                )}
            </Content>
        </Page>
    )
}
