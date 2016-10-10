import React, {Component, Children} from 'react'
import {compose, withState, withHandlers, withProps, lifecycle} from 'recompose'
import Form from 'react-jsonschema-form'
import DescriptionField from 'react-jsonschema-form/lib/components/fields/DescriptionField'
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField'
import CSSModules from 'react-css-modules'
import {Fieldset, Legend, Submit, Control, ControlSet} from 'components/form'
import {Tab, TabSet} from 'components/tab'
import {Loading} from 'components/misc'
import {Page, Header, Main, Section, Content} from 'components/page'
import layout from './Form.css'
import schema from './schemas/Form.json'
import uiSchema from './schemas/FormUI.json'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from 'components/mountainInformationNetwork/types'
import * as COLORS from 'components/icons/min/colors'
import {GeoPosition} from 'components/controls'
// import {fetchMountainInformationNetwork} from 'api/schema'

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

const NAMES = [
    'quickReport',
    'weatherReport',
    'snowpackReport',
    'avalancheReport',
    'incidentReport',
]

const fields = {
    GeoPosition({schema, uiSchema, formData, onChange}) {
        const placeholders = {
            latitude: `${schema.properties.latitude.title}: ${uiSchema.latitude['ui:placeholder']}`,
            longitude: `${schema.properties.longitude.title}: ${uiSchema.longitude['ui:placeholder']}`,
        }

        return (
            <GeoPosition placeholders={placeholders} {...formData} onChange={onChange} />
        )
    },
    SchemaField(props) {
        if (NAMES.includes(props.name)) {
            const {activeTabIndex} = props.registry.formContext

            if (activeTabIndex === NAMES.indexOf(props.name)) {
                return <SchemaField {...props} />
            } else {
                return null
            }
        }

        return <SchemaField {...props} />
    },
    DescriptionField(props) {
        if (props.id === 'root_reports__description') {
            const {activeTabIndex, setActiveTabIndex} = props.formContext

            return (
                <div>
                    <DescriptionField {...props} />
                    <TabSet activeIndex={activeTabIndex} onActivate={setActiveTabIndex} arrow>
                        {TYPES.map(type => (
                            <Tab key={type} title={Titles.get(type)} color={Colors.get(type)} />
                        ))}
                    </TabSet>
                </div>
            )
        }

        return (
            <DescriptionField {...props} />
        )
    },
}

function SubmissionForm({isReady, ...form}) {
    return (
        <Page>
            <Header title='Mountain Information Network — Create report' />
            <Content>
                <Main>
                    {isReady ?
                        <Form styleName='Layout' {...form} fields={fields} /> :
                        <Loading />}
                </Main>
            </Content>
        </Page>
    )
}

export default compose(
    withState('schema', 'setSchema', null),
    withState('uiSchema', 'setUISchema', null),
    withState('activeTabIndex', 'setActiveTabIndex', 0),
    withHandlers({
        onSchemaFetchSucceed: props => response => props.setSchema(response.data),
        onUISchemaFetchSucceed: props => response => props.setUISchema(response.data),
        // onSubmit: props => data => console.warn(data.formData),
        // onChange: props => data => console.warn(data.formData),
        // onError: props => data => console.warn(data.formData),
    }),
    lifecycle({
        componentDidMount() {
            const {onSchemaFetchSucceed, onUISchemaFetchSucceed} = this.props

            onSchemaFetchSucceed({
                data: schema
            })
            onUISchemaFetchSucceed({
                data: uiSchema
            })

            // fetchMountainInformationNetwork().then(onSchemaFetchSucceed)
            // fetchMountainInformationNetwork().then(onUISchemaFetchSucceed)
        },
    }),
    withProps(({schema, uiSchema, activeTabIndex, setActiveTabIndex}) => {
        const isReady = schema && uiSchema

        return {
            isReady,
            formContext: {
                activeTabIndex,
                setActiveTabIndex,
            },
        }
    }),
    CSSModules(layout),
)(SubmissionForm)
