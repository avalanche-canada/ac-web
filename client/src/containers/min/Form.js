import React, {Component} from 'react'
import Immutable from 'immutable'
import t from 'services/tcomb-form'
import CSSModules from 'react-css-modules'
import {Tab, TabSet} from 'components/tab'
import {Page, Header, Main, Section, Content} from 'components/page'
import Button from 'components/button'
import styles from './Form.css'
import OPTIONS from './options'
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

const TYPES = [QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT]
const Titles = new Map([
    [QUICK, 'Quick'],
    [WEATHER, 'Weather'],
    [SNOWPACK, 'Snowpack'],
    [AVALANCHE, 'Avalanche'],
    [INCIDENT, 'Incident'],
])
const Colors = new Map([
    [QUICK, COLORS.QUICK],
    [WEATHER, COLORS.WEATHER],
    [SNOWPACK, COLORS.SNOWPACK],
    [AVALANCHE, COLORS.AVALANCHE],
    [INCIDENT, COLORS.INCIDENT],
])
const ObservationTypes = new Map([
    [QUICK, QuickReport],
    [WEATHER, WeatherReport],
    [SNOWPACK, SnowpackReport],
    [AVALANCHE, AvalancheReport],
    [INCIDENT, IncidentReport],
])

@CSSModules(styles)
export default class Form extends Component {
    state = {
        value: new Immutable.Map({
            required: null,
            uploads: null,
            observations: new Immutable.Map({
                [QUICK]: null,
                [WEATHER]: null,
                [SNOWPACK]: null,
                [AVALANCHE]: null,
                [INCIDENT]: null,
            }),
        }),
        options: OPTIONS,
        activeIndex: 0,
    }
    handleSubmit = event => {
        event.preventDefault()

        const values = []
        const {value} = this.state
        const {refs} = this

        Object.keys(refs).forEach(key => {
            const path = key.split('.')

            if (path.length === 1 || value.getIn(path)) {
                values.push(refs[key].getValue())
            }
        })

        if (values.some(value => value === null)) {
            console.warn('not valid', values)
        } else {
            console.warn('SUBMIT: it is valid', values)
            const data = new FormData()
            // TODO: Transforn the object and feed data and then post the data
        }
    }
    setValue(path, value, callback) {
        this.setState({
            value: this.state.value.setIn(path, value)
        }, callback)
    }
    clearValue(path, callback) {
        this.setState({
            value: this.state.value.setIn(path, null)
        }, callback)
    }
    handleRequiredChange = value => {
        this.setValue(['required'], value)
    }
    handleChangeUploads = value => {
        this.setValue(['uploads'], value)
    }
    handleObservationChange = type => value => {
        this.setState({
            activeIndex: TYPES.indexOf(type)
        }, () => {
            this.setValue(['observations', type], value)
        })
    }
    handleClearObservation = type => event => {
        this.clearValue(['observations', type])
    }
    render() {
        const {Form} = t.form
        const {value, options, activeIndex} = this.state
        const observations = value.get('observations')

        return (
            <Page>
                <Header title='Mountain Information Network — Create report' />
                <Content>
                    <Main>
                        <form onSubmit={this.handleSubmit} styleName='Form' noValidate>
                            <div styleName='Layout'>
                                <div styleName='Sidebar'>
                                    <div styleName='RequiredInformation'>
                                        <Form ref='required' type={RequiredInformation} value={value.get('required')} onChange={this.handleRequiredChange} options={options.required} />
                                    </div>
                                    <div styleName='Uploads'>
                                        <Form ref='uploads' type={Uploads} value={value.get('uploads')} onChange={this.handleChangeUploads} options={options.uploads} />
                                    </div>
                                </div>
                                <div styleName='Observations'>
                                    <fieldset>
                                        <legend>Step 3. Observations</legend>
                                        <div className='ui message info'>
                                            Add information on one, some, or all tabs, then click SUBMIT at the bottom.
                                        </div>
                                        <TabSet activeIndex={activeIndex} arrow>
                                            {TYPES.map(type => {
                                                const value = observations.get(type)

                                                return (
                                                    <Tab key={type} title={Titles.get(type)} color={observations.get(type) && Colors.get(type)}>
                                                        <Form value={value} ref={`observations.${type}`} type={ObservationTypes.get(type)} onChange={this.handleObservationChange(type)} options={options[type]} />
                                                        <Button disabled={!value} onClick={this.handleClearObservation(type)}>
                                                            Clear entered values
                                                        </Button>
                                                    </Tab>
                                                )
                                            })}
                                        </TabSet>
                                    </fieldset>
                                </div>
                            </div>
                            <Button type='submit'>
                                Submit
                            </Button>
                        </form>
                    </Main>
                </Content>
            </Page>
        )
    }
}
