import React from 'react'
import { storiesOf, action } from '@storybook/react'
import styles from './Forecast.css'
import { Table, Day, Condition } from './danger'
import addDays from 'date-fns/add_days'
import { Problem, Topic, Advice, Comment } from './problem'
import { HIGH, LOW, MODERATE, CONSIDERABLE } from 'constants/forecast/rating'
import Panel from 'components/panel'
import Footer from './Footer'
import Headline from './Headline'
import Summary from './Summary'
import RatingExplanation from 'layouts/products/forecast/RatingExplanation'
import * as Modes from 'constants/forecast/mode'

function Forecast({ children }) {
    return (
        <section className={styles.Forecast}>
            {children}
        </section>
    )
}

const ICONS = {
    elevations: 'http://www.avalanche.ca/assets/images/Elevation/Elevation-1-1-1_EN.png',
    aspects: 'http://www.avalanche.ca/assets/images/Compass/compass-0-0-0-1-1-1-0-0_EN.png',
    likelihood: 'http://www.avalanche.ca/assets/images/Likelihood/Likelihood-5_EN.png',
    expectedSize: 'http://www.avalanche.ca/assets/images/size/Size-0-15_EN.png',
}


storiesOf('Forecast', module)
    .add('Weather table', () => (
        <Forecast>
            <table>
                <thead>
                    <tr>
                        <td />
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wednesday</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td>A mix of sun and cloud</td>
                        <td>Mostly sunny</td>
                        <td>Mainly cloudy.</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>Freezing level<br />AM: 400m PM: 1800m</td>
                        <td>Freezing level<br />AM: 600m PM: 1800m</td>
                        <td>Freezing level<br />1700m</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>Ridgetop wind: light NW</td>
                        <td>Ridgetop wind: light SW-W</td>
                        <td>Winds: light SW</td>
                    </tr>
                </tbody>
            </table>
        </Forecast>
    ))
    .add('Danger Table', () => {
        const date = new Date()

        return (
            <Table confidence="Fair - Really confident ;) and it is long confidence comment...">
                <Day date={date} alp={HIGH} tln={MODERATE} btl={MODERATE} />
                <Day
                    date={addDays(date, 1)}
                    alp={LOW}
                    tln={MODERATE}
                    btl={CONSIDERABLE}
                />
                <Day
                    date={addDays(date, 2)}
                    alp={LOW}
                    tln={MODERATE}
                    btl={HIGH}
                />
            </Table>
        )
    })
    .add('Problem', () => (
        <Problem title="Storm Slabs">
            <Topic title="What Elevation?" src={ICONS.elevations} />
            <Topic title="Which Slopes?" src={ICONS.aspects} />
            <Topic title="Chances of Avalanches?" src={ICONS.likelihood} />
            <Topic title="Expected Size?" src={ICONS.expectedSize} />
            <Comment>
                {'<span>A paragraph as comment.</span>'}
            </Comment>
            <Advice>
                {'<span>A paragraph as advice.</span>'}
            </Advice>
        </Problem>
    ))
    .add('Footer', () => <Footer author="Karl Guillotte" />)
    .add('Headline', () => (
        <Headline>
            {`We have finished producing daily forecasts for the year. Enjoy the <a href="https://avalancheca-assets.s3.amazonaws.com/spring_ovw.pdf" target="_blank">SPRING CONDITIONS</a>. Stay up to date with mountain conditions with the ACMG's <a href="http://www.mountainconditions.com/" target="_blank">Mountain Conditions Report</a>.`}
        </Headline>
    ))
    .add('Summary', () => (
        <Summary title="Snowpack Summary">
            {`Four common spring scenarios are described at <a href="http://avalanche.ca/spring">http://avalanche.ca/spring</a> which may be relevant throughout the summer. It's up to you to decide which of the scenarios applies to your situation. Each scenario has specific weather, snowpack, and avalanche characteristics. Each requires a different approach in terms of risk management.`}
        </Summary>
    ))
    .add('Condition', () => <Condition />)
    .add('Summer Condition', () => <Condition mode={Modes.SUMMER} />)
    .add('Spring Condition', () => <Condition mode={Modes.SPRING} />)
    .add('Panels', () => (
        <div>
            <Panel header="Danger Ratings Explained" expandable>
                <RatingExplanation />
            </Panel>
            <Panel header="Avalanche Forecasts in your Inbox" expandable>
                <RatingExplanation />
            </Panel>
            <Panel header="Forecast Disclaimer" expandable>
                <RatingExplanation />
            </Panel>
        </div>
    ))
