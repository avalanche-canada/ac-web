import React, {PropTypes} from 'react'
import {Page, Content, Header, Headline, Main, Banner, Aside} from 'components/page'
import Slice from 'prismic/components/slice'
import Sidebar from './Sidebar'
import {Status} from 'components/misc'

StaticPage.propTypes = {
    title: PropTypes.string,
    headline: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.object),
    banner: PropTypes.object,
}

export default function StaticPage({
    type,
    uid,
    title,
    status,
    document = {},
}) {
    const {
        headline,
        content = [],
        banner,
        sidebar,
    } = document

    return (
        <Page className={`${type}-${uid}`}>
            {banner && <Banner {...banner} />}
            <Header title={document.title || title} />
            <Content>
                <Status {...status.toJSON()} />
                <Main>
                    {headline && <Headline>{headline}</Headline>}
                    {content.map((slice, index) => (
                        <Slice key={index} {...slice} />
                    ))}
                </Main>
                {sidebar &&
                    <Aside>
                        <Sidebar {...sidebar} />
                    </Aside>
                }
            </Content>
        </Page>
    )
}
