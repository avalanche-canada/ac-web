import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    compose,
    lifecycle,
    setPropTypes,
    renderComponent,
    renderNothing,
    branch,
} from 'recompose'
import { connect } from 'react-redux'
import Table from 'components/table/managed'
import mapStateToProps from 'selectors/min/table'
import { loadMountainInformationNetworkSubmissionsForDays } from 'actions/entities'
import { loadFeatures } from 'actions/mapbox'
import { FORECAST_REGIONS } from 'services/mapbox/datasets'
import { Status as StatusComponent } from 'components/misc'
import { Muted } from 'components/text'
import { DateElement } from 'components/time'
import { Metadata as BaseMetadata, Entry } from 'components/metadata'
import subDays from 'date-fns/sub_days'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import {
    DropdownFromOptions as Dropdown,
    DayPicker,
} from 'components/controls'
import noop from 'lodash/noop'

function Empty() {
    return <Muted>No submissions found.</Muted>
}

export const Status = compose(
    connect(mapStateToProps),
    branch(props => props.isLoaded && props.total === 0, renderComponent(Empty))
)(StatusComponent)

@connect(mapStateToProps)
export class Metadata extends PureComponent {
    static propTypes = {
        isLoaded: PropTypes.bool,
        total: PropTypes.number,
        days: PropTypes.number,
        onDaysChange: PropTypes.func.isRequired,
        onTypesChange: PropTypes.func.isRequired,
        typeOptions: PropTypes.instanceOf(Map).isRequired,
        types: PropTypes.instanceOf(Set),
    }
    static defaultProps = {
        isLoaded: false,
        onDaysChange: noop,
        onTypesChange: noop,
        types: new Set(),
    }
    state = {
        from: subDays(new Date(), 7),
    }
    constructor(props) {
        super(props)

        if (typeof props.days === 'number') {
            /* eslint-disable react/no-direct-mutation-state */
            this.state.from = subDays(new Date(), props.days)
            /* eslint-disable react/no-direct-mutation-state */
        }
    }
    set days(days) {
        this.setState({
            from: subDays(new Date(), days),
        })
    }
    componentWillReceiveProps({ days }) {
        if (this.props.days !== days) {
            this.days = days
        }
    }
    handleFromDateChange = from => {
        const days = differenceInCalendarDays(new Date(), from)

        this.props.onDaysChange(days)
    }
    render() {
        const {
            isLoaded,
            total,
            types,
            typeOptions,
            onTypesChange,
        } = this.props
        const { from } = this.state

        return (
            <BaseMetadata>
                <Entry term="From" sideBySide>
                    <DayPicker date={from} onChange={this.handleFromDateChange}>
                        <DateElement value={from} />
                    </DayPicker>
                </Entry>
                <Entry term="To" sideBySide>
                    <DateElement />
                </Entry>
                <Entry term="Reports" sideBySide>
                    <Dropdown
                        value={types}
                        onChange={onTypesChange}
                        options={typeOptions}
                        placeholder="Show all"
                    />
                </Entry>
                <Entry term="Number of submissions" sideBySide>
                    {isLoaded ? total : 'Loading...'}
                </Entry>
            </BaseMetadata>
        )
    }
}

export default compose(
    setPropTypes({
        days: PropTypes.number,
        types: PropTypes.instanceOf(Set).isRequired,
    }),
    connect(mapStateToProps, {
        load: loadMountainInformationNetworkSubmissionsForDays,
        loadFeatures,
    }),
    lifecycle({
        componentDidMount() {
            this.props.load(this.props.days)
            this.props.loadFeatures(FORECAST_REGIONS)
        },
        componentWillReceiveProps({ days }) {
            this.props.load(days)
        },
    }),
    branch(props => !props.isLoaded || props.total === 0, renderNothing)
)(Table)
