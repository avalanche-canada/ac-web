import React, { Children, cloneElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Body, Navbar, Close } from 'components/page/drawer'
import * as components from 'components/page/drawer/layers'
import { useLayer } from 'contexts/layers'
import * as Layers from 'constants/drawers'
import * as Icons from 'components/icons'
import { useNames } from 'constants/min'
import { Dropdown, Option } from 'components/controls'
import Shim from 'components/Shim'
import { FormattedMessage } from 'react-intl'

Menu.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
}

export default function Menu({ onCloseClick }) {
    const names = useNames()

    return (
        <Fragment>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Body>
                <Shim horizontal>
                    <components.LayerSet
                        title={
                            <FormattedMessage
                                description="Layout main map menu"
                                defaultMessage="Analysis"
                            />
                        }>
                        <Layer id={Layers.FORECASTS} />
                        <Layer id={Layers.HOT_ZONE_REPORTS} />
                    </components.LayerSet>
                    <components.LayerSet
                        title={
                            <FormattedMessage
                                description="Layout main map menu"
                                defaultMessage="Observations"
                            />
                        }>
                        <Layer id={Layers.MOUNTAIN_INFORMATION_NETWORK}>
                            <Dropdown name="days">
                                {DAYS.map(amount => (
                                    <Option key={amount} value={amount}>
                                        <FormattedMessage
                                            description="Layout main map menu"
                                            defaultMessage="{amount, plural, one {# day} other {# days}}"
                                            values={{ amount }}
                                        />
                                    </Option>
                                ))}
                            </Dropdown>
                            <Dropdown name="types">
                                {Array.from(names, ([value, name]) => (
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
        </Fragment>
    )
}

// Util components
Layer.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element,
}

function Layer({ id, children }) {
    const { visible, disabled, filters, toggle, setFilterValue } = useLayer(id)
    const title = Layers.useTitle(id)
    const Icon = ICONS.get(id)

    return (
        <components.Layer
            title={title}
            icon={<Icon />}
            visible={visible}
            disabled={disabled}
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
    [Layers.FORECASTS, Icons.Forecast],
    [Layers.HOT_ZONE_REPORTS, Icons.HotZoneReport],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, Icons.MountainInformationNetwork],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, Icons.MountainConditionsReport],
    [Layers.WEATHER_STATION, Icons.WeatherStation],
    [Layers.FATAL_ACCIDENT, Icons.FatalAccident],
])
