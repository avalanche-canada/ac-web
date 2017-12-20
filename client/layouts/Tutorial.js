import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Page, Main, Content } from 'components/page'
import * as Components from 'components/tutorial'
import { parse } from 'utils/search'
import parser from 'prismic/parsers'
import StaticResource from 'containers/StaticResource'
import { Generic, Tutorial as Container } from 'prismic/containers'
import { Status } from 'components/misc'
import styles from './Tutorial.css'

const TUTORIAL_REGEX = new RegExp('^/tutorial/')

export default class Layout extends PureComponent {
    get splat() {
        return this.props.location.pathname.replace(TUTORIAL_REGEX, '')
    }
    get slug() {
        const { slug } = parse(this.props.location.search)

        return slug || null
    }
    renderHome = () => {
        if (this.slug === null) {
            return <Home />
        }

        const splat = findSplat(this.menu, this.slug)

        return <Redirect to={`/tutorial/${splat}`} />
    }
    get tree() {
        return <Components.Tree menu={this.menu} currentPage={this.splat} />
    }
    get routes() {
        return (
            <Switch>
                <Route
                    path="/tutorial/avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise"
                    component={Components.AtesExercise}
                />
                <Route exact path="/tutorial" component={this.renderHome} />
                <Route component={Tutorial} />
            </Switch>
        )
    }
    renderer = ({ data, ...status }) => {
        const isReady = status.isLoaded && data
        this.menu = data

        return (
            <div className={styles.Page}>
                <div className={styles.Sidebar}>
                    <Status {...status} />
                    {isReady && this.tree}
                </div>
                <div className={styles.Content}>
                    <Status {...status} />
                    {isReady && this.routes}
                </div>
            </div>
        )
    }
    render() {
        return (
            <Page>
                <Content>
                    <Main>
                        <StaticResource resource="tutorial-menu-tree">
                            {this.renderer}
                        </StaticResource>
                    </Main>
                </Content>
            </Page>
        )
    }
}

function Home() {
    return (
        <Generic uid="tutorial-home">
            {({ status, document }) => {
                if (status.isLoaded && document) {
                    return <Components.Home {...parser(document).data} />
                }

                return <Status {...status} />
            }}
        </Generic>
    )
}

function Tutorial({ location }) {
    const slug = location.pathname.replace(TUTORIAL_REGEX, '')

    return (
        <Container slug={slug}>
            {({ status, document }) => {
                if (status.isLoaded && document) {
                    return <Components.Tutorial {...parser(document).data} />
                }

                return <Status {...status} />
            }}
        </Container>
    )
}

const CLEANER_REGEX = /\//g

function findSplat(pages = [], slug) {
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const clean = page.slug.replace(CLEANER_REGEX, '')

        if (clean === slug) {
            return page.slug
        } else {
            const next = findSplat(page.children, slug)

            if (next) {
                return next
            }
        }
    }
}
