import React from 'react'
import {Link} from 'react-router'
import {Container, PillSet, Pill} from 'components/pill'
import {Page, Content, Banner, Main, Article, Header} from 'components/page'

const Routes = ['courses', 'providers']
const Titles = new Map([
    ['providers', 'All providers'],
    ['courses', 'All courses'],
])
const STYLE = {
    maxWidth: '100%'
}

export default function Ast({routes, form = null, table = null}) {
    const {path} = routes[routes.length - 1]

    return (
        <Page>
            <Banner url='http://res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg'>
                <Container style={STYLE}>
                    <PillSet activeIndex={Routes.indexOf(path)}>
                        <Pill>
                            <Link to='/training/courses'>Courses</Link>
                        </Pill>
                        <Pill>
                            <Link to='/training/providers'>Providers</Link>
                        </Pill>
                    </PillSet>
                </Container>
                {form}
            </Banner>
            <Content>
                <Main>
                    <Article>
                        <Header title={Titles.get(path)} />
                        {table}
                    </Article>
                </Main>
            </Content>
        </Page>
    )
}
