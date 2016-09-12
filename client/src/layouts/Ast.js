import React from 'react'
import {Link} from 'react-router'
import {Container, PillSet, Pill} from 'components/pill'
import {Page, Banner, Main, Article, Header} from 'components/page'
import TrainingBanner from 'assets/images/training-banner.jpg'

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
            <Banner url={TrainingBanner}>
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
            <Main>
                <Article>
                    <Header title={Titles.get(path)} />
                    {table}
                </Article>
            </Main>
        </Page>
    )
}
