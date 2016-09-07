import React, {Component} from 'react'
import {compose, withHandlers, toClass} from 'recompose'
import {Fieldset, Legend, Submit, Control, ControlSet} from 'components/form'
import {Tab, TabSet} from 'components/tab'
import {Input} from 'components/controls'
import {Page, Header, Main, Section} from 'components/page'
import * as Colors from 'components/icons/min/colors'
import Form from 'react-jsonschema-form'

export default function MountainInformationNetworkForm() {
    return (
        <Page>
            <Header title='A nice Mountain Information Network Form goes here!!!!' />
        </Page>
    )
    return (
        <Page>
            <Header title='Mountain Information Network' />
            <Main>
                <Form onSubmit={::console.warn}>
                    <Fieldset>
                        <Legend>Step 1. Required Info</Legend>
                    </Fieldset>
                    <Fieldset>
                        <Legend>Step 2. Uploads</Legend>
                    </Fieldset>
                    <Fieldset>
                        <Legend>Step 3. Observations</Legend>
                        <TabSet arrow>
                            <Tab title='Quick' color={Colors.QUICK}>
                                Content for QUICK
                            </Tab>
                            <Tab title='Avalanche' color={Colors.AVALANCHE}>
                                Content for AVALANCHE
                            </Tab>
                            <Tab title='Snowpack' color={Colors.SNOWPACK}>
                                Content for SNOWPACK
                            </Tab>
                            <Tab title='Weather' color={Colors.WEATHER}>
                                Content for WEATHER
                            </Tab>
                            <Tab title='Incident' color={Colors.INCIDENT}>
                                Content for INCIDENT
                            </Tab>
                        </TabSet>
                    </Fieldset>
                    <Submit disabled={pristine || submitting}>Submit</Submit>
                </Form>
            </Main>
        </Page>
    )
}
