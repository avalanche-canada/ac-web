import React from 'react'
import * as T from 'components/text'
import Page from './Page'
import Content from './Content'
import Main from './Main'

export Page from './Page'
export Content from './Content'
export Section from './Section'
export Main from './Main'
export Banner from './Banner'
export Article from './Article'
export Header from './Header'
export Headline from './Headline'
export Aside from './Aside'
export Nav from './Nav'
export List from './List'
export { Item as ListItem } from './List'

export Error from './Error'
export NotFound from './NotFound'

export ContextMap from './ContextMap'

export function Loading({ title, children }) {
    return (
        <Page>
            <Content>
                <Main>
                    <h1>
                        <T.Loading>{title}</T.Loading>
                    </h1>
                    {children}
                </Main>
            </Content>
        </Page>
    )
}
