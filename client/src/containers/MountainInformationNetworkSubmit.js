import React, {Component} from 'react'
import {compose, withState, withHandlers, withProps, lifecycle} from 'recompose'
import {Fieldset, Legend, Submit, Control, ControlSet} from 'components/form'
import {Tab, TabSet} from 'components/tab'
import {Input} from 'components/controls'
import {Loading} from 'components/misc'
import {Page, Header, Main, Section} from 'components/page'
import * as Colors from 'components/icons/min/colors'
import {fetchMountainInformationNetwork} from 'api/schema'
import Form from 'react-jsonschema-form'

import schema from './MountainInformationNetworkForm.json'
import uiSchema from './MountainInformationNetworkFormUI.json'

function MountainInformationNetworkForm({isReady, ...form}) {
    return (
        <Page>
            <Header title='Mountain Information Network' />
            <Main>
                {isReady ? <Form {...form} /> : <Loading />}
            </Main>
        </Page>
    )
}

export default compose(
    withState('schema', 'setSchema', null),
    withState('uiSchema', 'setUISchema', null),
    withHandlers({
        onSchemaFetchSucceed: props => response => props.setSchema(response.data),
        onUISchemaFetchSucceed: props => response => props.setUISchema(response.data),
        onSubmit: props => data => console.warn(data.formData),
        onChange: props => data => console.warn(data.formData),
        onError: props => data => console.warn(data.formData),
    }),
    lifecycle({
        componentDidMount() {
            const {onSchemaFetchSucceed, onUISchemaFetchSucceed} = this.props

            onUISchemaFetchSucceed({
                data: uiSchema
            })
            onSchemaFetchSucceed({
                data: schema
            })

            // fetchMountainInformationNetwork().then(onSchemaFetchSucceed)
            // fetchMountainInformationNetwork().then(onUISchemaFetchSucceed)
        },
    }),
    withProps(({schema, uiSchema}) => ({
        isReady: schema && uiSchema
    })),
)(MountainInformationNetworkForm)
