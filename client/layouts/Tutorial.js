import React from 'react'
import { Page, Main, Content } from '~/components/page'
import { Home, Tree, Tutorial, AtesExercise } from '~/containers/Tutorial'
import CSSModules from 'react-css-modules'
import styles from './Tutorial.css'

const ATES_EXERCISE_SPLAT =
    'avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise'

function Layout({ params, location }) {
    const { splat } = params
    const { slug } = location.query
    let content = null

    if (splat === ATES_EXERCISE_SPLAT) {
        content = <AtesExercise />
    } else {
        if (splat) {
            content = <Tutorial splat={splat} />
        } else if (slug) {
            content = <Tutorial slug={slug} />
        } else {
            content = <Home />
        }
    }

    return (
        <Page>
            <Content>
                <Main>
                    <div styleName="Page">
                        <div styleName="Sidebar">
                            <Tree currentPage={splat} />
                        </div>
                        <div styleName="Content">
                            {content}
                        </div>
                    </div>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(Layout, styles)
