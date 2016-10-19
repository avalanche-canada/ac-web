import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {compose, onlyUpdateForKeys} from 'recompose'
import {onlyUpdateForKey} from 'compose'
import Immutable from 'immutable'
import t from 'services/tcomb-form'
import CSSModules from 'react-css-modules'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {MountainInformationNetworkSubmission} from 'api/schemas'
import {Tab, TabSet} from 'components/tab'
import {Page, Header, Main, Section, Content} from 'components/page'
import Button from 'components/button'
import styles from './Form.css'
import OPTIONS from './options'
import moment from 'moment'
import QUICK_REPORT from './quick.json'
import {Error} from 'components/misc'
import debounce from 'lodash/debounce'
import {postMountainInformationNetworkSubmission} from 'actions/entities'
import {
    RequiredInformation,
    Uploads,
    QuickReport,
    WeatherReport,
    SnowpackReport,
    AvalancheReport,
    IncidentReport,
} from './types'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from 'components/mountainInformationNetwork/types'
import * as COLORS from 'components/icons/min/colors'

const TYPES = [QUICK, AVALANCHE, SNOWPACK, WEATHER, INCIDENT]
const Titles = new Map([
    [QUICK, 'Quick'],
    [AVALANCHE, 'Avalanche'],
    [SNOWPACK, 'Snowpack'],
    [WEATHER, 'Weather'],
    [INCIDENT, 'Incident'],
])
const Colors = new Map([
    [QUICK, COLORS.QUICK],
    [AVALANCHE, COLORS.AVALANCHE],
    [SNOWPACK, COLORS.SNOWPACK],
    [WEATHER, COLORS.WEATHER],
    [INCIDENT, COLORS.INCIDENT],
])
const ObservationTypes = new Map([
    [QUICK, QuickReport],
    [AVALANCHE, AvalancheReport],
    [SNOWPACK, SnowpackReport],
    [WEATHER, WeatherReport],
    [INCIDENT, IncidentReport],
])
const Keys = new Map([
    [QUICK, 'quickReport'],
    [AVALANCHE, 'avalancheReport'],
    [SNOWPACK, 'snowpackReport'],
    [WEATHER, 'weatherReport'],
    [INCIDENT, 'incidentReport'],
])

const ERROR_STYLE = {
    color: '#E6252F'
}

function isNull(value) {
    return value === null
}

function ridingConditionsMerger(prev, next) {
    if (prev.type === 'single') {
        return {
            ...prev,
            selected: next
        }
    }

    return {
        ...prev,
        options: next
    }
}

// Does not re-render on every change...we were losing the images
const UploadsForm = onlyUpdateForKey('value')(t.form.Form)
const Base = t.form.Form

