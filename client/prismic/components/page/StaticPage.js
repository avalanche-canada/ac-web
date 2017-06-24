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
    fullWidth: PropTypes.bool,
}

const ARRAY = []

export default function StaticPage({
    type,
    uid,
    title,
    status,
    document,
    fullWidth = false,
}) {
    const defaults = {
        title,
        content: ARRAY,
    }
    const { data } = parse(document, defaults)
    const { headline, content, sidebar, banner } = data
    const contact = typeof contact === 'string'
        ? <Contact email={contact} />
        : contact

    // TODO: Looking at className (prismic.css) usage and find out is we still need that
    // TODO: Removing className here and in the stylesheet
    return (
        <Page className={`${type}-${uid}`} fullWidth={fullWidth}>
            {banner && <Banner url={banner.main.url} />}
            <Header title={data.title} />
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
