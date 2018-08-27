import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import subDays from 'date-fns/sub_days'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { Page, Header, Main, Content } from 'components/page'
import { Br } from 'components/markup'
import {
    Table,
    Row,
    Header as THead,
    HeaderCell,
    TBody,
    Cell,
    Responsive,
    Caption,
} from 'components/table'
import Container from 'containers/MountainInformationNetworkSubmissionList'
import * as containers from 'containers/forecast'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import { DateElement, DateTime, Relative } from 'components/time'
import { Status } from 'components/misc'
import { Sorted } from 'components/collection'
import * as links from 'components/links'
import { INCIDENT, NAMES } from 'constants/min'
import { NONE, DESC } from 'constants/sortings'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import styles from 'components/text/Text.css'

export default class SubmissionList extends PureComponent {
    static propTypes = {
        days: PropTypes.number,
        types: PropTypes.instanceOf(Set),
        regions: PropTypes.instanceOf(Set),
        sorting: PropTypes.array,
        onParamsChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        days: 7,
        types: new Set(),
        regions: new Set(),
        sorting: null,
    }
    state = {
        days: this.props.days,
        types: this.props.types,
        regions: this.props.regions,
        sorting: this.props.sorting,
    }
    handleFromDateChange = from => {
        const days = differenceInCalendarDays(new Date(), from)

        this.setState({ days }, this.handleParamsChange)
    }
    handleTypesChange = types => {
        this.setState({ types }, this.handleParamsChange)
    }
    handleRegionsChange = regions => {
        this.setState({ regions }, this.handleParamsChange)
    }
    handleSortingChange(name, order) {
        this.setState({ sorting: [name, order] }, this.handleParamsChange)
    }
    handleParamsChange = () => {
        this.props.onParamsChange(this.state)
    }
    get from() {
        return subDays(new Date(), this.state.days)
    }
    renderMetadata({ data = [] }) {
        const { from } = this

        return (
            <Metadata>
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
                        value={this.state.types}
                        onChange={this.handleTypesChange}
                        options={NAMES}
                        placeholder="Show all"
                    />
                </Entry>
                <Entry term="Regions" sideBySide>
                    <Dropdown
                        value={this.state.regions}
                        onChange={this.handleRegionsChange}
                        options={new Map(data.map(createRegionOption))}
                        placeholder="Show all"
                    />
                </Entry>
            </Metadata>
        )
    }
    renderSubmission = submission => {
        return (
            <Row key={submission.get('subid')}>
                {COLUMNS.map(({ name, style, property }) => (
                    <Cell key={name} style={style}>
                        {property(submission)}
                    </Cell>
                ))}
            </Row>
        )
    }
    getSorting(name, order) {
        if (Array.isArray(this.state.sorting)) {
            const { sorting } = this.state

            if (sorting[0] === name) {
                return sorting[1]
            }
        }

        return order
    }
    renderHeader = ({ name, title, style, sorting }) => {
        return (
            <HeaderCell
                key={name}
                style={style}
                sorting={this.getSorting(name, sorting)}
                onSortingChange={this.handleSortingChange.bind(this, name)}>
                {title}
            </HeaderCell>
        )
    }
    createMessages({ submissions, status }) {
        return {
            ...status.messages,
            isLoaded: submissions.isEmpty()
                ? 'No submissions found.'
                : `Total of ${submissions.size} submissions found.`,
        }
    }
    get sortProps() {
        const [name, order] = this.state.sorting || []

        if (order === NONE) {
            return {}
        }

        return {
            sorter: SORTERS.get(name),
            reverse: order === DESC,
        }
    }
    renderChildren({ props }) {
        return (
            <Fragment>
                <TBody>
                    <Sorted values={props.submissions} {...this.sortProps}>
                        {submissions => submissions.map(this.renderSubmission)}
                    </Sorted>
                </TBody>
                <Caption>
                    <Status
                        {...props.status}
                        messages={this.createMessages(props)}
                    />
                </Caption>
            </Fragment>
        )
    }
    render() {
        const { days, types, regions } = this.state

        return (
            <Page>
                <Header title="Mountain Information Network — List View" />
                <Content>
                    <Main>
                        <containers.Regions>
                            {props => this.renderMetadata(props)}
                        </containers.Regions>
                        <Br />
                        <Responsive>
                            <Table>
                                <THead>
                                    <Row>{COLUMNS.map(this.renderHeader)}</Row>
                                </THead>
                                <Container
                                    days={days}
                                    types={types}
                                    regions={regions}>
                                    {props => this.renderChildren(props)}
                                </Container>
                            </Table>
                        </Responsive>
                    </Main>
                </Content>
            </Page>
        )
    }
}

// Constants
const SORTERS = new Map([
    [
        'date',
        (a, b) => {
            const A = new Date(a.get('datetime'))
            const B = new Date(b.get('datetime'))

            if (A > B) return 1
            if (A < B) return -1
            return 0
        },
    ],
    ['reporter', (a, b) => a.get('user').localeCompare(b.get('user'))],
    [
        'region',
        (a, b) => {
            if (a.has('region') && b.has('region')) {
                return a.get('region').name.localeCompare(b.get('region').name)
            }

            if (!a.has('region') && !b.has('region')) {
                return 0
            }

            return a.has('region') ? -1 : 1
        },
    ],
])
const COLUMNS = [
    {
        name: 'pin',
        property(submission) {
            const title = submission.get('title')
            const withIncident = submission.get('obs').some(hasIncident)
            const icon = withIncident ? pinWithIncident : pin

            return (
                <links.MountainInformationNetwork
                    id={submission.get('subid')}
                    title={`Look at ${title} report on the map`}>
                    <img src={icon} height={30} width={20} />
                </links.MountainInformationNetwork>
            )
        },
        style: {
            minWidth: 40,
        },
    },
    {
        name: 'title',
        title: 'Title',
        property(submission) {
            return submission.get('title')
        },
    },
    {
        name: 'date',
        title: 'Date',
        property(submission) {
            const date = new Date(submission.get('datetime'))

            return (
                <span>
                    <DateTime value={date} />
                    <br />
                    <small className={styles.Muted}>
                        <Relative value={date} />
                    </small>
                </span>
            )
        },
        sorting: NONE,
    },
    {
        name: 'reporter',
        title: 'Reporter',
        property(submission) {
            return submission.get('user')
        },
        sorting: NONE,
    },
    {
        name: 'region',
        title: 'Forecast Region',
        property(submission) {
            if (submission.has('region')) {
                const { name, id } = submission.get('region')

                return <links.Forecast id={id}>{name}</links.Forecast>
            }
        },
        sorting: NONE,
    },
    {
        name: 'types',
        title: 'Available reports',
        property(submission) {
            const types = submission.get('obs').map(pluckObtype)

            return (
                <ul>
                    {types.map(type => (
                        <li key={type}>{NAMES.get(type)}</li>
                    ))}
                </ul>
            )
        },
    },
]

// Utils
function pluckObtype(observation) {
    return observation.get('obtype')
}
function createRegionOption({ id, name }) {
    return [id, name]
}
function hasIncident(observation) {
    return observation.get('obtype') === INCIDENT
}
