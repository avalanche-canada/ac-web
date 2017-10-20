import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Page, Main, Content } from 'components/page'
import { Home, Tree, Tutorial, AtesExercise } from 'containers/Tutorial'
import CSSModules from 'react-css-modules'
import styles from './Tutorial.css'

function Layout({ match: { path }, location }) {
    const regex = new RegExp(`^${path}/?`)
    const splat = location.pathname.replace(regex, '')

    return (
        <Page>
            <Content>
                <Main>
                    <div styleName="Page">
                        <div styleName="Sidebar">
                            <Tree currentPage={splat} />
                        </div>
                        <div styleName="Content">
                            <Switch>
                                <Route
                                    path={`${path}/avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise`}
                                    component={AtesExercise}
                                />
                                <Route exact path={path} component={Home} />
                                <Route
                                    render={() => <Tutorial splat={splat} />}
                                />
                            </Switch>
                        </div>
                    </div>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(Layout, styles)
