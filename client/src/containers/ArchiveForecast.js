import React, {PropTypes, Component, createElement} from 'react'
import moment from 'moment'
import {compose, withHandlers} from 'recompose'
import {Link, withRouter} from 'react-router'
import {Page, Content, Header, Main, Section, Headline} from 'components/page'
import Forecast, {Metadata, Footer} from 'components/forecast'
import {Muted, Error, Br, DateElement} from 'components/misc'
import {DayPicker} from 'components/controls'
import {forecast} from 'containers/connectors'
import {AsRow} from 'components/grid'

class Container extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        forecast: PropTypes.object,
        isLoading: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired,
        link: PropTypes.object,
    }
    render() {
        const {
            title = 'Loading...',
            forecast,
            isLoading,
            isError,
            link,
            params,
            onChangeDate,
        } = this.props
        let {name, date} = params

        date = moment(date, 'YYYY-MM-DD').toDate()

        return (
            <Page>
                <Header title={isLoading ? title : `ARCHIVED: ${title}`} />
                <Content>
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
                        {forecast && <Footer author={forecast.forecaster} />}
                    </Main>
                </Content>
            </Page>
        )
    }
}

export default compose(
    withRouter,
    forecast,
    withHandlers({
        onChangeDate: props => date => {
            const {router, params: {name}} = props
            // TODO: Could utils/date functions
            date = moment(date).format('YYYY-MM-DD')

            router.push(`/forecasts/${name}/archives/${date}`)
        }
    })
)(Container)
