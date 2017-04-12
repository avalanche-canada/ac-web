import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Page, Content, Header, Main, Aside} from '/components/page'
import {Sidebar} from '/components/page/weather'
import Container from '/containers/Weather'

function Weather({children}) {
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
                    <Container>
                        {children}
                    </Container>
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}

export default Weather
