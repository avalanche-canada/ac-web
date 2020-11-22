import * as React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Body, Navbar, Close } from 'components/page/drawer'
import * as components from 'components/page/drawer/layers'
import { useLayer } from 'contexts/layers'
import * as Products from 'constants/products'
import * as Layers from 'constants/products/layers'
import * as Icons from 'components/icons'
import { useNames } from 'constants/min'
import { Dropdown, Option } from 'components/controls'
import Shim from 'components/Shim'

Menu.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
}

export default function Menu({ onCloseClick }) {
    const names = useNames()

    return (
        <React.Fragment>
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
                        <Layer id={Products.FORECAST} />
                    </components.LayerSet>
                    <components.LayerSet
                        title={
                            <FormattedMessage
                                description="Layout main map menu"
                                defaultMessage="Observations"
                            />
                        }>
                        <Layer id={Products.MOUNTAIN_INFORMATION_NETWORK}>
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
                        <Layer id={Products.WEATHER_STATION} />
                        <Layer id={Products.ACCIDENT} />
                        <Layer id={Products.MOUNTAIN_CONDITIONS_REPORT} />
                    </components.LayerSet>
                </Shim>
            </Body>
        </React.Fragment>
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
            {React.Children.map(children, input => {
                const { name, ...props } = input.props

                Object.assign(props, {
                    value: filters[name],
                    onChange(value) {
                        setFilterValue(name, value)
                    },
                })

                return React.cloneElement(input, props)
            })}
        </components.Layer>
    )
}

// Constants
const DAYS = [1, 3, 7, 14, 30]
const ICONS = new Map([
    [Products.FORECAST, Icons.Forecast],
    [Products.MOUNTAIN_INFORMATION_NETWORK, Icons.MountainInformationNetwork],
    [Products.MOUNTAIN_CONDITIONS_REPORT, Icons.MountainConditionsReport],
    [Products.WEATHER_STATION, Icons.WeatherStation],
    [Products.ACCIDENT, Icons.FatalAccident],
])
