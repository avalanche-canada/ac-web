import React, {PropTypes} from 'react'
import {Page, Content, Header, Headline, Main, Banner, Aside} from 'components/page'
import Sidebar, {Header as SidebarHeader, Item as SidebarItem} from 'components/sidebar'
import Slice from 'prismic/components/slice'
import DocumentLink from 'prismic/components/DocumentLink'

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
    sidebar,
}) {

    return (
        <Page className={`${type}-${uid}`}>
            {banner && <Banner {...banner} />}
            <Header title={title} />
            <Content>
                <Main>
                    {headline && <Headline>{headline}</Headline>}
                    {content.map((slice, index) => (
                        <Slice key={index} {...slice} />
                    ))}
                </Main>
                {sidebar &&
                    <Aside>
                        <Sidebar {...sidebar}>
                            {sidebar.content.map(({type, content}, index) => {
                                switch (type) {
                                    case 'header':
                                        return (
                                            <SidebarHeader key={index}>
                                                {content}
                                            </SidebarHeader>
                                        )
                                    case 'items':
                                        return content.map(({title, link}, index) => (
                                            <SidebarItem key={index}>
                                                {typeof link === 'object' ?
                                                    <DocumentLink {...link}>
                                                        {title}
                                                    </DocumentLink> :
                                                    <a href={link} title={title}>
                                                        {title}
                                                    </a>
                                                }
                                            </SidebarItem>
                                        ))
                                    default:
                                        return null
                                }
                            })}
                        </Sidebar>
                    </Aside>
                }
            </Content>
        </Page>
    )
}
