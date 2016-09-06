import React, {PropTypes, Component, createElement} from 'react'
import moment from 'moment'
import {compose, withHandlers} from 'recompose'
import {Link, withRouter} from 'react-router'
import {Page, Header, Main, Section} from 'components/page'
import Forecast, {Metadata} from 'components/forecast'
import {Muted, Error, Br, DateElement} from 'components/misc'
import {DayPicker} from 'components/pickers'
import {forecast} from 'containers/connectors'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    link: PropTypes.object,
}

// class Warning extends Component {
//     render() {
//         const {name, date, onChangeDate} = this.props
//         const element = <DateElement value={date} format='dddd, LL' />
//         const picker = (
//             <DayPicker date={date} onChange={onChangeDate} container={this} >
//                 <strong>{element}</strong>
//             </DayPicker>
//         )
//         const headline = (
//             <div>
//                 This is an archived bulletin for {picker}.
//             </div>
//         )
//
//         return (
//             <Section title='Heads up!' headline={headline}>
//                 <Br />
//             </Section>
//         )
//     }
// }

function Warning({name, date, onChangeDate}) {
    const element = <DateElement value={date} format='dddd, LL' />
    const picker = (
        <DayPicker date={date} onChange={onChangeDate} container={this} >
            <strong>{element}</strong>
        </DayPicker>
    )
    const headline = (
        <div>
            This is an archived bulletin for {picker}
        </div>
    )

    return (
        <Section title='Heads up!' headline={headline}>
            <Br />
        </Section>
    )
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
            <Header title={link ? <Link {...link}>{title}</Link> : title} />
            <Main>
                <Warning date={date} name={name} onChangeDate={onChangeDate} />
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
