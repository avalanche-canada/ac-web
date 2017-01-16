import React, {PropTypes, Component} from 'react'
import {Article} from 'components/page'
import {DateElement, Muted} from 'components/misc'
import {Metadata, Entry} from 'components/metadata'
import Forecast from 'components/weather'
import {Status as StatusComponent} from 'components/misc'
import {DayPicker} from 'components/controls'
import Status from 'utils/status'
import noop from 'lodash/noop'

const STYLE = {
    position: 'relative',
}

export default class Container extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        status: PropTypes.instanceOf(Status).isRequired,
        forecast: PropTypes.object,
        isAuthenticated: PropTypes.bool,
        onDayChange: PropTypes.func.isRequired,
        tabs: PropTypes.arrayOf(PropTypes.string),
    }
    static defaultProps = {
        date: new Date(),
        status: new Status(),
        forecast: null,
        isAuthenticated: false,
        onDayChange: noop,
    }
    render() {
        const {isAuthenticated, forecast, status, date, onDayChange, tabs} = this.props

        return (
            <Article style={STYLE}>
                <Metadata>
                    <Entry term='Date'>
                        <DayPicker date={date} onChange={onDayChange} container={this} >
                            <DateElement value={date} />
                        </DayPicker>
                    </Entry>
                    {forecast &&
                        <Entry term='Issued at'>
                            {forecast.issued || '04:00'} PST/PDT
                        </Entry>
                    }
                    {(forecast && forecast.handle) &&
                        <Entry term='Created by'>
                            {forecast.handle}
                        </Entry>
                    }
                </Metadata>
                <StatusComponent {...status.toJSON()} />
                {(!forecast && status.isLoaded) &&
                    <Muted>
                        No weather forecast available for <DateElement value={date} />.
                    </Muted>
                }
                {forecast &&
                    <Forecast isAuthenticated={isAuthenticated} forecast={forecast} tabs={tabs} />
                }
            </Article>
        )
    }
}
