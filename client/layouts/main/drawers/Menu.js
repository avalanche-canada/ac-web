import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { memo } from 'utils/react'
import { Container, Body, Navbar, Close } from 'components/page/drawer'
import * as components from 'components/page/drawer/layers'
import { useLayer } from 'contexts/layers'
import * as Layers from 'constants/drawers'
import * as Icons from 'components/icons'
import { NAMES } from 'constants/min'
import { Dropdown, Option } from 'components/controls'
import Shim from 'components/Shim'

Menu.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
}

function Menu({ onCloseClick }) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Body>
                <Shim horizontal>
                    <components.LayerSet title="Analysis">
                        <Layer id={Layers.FORECASTS} />
                        <Layer id={Layers.HOT_ZONE_REPORTS} />
                    </components.LayerSet>
                    <components.LayerSet title="Observations">
                        <Layer id={Layers.MOUNTAIN_INFORMATION_NETWORK}>
                            <Dropdown name="days">
                                {DAYS.map(day => (
                                    <Option key={day} value={day}>
                                        {day} day
                                    </Option>
                                ))}
                            </Dropdown>
                            <Dropdown name="types">
                                {Array.from(NAMES, ([value, name]) => (
                                    <Option key={value} value={value}>
                                        {name}
                                    </Option>
                                ))}
                            </Dropdown>
                        </Layer>
                        <Layer id={Layers.WEATHER_STATION} />
                        <Layer id={Layers.FATAL_ACCIDENT} />
                        <Layer id={Layers.MOUNTAIN_CONDITIONS_REPORTS} />
                    </components.LayerSet>
                </Shim>
            </Body>
        </Container>
    )
}

export default memo.static(Menu)

// Util components
Layer.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element,
}

function Layer({ id, children }) {
    const { visible, filters, toggle, setFilterValue } = useLayer(id)

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

// Constants
const DAYS = [1, 3, 7, 14, 30]
const ICONS = new Map([
    [Layers.FORECASTS, <Icons.Forecast />],
    [Layers.HOT_ZONE_REPORTS, <Icons.HotZoneReport />],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, <Icons.MountainInformationNetwork />],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, <Icons.MountainConditionsReport />],
    [Layers.WEATHER_STATION, <Icons.WeatherStation />],
    [Layers.FATAL_ACCIDENT, <Icons.FatalAccident />],
])
const TITLES = new Map([
    [Layers.FORECASTS, 'Forecasts'],
    [Layers.HOT_ZONE_REPORTS, 'Advisories'],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, 'Mountain Information Network'],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, 'Mountain Conditions Reports'],
    [Layers.WEATHER_STATION, 'Weather stations'],
    [Layers.FATAL_ACCIDENT, 'Fatal recreational accidents'],
])
