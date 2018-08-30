import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Page, Main, Content } from 'components/page'
import Tree from './Tree'
import AtesExercise from './AtesExercise'
import TutorialContent from './Content'
import { parse } from 'utils/search'
import { Document } from 'prismic/containers'
import { tutorial } from 'prismic/params'
import { Generic } from 'prismic/components'
import { Loading } from 'components/text'
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
            return (
                <Generic uid="tutorial-home">
                    {Generic.renderers.bodyAndTitle}
                </Generic>
            )
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
                <Route exact path="/tutorial" render={this.renderHome} />
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

function Tutorial({ location }) {
    const slug = location.pathname.replace(TUTORIAL_REGEX, '')

    return <Document {...tutorial(slug)}>{renderTutorial}</Document>
}

function renderTutorial({ loading, document }) {
    return (
        <Fragment>
            <Loading show={loading} />
            {document ? <TutorialContent {...document.data} /> : null}
        </Fragment>
    )
}

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

// Constants
const CLEANER_REGEX = /\//g
