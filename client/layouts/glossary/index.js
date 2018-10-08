import React from 'react'
import { Router } from '@reach/router'
import Bundle from 'components/Bundle'
import { Loading } from 'components/text'
import { Page, Main, Content, Header, Aside } from 'components/page'
import layouts from 'bundle-loader?lazy!./layouts'

export default function Layout() {
    return (
        <Page>
            <Header title="Glossary" />
            <Bundle load={layouts}>{withModule}</Bundle>
        </Page>
    )
}

// Renderer
function withModule(module) {
    if (!module) {
        return (
            <Content>
                <Loading />
            </Content>
        )
    }

    return (
        <Content>
            <Main>
                <Router>
                    <module.Definition path="terms/:uid" />
                    <module.Glossary default />
                </Router>
            </Main>
            <Aside>
                <Router primary={false}>
                    <module.GlossarySidebar path="/" />
                </Router>
            </Aside>
        </Content>
    )
}
