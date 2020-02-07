import React, { Component, createRef, Fragment } from 'react'
import { navigate, Link } from '@reach/router'
import t from 'vendor/tcomb-form'
import { Header, Main, Content, Headline } from 'components/page'
import { Page } from 'layouts/pages'
import * as links from 'components/links'
import OPTIONS from './options'
import Submission from './types'
import AuthContext from 'contexts/auth'
import { Submit } from 'components/button'
import { Error } from 'components/text'
import { TYPES } from 'constants/min'
import { Mailto } from 'components/anchors'
import ObservationSetError from './ObservationSetError'
import transform from './transform'
import * as requests from 'requests/min'
import { SUPPORT } from 'constants/emails'
import Accessor from 'services/auth/accessor'
import styles from './Form.css'
import { clearCachedReports } from 'hooks/async/min'
import Button from 'components/button/Button'
import Shim from 'components/Shim'

export default class SubmissionForm extends Component {
    static contextType = AuthContext
    form = createRef()
    constructor(props) {
        super(props)

        const options = { ...OPTIONS }

        Object.assign(options.fields.observations.config, {
            onReportRemove: this.handleReportRemove,
            onTabActivate: this.handleTabActivate,
        })

        this.state = {
            value: null,
            options,
            type: Submission,
            isSubmitting: false,
            error: null,
        }
    }
    async login() {
        await this.context.login()
    }
    async componentDidMount() {
        if (!this.context.isAuthenticated) {
            this.login()
        }
    }
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
        const result = this.form.current.validate()

        this.showErrorState(result)

        return result
    }
    handleSubmit = async event => {
        event.preventDefault()

        const result = this.validate()

        if (!result.isValid()) {
            return
        }

        if (!this.context.isAuthenticated) {
            this.login().then(() => {
                this.submit(result.value)
            })
        }

        this.submit(result.value)
    }
    showErrorState(result) {
        if (result.isValid()) {
            return
        }

        const {
            path: [root],
        } = result.firstError()

        this.setObservationErrors(result.errors.filter(isObservationError))

        document.querySelector(`.fieldset-${root}`).scrollIntoView(true)
    }
    submit(value) {
        this.setState({ isSubmitting: true, error: null }, () => {
            requests.post(transform(value), Accessor.idToken).then(
                data => {
                    clearCachedReports()
                    this.setState({ isSubmitting: false }, () => {
                        const { subid } = data

                        navigate(links.mountainInformationNetwork(subid))
                    })
                },
                error => {
                    this.setState({
                        isSubmitting: false,
                        error,
                    })

                    throw error
                }
            )
        })
    }
    render() {
        const { options, type, value, isSubmitting, error } = this.state
        const { login, profile, isAuthenticated } = this.context
        const nickname = profile?.user_metadata?.nickname || profile?.nickname
        const title = (
            <Fragment>
                Mountain Information Network — Create report
                {nickname && (
                    <small>
                        Hi <Link to="../account">{nickname}</Link>,
                    </small>
                )}
            </Fragment>
        )

        return (
            <Page>
                <Header title={title} />
                <Content>
                    <Main>
                        {isAuthenticated ? (
                            <form
                                onSubmit={this.handleSubmit}
                                noValidate
                                className={styles.Container}>
                                <t.form.Form
                                    ref={this.form}
                                    value={value}
                                    type={type}
                                    options={options}
                                    disabled={isSubmitting}
                                    onChange={this.handleChange}
                                />
                                {error && (
                                    <Error as="details">
                                        <summary>
                                            An error happened while submitting
                                            your report.
                                        </summary>
                                        <p>
                                            An error happened while submitting
                                            and saving your report to our
                                            servers. Do not hesitate to contact
                                            us to get more details so you can
                                            have your report submitted. Thanks
                                            for your understanding and
                                            cooperation!{' '}
                                            <Mailto
                                                email={SUPPORT}
                                                subject={`Problem submitting report: ${value.required.title}`}
                                            />
                                        </p>
                                        <p>
                                            {error.name}: {error.message}
                                        </p>
                                    </Error>
                                )}
                                <Submit large disabled={isSubmitting}>
                                    {isSubmitting
                                        ? 'Submitting your report...'
                                        : 'Submit your report'}
                                </Submit>
                            </form>
                        ) : (
                            <Shim all className={styles.Login}>
                                <Button onClick={login} large>
                                    Login to post to the Mountain Information
                                    Network
                                </Button>
                            </Shim>
                        )}
                    </Main>
                </Content>
            </Page>
        )
    }
}

// Utils
function isObservationError(error) {
    return error.path[0] === 'observations'
}
