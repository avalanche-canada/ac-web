import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ForecastContainer from 'containers/Forecast'
import { Status } from 'components/misc'
import { Compound, Metadata, Headline, TabSet } from 'components/forecast'
import Panel from './Panel'
import * as utils from 'utils/region'
import { Locate } from 'components/button'

export default class ForecastPanel extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader(forecast, region) {
        const { onLocateClick } = this.props
        function locate() {
            onLocateClick(utils.geometry(region))
        }

        return (
            <header>
                <h2>{forecast.get('bulletinTitle')}</h2>
                <Locate onClick={locate} />
            </header>
        )
    }
    children = ({ status, forecast, region }) => {
        return (
            <Panel expanded header="Avalanche forecast">
                <Compound forecast={forecast}>
                    {forecast && region
                        ? this.renderHeader(forecast, region)
                        : null}
                    <Status {...status} />
                    <Metadata />
                    <Headline />
                    <TabSet />
                </Compound>
            </Panel>
        )
    }
    render() {
        return (
            <ForecastContainer name={this.props.name}>
                {this.children}
            </ForecastContainer>
        )
    }
}
