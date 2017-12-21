import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
} from 'components/table'
import Container from 'containers/MountainInformationNetworkSubmissionList'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import { DateElement, DateTime, Relative } from 'components/time'
import { Status } from 'components/misc'
import { MountainInformationNetworkSubmission as Schema } from 'api/schemas'
import { Sorted } from 'components/collection'
import { INCIDENT, NAMES } from 'constants/min'
import { NONE, DESC } from 'constants/sortings'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import styles from 'components/text/Text.css'

export default class SubmissionList extends PureComponent {
    static propTypes = {
        days: PropTypes.number,
        types: PropTypes.instanceOf(Set),
        sorting: PropTypes.array,
        onParamsChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        days: 7,
        types: new Set(),
        sorting: null,
    }
    state = {
        days: this.props.days,
        types: this.props.types,
        sorting: this.props.sorting,
    }
    handleFromDateChange = from => {
        const days = differenceInCalendarDays(new Date(), from)

        this.setState({ days }, this.handleParamsChange)
    }
    handleTypesChange = types => {
        this.setState({ types }, this.handleParamsChange)
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
    renderMetadata({ submissions, status }) {
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
                <Entry term="Number of submissions" sideBySide>
                    {status.isLoaded ? submissions.size : 'Loading...'}
                </Entry>
            </Metadata>
        )
    }
    renderSubmission(submission) {
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
        if (status.isLoaded && submissions.isEmpty()) {
            return {
                isLoaded: 'No submissions found.',
            }
        }

        return status.messages
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
        return [
            this.renderMetadata(props),
            <Br />,
            <Responsive>
                <Table>
                    <THead>
                        <Row>{COLUMNS.map(this.renderHeader)}</Row>
                    </THead>
                    <TBody>
                        <Sorted values={props.submissions} {...this.sortProps}>
                            {submissions =>
                                submissions.map(this.renderSubmission)
                            }
                        </Sorted>
                    </TBody>
                </Table>
            </Responsive>,
            <Status {...props.status} messages={this.createMessages(props)} />,
        ]
    }
    render() {
        const { days, types } = this.state

        return (
            <Page>
                <Header title="Mountain Information Network submissions" />
                <Content>
                    <Main>
                        <Container days={days} types={types}>
                            {props => this.renderChildren(props)}
                        </Container>
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
            const id = submission.get('subid')
            const title = submission.get('title')
            const types = submission
                .get('obs')
                .map(pluckObtype)
                .toSet()
            const icon = types.has(INCIDENT) ? pinWithIncident : pin
            const path = `/map?panel=${Schema.key}/${id}`

            return (
                <Link to={path} title={`Look at ${title} report on the map`}>
                    <img src={icon} height={30} width={20} />
                </Link>
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

                return <Link to={`/map/forecasts/${id}`}>{name}</Link>
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
                    {types.map(type => <li key={type}>{NAMES.get(type)}</li>)}
                </ul>
            )
        },
    },
]

// Utils
function pluckObtype(observation) {
    return observation.get('obtype')
}
