import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {getIsAuthenticated} from 'getters/auth'
import {compose, lifecycle} from 'recompose'
import {Link} from 'react-router'
import {Page, Content, Header, Main, Article, ArticleHeader, Aside} from 'components/page'
import Sidebar from './Sidebar'
import Footer from './Footer'

Weather.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

function Weather({children, isAuthenticated = false}) {
    const title = (
        <Link to='/weather'>
            Mountain Weather Forecast
        </Link>
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {children}
                    <Footer showFeedbackAnchor={isAuthenticated} />
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}


function mapStateToProps(state) {
    return {
        isAuthenticated: getIsAuthenticated(state)
    }
}

export default compose(
    connect(mapStateToProps, {loadForType}),
    lifecycle({
        componentDidMount() {
            this.props.loadForType('weather-forecast-tutorial')
        }
    }),
)(Weather)
