import React from 'react'
import PropTypes from 'prop-types'
import { Contact } from '~/components/sidebar'
import {
    Page,
    Content,
    Header,
    Headline,
    Main,
    Banner,
    Aside,
} from '~/components/page'
import Sidebar from '~/components/sidebar'
import { Status } from '~/components/misc'
import { parse } from '~/prismic'
import { SliceZone } from '~/prismic/components/base'

StaticPage.propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
    status: PropTypes.object.isRequired,
    document: PropTypes.object,
}

export default function StaticPage({ type, uid, title, status, document }) {
    const defaults = {
        title,
        content: [],
    }
    const page = parse(document, defaults)
    const { headline, content, sidebar, banner, ...rest } = page.data
    const contact = typeof contact === 'string'
        ? <Contact email={contact} />
        : contact

    // TODO: Looking at className usage and find out is we still need that
    return (
        <Page className={`${type}-${uid}`}>
            {banner && <Banner url={banner.main.url} />}
            <Header title={rest.title} />
            <Content>
                <Status {...status.toJSON()} />
                <Main>
                    {headline && <Headline>{headline}</Headline>}
                    <SliceZone value={content} />
                </Main>
                {sidebar &&
                    <Aside>
                        <Sidebar {...sidebar}>
                            <SliceZone value={sidebar.content} />
                        </Sidebar>
                    </Aside>}
            </Content>
        </Page>
    )
}
