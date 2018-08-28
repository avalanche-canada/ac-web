import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import subDays from 'date-fns/sub_days'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import { Page, Header, Main, Content } from 'components/page'
import { Muted } from 'components/text'
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
import * as containers from 'containers/min'
import { Regions } from 'containers/forecast'
import { FeatureCollection } from 'containers/mapbox'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import { DateElement, DateTime, Relative } from 'components/time'
import { Sorted, Filtered } from 'components/collection'
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
    renderSubmission(submission) {
        return (
            <Row key={submission.subid}>
                {COLUMNS.map(({ name, style, property }) => (
                    <Cell key={name} style={style}>
                        {property(submission)}
                    </Cell>
                ))}
            </Row>
        )
    }
    renderSubmissions = submissions => submissions.map(this.renderSubmission)
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
    get predicates() {
        const { types, regions } = this.state
        const predicates = []

        if (types.size > 0) {
            predicates.push(report => {
                const reportTypes = report.obs.map(pluckObtype)

                return reportTypes.some(type => types.has(type))
            })
        }

        if (regions.size > 0) {
            predicates.push(
                report =>
                    'region' in report ? regions.has(report.region.id) : false
            )
        }

        return predicates
    }
    renderTableContent({ loading, data }) {
        return (
            <Filtered values={data || []} predicates={this.predicates}>
                <Sorted {...this.sortProps}>
                    {submissions => (
                        <Fragment>
                            <TBody>{this.renderSubmissions(submissions)}</TBody>
                            <Caption>
                                {loading ? (
                                    <Muted>
                                        Loading Mountain Information Network
                                        reports...
                                    </Muted>
                                ) : submissions.length === 0 ? (
                                    'No submissions found.'
                                ) : (
                                    `Total of ${
                                        submissions.length
                                    } submissions found.`
                                )}
                            </Caption>
                        </Fragment>
                    )}
                </Sorted>
            </Filtered>
        )
    }
    render() {
        return (
            <Page>
                <Header title="Mountain Information Network — List View" />
                <Content>
                    <Main>
                        <Regions>{props => this.renderMetadata(props)}</Regions>
                        <Br />
                        <Responsive>
                            <Table>
                                <THead>
                                    <Row>{COLUMNS.map(this.renderHeader)}</Row>
                                </THead>
                                <Reports days={this.state.days}>
                                    {props => this.renderTableContent(props)}
                                </Reports>
                            </Table>
                        </Responsive>
                    </Main>
                </Content>
            </Page>
        )
    }
}

class Reports extends PureComponent {
    static propTypes = {
        days: PropTypes.number.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        const { days, children } = this.props

        return (
            <FeatureCollection id="regions">
                {features => (
                    <containers.Reports days={days}>
                        {reports =>
                            features.data && reports.data
                                ? children({
                                      loading: false,
                                      data: runSubmissionsSpatialAnalysis(
                                          reports.data,
                                          features.data
                                      ),
                                  })
                                : children({ loading: true })
                        }
                    </containers.Reports>
                )}
            </FeatureCollection>
        )
    }
}

// Constants
const SORTERS = new Map([
    ['date', (a, b) => new Date(a.datetime) - new Date(b.datetime)],
    ['reporter', (a, b) => a.user.localeCompare(b.user)],
    [
        'region',
        (a, b) => {
            if (a.region && b.region) {
                return a.region.name.localeCompare(b.region.name)
            }

            if (!a.region && !b.region) {
                return 0
            }

            return a.region ? -1 : 1
        },
    ],
])
const COLUMNS = [
    {
        name: 'pin',
        property({ subid, title, obs }) {
            const withIncident = obs.some(hasIncident)
            const icon = withIncident ? pinWithIncident : pin

            return (
                <links.MountainInformationNetwork
                    id={subid}
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
        property({ title }) {
            return title
        },
    },
    {
        name: 'date',
        title: 'Date',
        property({ datetime }) {
            return (
                <span>
                    <DateTime value={datetime} />
                    <br />
                    <small className={styles.Muted}>
                        <Relative value={datetime} />
                    </small>
                </span>
            )
        },
        sorting: NONE,
    },
    {
        name: 'reporter',
        title: 'Reporter',
        property({ user }) {
            return user
        },
        sorting: NONE,
    },
    {
        name: 'region',
        title: 'Forecast Region',
        property({ region }) {
            return region ? (
                <links.Forecast id={region.id}>{region.name}</links.Forecast>
            ) : null
        },
        sorting: NONE,
    },
    {
        name: 'types',
        title: 'Available reports',
        property({ obs }) {
            return (
                <ul>
                    {obs.map(pluckObtype).map(type => (
                        <li key={type}>{NAMES.get(type)}</li>
                    ))}
                </ul>
            )
        },
    },
]

// Utils
function pluckObtype({ obtype }) {
    return obtype
}
function createRegionOption({ id, name }) {
    return [id, name]
}
function hasIncident({ obtype }) {
    return obtype === INCIDENT
}
function runSubmissionsSpatialAnalysis(reports, { features }) {
    return reports.map(report => {
        const point = turf.point(report.lnglat)

        for (const region of features) {
            if (inside(point, region)) {
                return {
                    ...report,
                    region: region.properties,
                }
            }
        }

        return report
    })
}
