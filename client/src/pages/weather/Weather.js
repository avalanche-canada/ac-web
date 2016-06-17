import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import {withState} from 'recompose'
import {Page, Header, Main, Article, ArticleHeader, Aside} from 'components/page'
import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Weather.css'

Weather.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

function Weather({ children, isAuthenticated = false }) {
    return (
        <Page styleName='Page'>
            <Header title='Mountain Weather Forecast' />
            <Main>
                {children}
                <Footer showFeedbackAnchor={isAuthenticated} />
            </Main>
            <Aside>
                <Sidebar />
            </Aside>
        </Page>
    )
}

export default CSSModules(Weather, styles)