@withRouter
@connect(null, {
    post: postMountainInformationNetworkSubmission
})
@CSSModules(styles)
export default class Form extends Component {
    state = {
        value: Immutable.Map({
            required: null,
            observations: Immutable.Map({
                [QUICK]: null,
                [AVALANCHE]: null,
                [SNOWPACK]: null,
                [WEATHER]: null,
                [INCIDENT]: null,
            }),
        }),
        options: OPTIONS,
        noObservations: null,
        isSubmitting: false,
        activeIndex: 0,
    }
    constructor(props) {
        super(props)

        this.observationChangeHandlers = TYPES.reduce((handlers, type) =>
            handlers.set(type, this.handleObservationChange(type))
        , new Map())
        this.observationClearHandlers = TYPES.reduce((handlers, type) =>
            handlers.set(type, this.handleClearObservation(type))
        , new Map())
    }
    handleSubmit = event => {
        event.preventDefault()

        this.setState({isSubmitting: true}, this.validate)
    }
    validate = () => {
        const {value} = this.state
        const {refs} = this
        let values = Immutable.Map({
            observations: Immutable.Map()
        })

        Object.keys(refs).forEach(key => {
            const path = key.split('.')

            if (path.length === 1 || value.getIn(path)) {
                const ref = refs[key]
                if (typeof ref.getValue === 'function') {
                    values = values.setIn(path, ref.getValue())
                }
            }
        })

        const observations = values.get('observations')
        const noObservations = observations.some(isNull) || observations.isEmpty()

        if (values.some(isNull) || noObservations) {
            console.warn('not valid', values.toJSON())
            this.setState({
                noObservations,
                isSubmitting: false,
            }, () => {
                window.scrollTo(0, 0)
            })
        } else {
            this.submit(values)
        }
    }
    submit(values) {
        const required = values.get('required')
        const {longitude, latitude} = required.latlng
        let observations = values.get('observations')

        if (observations.has(QUICK)) {
            const quick = observations.get(QUICK)
            const ridingConditions = Immutable.Map(QUICK_REPORT.ridingConditions)
            .mergeWith(ridingConditionsMerger, Immutable.Map(quick.ridingConditions)).toJSON()

            observations = observations.set(QUICK, {
                ...quick,
                ridingConditions,
            })
        }

        if (observations.has(INCIDENT)) {
            const incident = observations.get(INCIDENT)
            const {
                numberFullyBuried = 0,
                numberPartlyBuriedImpairedBreathing = 0,
                numberPartlyBuriedAbleBreathing = 0,
                numberCaughtOnly = 0,
                numberPeopleInjured = 0,
            } = incident

            observations = observations.set(INCIDENT, {
                ...incident,
                numberInvolved: numberFullyBuried + numberPartlyBuriedImpairedBreathing + numberPartlyBuriedAbleBreathing + numberCaughtOnly + numberPeopleInjured,
            })
        }

        if (observations.has(AVALANCHE)) {
            const {
                avalancheOccurrence: {
                    time,
                    epoch,
                },
                ...avalanche,
            } = observations.get(AVALANCHE)

            observations = observations.set(AVALANCHE, {
                ...avalanche,
                avalancheOccurrenceEpoch: epoch,
                avalancheOccurrenceTime: time,
            })
        }

        // TODO: List all files...have ot look at the issue in tcomb-form
        const {files} = document.querySelector('input[name="files"]')

        // TODO: That transformation to FormData should be done in Axios!!!
        const form = new FormData()
        const data = {
            ...required,
            datetime: required.datetime.toISOString(),
            latlng: JSON.stringify([String(latitude), String(longitude)]),
            obs: JSON.stringify(observations.mapKeys(key => Keys.get(key)).toJSON())
        }

        Object.keys(data).map(key =>
            form.set(key, data[key])
        )

        let index = 0
        for (let file of files) {
            form.append(`files${index++}`, file)
        }

        this.props.post(form).then(data => {
            const key = MountainInformationNetworkSubmission.getKey()

            this.props.router.push({
                pathname: '/map',
                query: {
                    panel: `${key}/${data.result}`
                }
            })
        })
    }
    setValue = debounce((path, value) => {
        this.setState({
            value: this.state.value.setIn(path, value)
        })
    }, 250)
    clearValue(path) {
        this.setValue(path, null)
    }
    handleRequiredChange = value => {
        this.setValue(['required'], value)
    }
    handleObservationChange = type => value => {
        this.setValue(['observations', type], value)
    }
    handleClearObservation = type => event => {
        this.clearValue(['observations', type])
    }
    handleTabActivate = activeIndex => {
        this.setState({activeIndex})
    }
    shouldComponentUpdate(props, {isSubmitting, value, noObservations, activeIndex}) {
        const {state} = this

        if (isSubmitting !== state.isSubmitting ||
            noObservations !== state.noObservations ||
            activeIndex !== state.activeIndex ||
            value !== state.value) {
            return true
        }

        return false
    }
    render() {
        const {value, options, noObservations, isSubmitting, activeIndex} = this.state
        const observations = value.get('observations')
        const disabled = isSubmitting

        return (
            <Page>
                <Header title='Mountain Information Network — Create report' />
                <Content>
                    <Main>
                        <form onSubmit={this.handleSubmit} styleName='Form' noValidate>
                            <div styleName='Sidebar'>
                                <div styleName='RequiredInformation'>
                                    <Base ref='required' disabled={disabled} type={RequiredInformation} value={value.get('required')} onChange={this.handleRequiredChange} options={options.required} />
                                </div>
                                <div styleName='Uploads'>
                                    <UploadsForm type={Uploads} disabled={disabled} options={options.uploads} />
                                </div>
                            </div>
                            <div styleName='Observations'>
                                <fieldset disabled={disabled}>
                                    <legend>Step 3. Observations</legend>
                                    <div className='ui message info' style={noObservations === true ? ERROR_STYLE : null}>
                                        Add information on one, some, or all tabs, then click SUBMIT at the bottom.
                                    </div>
                                    <TabSet activeIndex={activeIndex} onActivate={this.handleTabActivate} arrow>
                                        {TYPES.map((type, index) => {
                                            const form = {
                                                ref: `observations.${type}`,
                                                disabled,
                                                type: ObservationTypes.get(type),
                                                value: observations.get(type),
                                                onChange: this.observationChangeHandlers.get(type),
                                                options: options[type],
                                            }
                                            const tab = {
                                                 key: type,
                                                 title: Titles.get(type),
                                                 color: observations.get(type) ? Colors.get(type) : null,
                                            }

                                            return (
                                                <Tab {...tab}>
                                                    <Base {...form} />
                                                    <Button disabled={disabled || !form.value} onClick={this.observationClearHandlers.get(type)}>
                                                        Reset {Titles.get(type)} report
                                                    </Button>
                                                </Tab>
                                            )
                                        })}
                                    </TabSet>
                                </fieldset>
                                <Button disabled={disabled} type='submit'>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </form>
                    </Main>
                </Content>
            </Page>
        )
    }
}
