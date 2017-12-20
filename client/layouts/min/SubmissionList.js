import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Page, Header, Main, Content } from 'components/page'
import { Responsive } from 'components/table'
import { Br } from 'components/markup'
import { Link } from 'react-router-dom'
import {
    Table,
    Row,
    Header as THead,
    HeaderCell,
    TBody,
    Cell,
} from 'components/table'
import { Column } from 'components/table/managed'
import { withRouter } from 'react-router-dom'
import * as utils from 'utils/search'
import Container from 'containers/MountainInformationNetworkSubmissionList'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import subDays from 'date-fns/sub_days'
import { DateElement } from 'components/time'
import { Status } from 'components/misc'
import { INCIDENT, NAMES } from 'constants/min'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { NONE } from 'constants/sortings'
import { DateTime, Relative } from 'components/time'
import styles from 'components/text/Text.css'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import { MountainInformationNetworkSubmission as Schema } from 'api/schemas'

@withRouter
export default class SubmissionList extends PureComponent {
    static propTypes = {
        days: PropTypes.number,
        types: PropTypes.instanceOf(Set),
        sorting: PropTypes.string,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }
    static defaultProps = {
        days: 7,
        types: new Set(),
        sorting: null,
    }
    state = {
        days: this.props.days,
        types: this.props.types,
        sorting: utils.parseSorting(this.props.sorting),
    }
    handleFromDateChange = from => {
        const days = differenceInCalendarDays(new Date(), from)

        this.setState({ days }, this.pushToHistory)
    }
    handleTypesChange = types => {
        this.setState({ types }, this.pushToHistory)
    }
    handleSortingChange = (name, order) => {
        this.setState({ sorting: [name, order] }, this.pushToHistory)
    }
    pushToHistory = () => {
        const { days, types, sorting } = this.state

        this.props.history.push({
            ...this.props.location,
            search: utils.stringify({
                days,
                types,
                sorting: utils.formatSorting(...sorting),
            }),
        })
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
            <Row>
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
    children = ({ props }) => [
        this.renderMetadata(props),
        <Br />,
        <Responsive>
            <Table>
                <THead>
                    <Row>{COLUMNS.map(this.renderHeader)}</Row>
                </THead>
                <TBody>{props.submissions.map(this.renderSubmission)}</TBody>
            </Table>
        </Responsive>,
        <Status {...props.status} messages={this.createMessages(props)} />,
    ]
    render() {
        return (
            <Page>
                <Header title="Mountain Information Network submissions" />
                <Content>
                    <Main>
                        <Container {...this.state}>{this.children}</Container>
                    </Main>
                </Content>
            </Page>
        )
    }
}

const COLUMNS = [
    Column.create({
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
    }),
    Column.create({
        name: 'title',
        title: 'Title',
        property(submission) {
            return submission.get('title')
        },
    }),
    Column.create({
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
    }),
    Column.create({
        name: 'reporter',
        title: 'Reporter',
        property(submission) {
            return submission.get('user')
        },
        sorting: NONE,
    }),
    Column.create({
        name: 'forecast-region',
        title: 'Forecast Region',
        property(submission) {
            if (submission.has('region')) {
                const { name, id } = submission.get('region')

                return <Link to={`/map/forecasts/${id}`}>{name}</Link>
            }

            return '-'
        },
        sorting: NONE,
    }),
    Column.create({
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
    }),
]

// Utils
function pluckObtype(observation) {
    return observation.get('obtype')
}
