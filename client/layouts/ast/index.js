import React, { Component } from 'react'
import { Link, Match, Router } from '@reach/router'
import classnames from 'classnames'
import { Container, PillSet, Pill } from 'components/pill'
import { Page, Content, Banner, Main, Header, Article } from 'components/page'
import Bundle from 'components/Bundle'
import layouts from 'bundle-loader?lazy!./layouts'
import styles from 'styles/components.css'

export default class Ast extends Component {
    renderNavigation(props) {
        return (
            <PillSet activeIndex={Number(props.match?.type === 'providers')}>
                <Pill>
                    <Link to="courses">Courses</Link>
                </Pill>
                <Pill>
                    <Link to="providers">Providers</Link>
                </Pill>
            </PillSet>
        )
    }
    renderHeader(props) {
        return <Header title={`All ${props.match?.type}`} />
    }
    withModule = module => (
        <Page>
            <Banner url="//res.cloudinary.com/avalanche-ca/image/upload/c_scale,w_2500/c_scale,e_make_transparent:10,g_south_east,l_watermark:Dunford_RyenReverse,w_200/v1440539610/Youth/DSC_0339.jpg">
                <Container>
                    <Match path=":type">{this.renderNavigation}</Match>
                </Container>
                {module && (
                    <Router
                        primary={false}
                        className={classnames(styles.MatchParent, styles.Flex)}>
                        <module.Providers.Form path="providers" />
                        <module.Courses.Form path="courses" />
                    </Router>
                )}
            </Banner>
            <Main>
                <Content>
                    {module ? (
                        <Router className={styles.FullWidth}>
                            <module.Providers.Table path="providers" />
                            <module.Courses.Table path="courses" />
                        </Router>
                    ) : (
                        <Article>
                            <Match path=":type">{this.renderHeader}</Match>
                        </Article>
                    )}
                </Content>
            </Main>
        </Page>
    )
    render() {
        return <Bundle load={layouts}>{this.withModule}</Bundle>
    }
}
