import React, { Component } from 'react'
import { navigate } from '@reach/router'
import t from 'vendor/tcomb-form'
import { Page, Header, Main, Content } from 'components/page'
import * as links from 'components/links'
import OPTIONS from './options'
import Submission from './types'
import { Submit } from 'components/button'
import styles from './Form.css'
import { TYPES } from 'constants/min'
import ObservationSetError from './ObservationSetError'
import { scrollIntoView } from 'utils/dom'
import transform from './transform'
import { status } from 'services/fetch/utils'
import * as min from 'api/requests/min'
import { CACHE } from './index'

const { Form } = t.form

function isObservationError(error) {
    return error.path[0] === 'observations'
}

export default class SubmissionForm extends Component {
    state = {
        value: null,
        options: OPTIONS,
        type: Submission,
        isSubmitting: false,
    }
    constructor(props) {
        super(props)

        Object.assign(this.state.options.fields.observations.config, {
            onReportRemove: this.handleReportRemove,
            onTabActivate: this.handleTabActivate,
        })
    }
    setRef = form => (this.form = form)
    setActiveTab(activeTab) {
        if (typeof activeTab === 'string') {
            activeTab = TYPES.indexOf(activeTab)
        }

        if (typeof activeTab !== 'number') {
            return
        }

        this.patchOptions({
            fields: {
                observations: {
                    config: {
                        activeTab: {
                            $set: activeTab,
                        },
                    },
                },
            },
        })
    }
    setObservationErrors(errors) {
        if (errors.length === 0) {
            return
        }

        const type = errors[0].path[1]
        const patch = {
            fields: {
                observations: {
                    error: {
                        $set: (
                            <ObservationSetError
                                errors={errors}
                                onErrorClick={this.handleErrorClick}
                            />
                        ),
                    },
                },
            },
        }

        this.patchOptions(patch, this.setActiveTab.bind(this, type))
    }
    patchOptions(patch, callback) {
        this.setState(
            {
                options: t.update(this.state.options, patch),
            },
            callback
        )
    }
    handleReportRemove = () => {
        setTimeout(this.validate)
    }
    handleTabActivate = activeTab => {
        this.setActiveTab(activeTab)
    }
    handleErrorClick = (type, event) => {
        event.preventDefault()
        this.setActiveTab(type)
    }
    handleChange = value => {
        this.setState({ value })
    }
    validate = () => {
        const result = this.form.validate()

        this.showErrorState(result)

        return result
    }
    handleSubmit = event => {
        event.preventDefault()

        const result = this.validate()

        if (result.isValid()) {
            this.submit(result.value)
        }
    }
    showErrorState(result) {
        if (result.isValid()) {
            return
        }

        const {
            path: [root],
        } = result.firstError()

        this.setObservationErrors(result.errors.filter(isObservationError))

        scrollIntoView(`.fieldset-${root}`)
    }
    submit(value) {
        this.setState({ isSubmitting: true }, () => {
            fetch(min.post(transform(value)))
                .then(status)
                .then(
                    data => {
                        this.setState({ isSubmitting: false }, () => {
                            // FIXME: Huge side effect hack, but it working for now
                            CACHE.reset()
                            const { subid } = data

                            navigate(links.mountainInformationNetwork(subid))
                        })
                    },
                    err => {
                        this.setState({
                            isSubmitting: false,
                        })

                        throw err
                    }
                )
        })
    }
    render() {
        const { options, type, value, isSubmitting } = this.state
        const disabled = isSubmitting

        return (
            <Page>
                <Header title="Mountain Information Network — Create report" />
                <Content>
                    <Main>
                        <form
                            onSubmit={this.handleSubmit}
                            noValidate
                            className={styles.Container}>
                            <Form
                                ref={this.setRef}
                                value={value}
                                type={type}
                                options={options}
                                disabled={disabled}
                                onChange={this.handleChange}
                            />
                            <Submit large disabled={isSubmitting}>
                                {isSubmitting
                                    ? 'Submitting your report...'
                                    : 'Submit your report'}
                            </Submit>
                        </form>
                    </Main>
                </Content>
            </Page>
        )
    }
}
