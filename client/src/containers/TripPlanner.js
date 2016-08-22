import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Page, Header, Main, Section} from 'components/page'
import Forecast, {Metadata} from 'components/forecast'
import {Muted, Error} from 'components/misc'
import {Map} from 'components/map'

const STYLE = {
    position: 'relative',
    height: 500,
}

function Container({incidents = [], isLoading, isError}) {
    return (
        <Page>
            <Header title='Trip Planner' />
            <Main>
                {isLoading && <Muted>Loading forecast...</Muted>}
                {isError && <Error>Error happened while loading data.</Error>}
                <Section title='Welcome'>
                    Welcome to the Trip planner - select your trip type and ATES rating to find routes.
                </Section>
                <div style={STYLE}>
                    <Map>

                    </Map>
                </div>
            </Main>
        </Page>
    )
}

export default compose(

)(Container)
