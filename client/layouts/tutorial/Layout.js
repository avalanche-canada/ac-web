import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Page, Main, Content } from 'components/page'
import Tree from './Tree'
import AtesExercise from './AtesExercise'
import HomeContent from './Home'
import TutorialContent from './Content'
import { parse } from 'utils/search'
import parser from 'prismic/parsers'
import { Generic, Tutorial as Container } from 'prismic/containers'
import { Status } from 'components/misc'
import menu from './menu.json'
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

        const splat = findSplat(menu, this.slug)

        return <Redirect to={`/tutorial/${splat}`} />
    }
    get tree() {
        return <Tree currentPage={this.splat} />
    }
    get routes() {
        return (
            <Switch>
                <Route
                    path="/tutorial/avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise"
                    component={AtesExercise}
                />
                <Route exact path="/tutorial" component={this.renderHome} />
                <Route component={Tutorial} />
            </Switch>
        )
    }
    render() {
        return (
            <Page>
                <Content>
                    <Main>
                        <div className={styles.Page}>
                            <div className={styles.Sidebar}>{this.tree}</div>
                            <div className={styles.Content}>{this.routes}</div>
                        </div>
                    </Main>
                </Content>
            </Page>
        )
    }
}

function Home() {
    return <Generic uid="tutorial-home">{renderHome}</Generic>
}

function renderHome({ status, document }) {
    return (
        <Fragment>
            <Status {...status} />
            {document ? <HomeContent {...parser(document).data} /> : null}
        </Fragment>
    )
}

function Tutorial({ location }) {
    const slug = location.pathname.replace(TUTORIAL_REGEX, '')

    return <Container slug={slug}>{renderTutorial}</Container>
}

function renderTutorial({ status, document }) {
    return (
        <Fragment>
            <Status {...status} />
            {document ? <TutorialContent {...document.data} /> : null}
        </Fragment>
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
