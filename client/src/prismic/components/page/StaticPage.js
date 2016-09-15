import React, {PropTypes} from 'react'
import {Page, Content, Header, Headline, Main, Banner} from 'components/page'
import Slice from 'prismic/components/slice'

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
    headline,
    content = [],
    banner,
}) {
    return (
        <Page className={`${type}-${uid}`}>
            {banner && <Banner {...banner} />}
            <Header title={title} />
            <Content>
                <Main>
                    {headline && <Headline>{headline}</Headline>}
                    {content.map(slice => <Slice {...slice} />)}
                </Main>
            </Content>
        </Page>
    )
}
