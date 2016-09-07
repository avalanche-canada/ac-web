import React, {PropTypes, Component, createElement} from 'react'
import moment from 'moment'
import {compose, withHandlers} from 'recompose'
import {Link, withRouter} from 'react-router'
import {Page, Header, Main, Section, Headline} from 'components/page'
import Forecast, {Metadata} from 'components/forecast'
import {Muted, Error, Br, DateElement} from 'components/misc'
import {DayPicker} from 'components/controls'
import {forecast} from 'containers/connectors'
import {AsRow} from 'components/grid'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    link: PropTypes.object,
}

function Container({
    title = 'Loading...',
    forecast,
    isLoading,
    isError,
    link,
    params: {name, date},
    onChangeDate,
}) {
    date = moment(date, 'YYYY-MM-DD').toDate()

    return (
        <Page>
            <Header title={isLoading ? title : `ARCHIVED: ${title}`} />
            <Main>
                <Headline>
                    <AsRow>
                        <div>This is an archived bulletin for</div>
                        <DayPicker date={date} onChange={onChangeDate} container={this} >
                            <DateElement value={date} format='dddd, LL' />
                        </DayPicker>
                    </AsRow>
                </Headline>
                <Br />
                {forecast && <Metadata {...forecast} />}
                {isLoading && <Muted>Loading forecast...</Muted>}
                {isError && <Error>Error happened while loading forecast.</Error>}
                {(forecast && forecast.region) && <Forecast {...forecast} />}
            </Main>
        </Page>
    )
}

export default compose(
    withRouter,
    forecast,
    withHandlers({
        onChangeDate: props => date => {
            const {router, params: {name}} = props
            date = moment(date).format('YYYY-MM-DD')

            router.push(`/forecasts/${name}/archives/${date}`)
        }
    })
)(Container)
