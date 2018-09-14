import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import { Container, Body, Content, Navbar, Close } from 'components/page/drawer'
import * as components from 'components/page/drawer/layers'
import * as context from 'contexts/layers'
import * as Layers from 'constants/drawers'
import * as Icons from 'components/icons'
import { Dropdown, Option } from 'components/controls'

export default class Menu extends StaticComponent {
    render() {
        return (
            <Container>
                <Navbar>
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <Body>
                    <Content>
                        <components.LayerSet title="Analysis">
                            <Layer id={Layers.FORECASTS} />
                            <Layer id={Layers.HOT_ZONE_REPORTS} />
                            <Layer id={Layers.SPECIAL_INFORMATION} />
                        </components.LayerSet>
                        <components.LayerSet title="Observations">
                            <Layer id={Layers.MOUNTAIN_INFORMATION_NETWORK}>
                                <Dropdown name="days">
                                    <Option value={1}>1 day</Option>
                                    <Option value={3}>3 days</Option>
                                    <Option value={7}>7 days</Option>
                                    <Option value={14}>14 days</Option>
                                    <Option value={30}>30 days</Option>
                                </Dropdown>
                                <Dropdown name="types">
                                    <Option value="quick">Quick</Option>
                                    <Option value="avalanche">Avalanche</Option>
                                    <Option value="snowpack">Snowpack</Option>
                                    <Option value="weather">Weather</Option>
                                    <Option value="incident">Incident</Option>
                                </Dropdown>
                            </Layer>
                            <Layer id={Layers.WEATHER_STATION} />
                            <Layer id={Layers.FATAL_ACCIDENT} />
                            <Layer id={Layers.MOUNTAIN_CONDITIONS_REPORTS} />
                        </components.LayerSet>
                        <components.LayerSet title="Sponsor">
                            <Layer id={Layers.TOYOTA_TRUCK_REPORTS} />
                        </components.LayerSet>
                    </Content>
                </Body>
            </Container>
        )
    }
}

// Util layouts
class Layer extends StaticComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.element,
    }
    renderComponent = ({ visible, filters, toggle, setFilterValue }) => {
        const { id, children } = this.props

        return (
            <components.Layer
                title={TITLES.get(id)}
                icon={ICONS.get(id)}
                visible={visible}
                onClick={toggle}>
                {Children.map(children, input => {
                    const { name, ...props } = input.props

                    Object.assign(props, {
                        value: filters[name],
                        onChange(value) {
                            setFilterValue(name, value)
                        },
                    })

                    return cloneElement(input, props)
                })}
            </components.Layer>
        )
    }
    render() {
        return (
            <context.Layer id={this.props.id}>
                {this.renderComponent}
            </context.Layer>
        )
    }
}

// Constants
const ICONS = new Map([
    [Layers.FORECASTS, <Icons.Forecast />],
    [Layers.HOT_ZONE_REPORTS, <Icons.HotZoneReport />],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, <Icons.MountainInformationNetwork />],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, <Icons.MountainConditionsReport />],
    [Layers.WEATHER_STATION, <Icons.WeatherStation />],
    [Layers.SPECIAL_INFORMATION, <Icons.SpecialInformation />],
    [Layers.FATAL_ACCIDENT, <Icons.FatalAccident />],
    [Layers.TOYOTA_TRUCK_REPORTS, <Icons.ToyotaTruck />],
])
const TITLES = new Map([
    [Layers.FORECASTS, 'Forecasts'],
    [Layers.HOT_ZONE_REPORTS, 'Hot zone reports'],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, 'Mountain information network'],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, 'Mountain Conditions Reports'],
    [Layers.WEATHER_STATION, 'Weather stations'],
    [Layers.SPECIAL_INFORMATION, 'Special information'],
    [Layers.FATAL_ACCIDENT, 'Fatal recreational accidents'],
    [Layers.TOYOTA_TRUCK_REPORTS, 'Follow AvCan Toyota trucks'],
])
