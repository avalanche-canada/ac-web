import React, {PropTypes, cloneElement} from 'react'
import {connect} from 'react-redux'
import {loadForType} from 'actions/prismic'
import {getIsAuthenticated} from 'reducers/auth'
import {compose, lifecycle} from 'recompose'
import {Link} from 'react-router'
import {Page, Content, Header, Main, Article, ArticleHeader, Aside} from 'components/page'
import Sidebar from './Sidebar'
import Footer from './Footer'

Weather.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

function Weather({children, isAuthenticated = false, route}) {
    const {type = 'new-weather-forecast'} = route
    const to = type === 'new-weather-forecast' ? 'new/weather' : '/weather'
    const title = (
        <Link to={to}>
            Mountain Weather Forecast
        </Link>
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {children && cloneElement(children, {type})}
                    <Footer showFeedbackAnchor={isAuthenticated} />
                </Main>
                {type === 'new-weather-forecast' && (
                    <Aside>
                        <Sidebar />
                    </Aside>
                )}
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
