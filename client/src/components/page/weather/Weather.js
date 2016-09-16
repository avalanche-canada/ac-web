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

const TITLE = (
    <Link to='/weather'>
        Mountain Weather Forecast
    </Link>
)

function Weather({children, isAuthenticated = false, route}) {
    const {type = 'new-weather-forecast'} = route

    return (
        <Page>
            <Header title={TITLE} />
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
