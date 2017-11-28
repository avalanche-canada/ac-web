import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import { StructuredText } from 'prismic/components/base'
import Tutorial from 'containers/WeatherTutorial'

export default class Forecast extends PureComponent {
    static propTypes = {
        forecast: PropTypes.object.isRequired,
    }
    get isDay5To7TabVisible() {
        const { forecast } = this.props

        return forecast.day5To7 || forecast.day5To7More
    }
    get day5To7Panel() {
        const { forecast } = this.props

        return createElement(
            Day5To7,
            { date: forecast.date },
            <StructuredText value={forecast.day5To7} />
        )
    }
    get headers() {
        return [
            <Header key="synopsis">Synopsis</Header>,
            <Header key="day1">Day 1</Header>,
            <Header key="day2">Day 2</Header>,
            <Header key="day3To4">Day 3-4</Header>,
            this.isDay5To7TabVisible && <Header key="day5To7">Day 5-7</Header>,
            <Header key="tutorial">Tutorial</Header>,
        ].filter(Boolean)
    }
    get panels() {
        return [
            <Panel key="synopsis">
                {this.createPanel(Synopsis, 'synopsis')}
            </Panel>,
            <Panel key="day1">{this.createPanel(Day1, 'day1')}</Panel>,
            <Panel key="day2">{this.createPanel(Day2, 'day2')}</Panel>,
            <Panel key="day3To4">{this.createPanel(Day3To4, 'day3To4')}</Panel>,
            this.isDay5To7TabVisible && (
                <Panel key="day5To7">{this.day5To7Panel}</Panel>
            ),
            <Panel key="tutorial">
                <Tutorial uid="weather" />
            </Panel>,
        ].filter(Boolean)
    }
    createPanel(component, name) {
        const { forecast } = this.props
        const group = forecast[name]
        const slices = forecast[`${name}More`] || group

        if (!group && !slices) {
            return null
        }
        const props = {
            date: forecast.date,
        }

        if (Array.isArray(group)) {
            Object.assign(props, group[0])
        }

        const children = <SliceSet slices={slices} />

        return createElement(component, props, children)
    }
    render() {
        return (
            <Tabs>
                <HeaderSet>{this.headers}</HeaderSet>
                <PanelSet>{this.panels}</PanelSet>
            </Tabs>
        )
    }
}
