import React, {Component} from 'react'
import {compose, withHandlers, toClass} from 'recompose'
import {Field, reduxForm} from 'redux-form'
import {Form, Fieldset, Legend, Submit, Control, ControlSet} from 'components/form'
import {Tab, TabSet} from 'components/tab'
import {Input} from 'components/controls'
import {Page, Header, Main, Section} from 'components/page'
import * as Colors from 'components/icons/min/colors'

function renderText({input, meta, label}) {
    return (
        <Control>
            <label>
                {label}
                <Input {...input} />
            </label>
        </Control>
    )
}


function MountainInformationNetworkForm({
    handleSubmit,
    pristine,
    reset,
    submitting
}) {
    return (
        <Page>
            <Header title='Mountain Information Network' />
            <Main>
                <Form onSubmit={handleSubmit(::console.warn)}>
                    <Fieldset>
                        <Legend>Step 1. Required Info</Legend>
                        <Field name="name" component={renderText} props={{label: 'Name your report'}} />
                        <Field name="datetime" component={renderText} props={{label: 'Submission date and time'}} />
                        <Field name="location" component={renderText} props={{label: 'Enter location by map'}} />
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

export default reduxForm({
    form: 'mountain-information-network'
})(MountainInformationNetworkForm)
