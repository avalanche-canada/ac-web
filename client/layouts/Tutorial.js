import React from 'react'
import { Page, Main, Content } from '~/components/page'
import { Home, Tree, Tutorial, AtesExercise } from '~/containers/Tutorial'
import CSSModules from 'react-css-modules'
import styles from './Tutorial.css'

// TODO: Rework Tutorial layout with Route

const ATES_EXERCISE_SPLAT =
    'avalanche-terrain/avalanche-terrain-exposure-scale/ates-exercise'

function Layout({ params, location }) {
    const { splat } = params
    const { slug } = location.query
    let children = null

    if (splat === ATES_EXERCISE_SPLAT) {
        children = <AtesExercise />
    } else {
        if (splat) {
            children = <Tutorial splat={splat} />
        } else if (slug) {
            children = <Tutorial slug={slug} />
        } else {
            children = <Home />
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
                            {children}
                        </div>
                    </div>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(Layout, styles)
