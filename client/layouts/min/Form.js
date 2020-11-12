import React, { Component, createRef, Fragment } from 'react'
import { navigate, Link } from '@reach/router'
import t from 'vendor/tcomb-form'
import { Header, Main, Content } from 'components/page'
import { Page } from 'layouts/pages'
import * as links from 'components/links'
import OPTIONS from './options'
import Submission from './types'
import AuthContext from 'contexts/auth'
import Button, { Submit } from 'components/button'
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
import Shim from 'components/Shim'
import { FormattedMessage, useIntl } from 'react-intl'

export default class SubmissionForm extends Component {
    static contextType = AuthContext
    form = createRef()
    constructor(...props) {
        super(...props)

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

        return (
            <Page>
                <Header title={<Title username={nickname} />} />
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
                                    <FormError
                                        error={error}
                                        title={value.required.title}
                                    />
                                )}
                                <FormSubmit isSubmitting={isSubmitting} />
                            </form>
                        ) : (
                            <Shim all className={styles.Login}>
                                <Button onClick={login} large>
                                    <FormattedMessage
                                        description="Layout min/Form"
                                        defaultMessage="Login to post to the Mountain Information Network"
                                    />
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
function Title({ username }) {
    return (
        <Fragment>
            <FormattedMessage
                description="Layout min/Form"
                defaultMessage="Mountain Information Network — Create report"
            />
            {username && (
                <small>
                    <FormattedMessage
                        description="Layout min/Form"
                        defaultMessage="Hi <link></link>,"
                        values={{
                            link() {
                                return <Link to="/account">{username}</Link>
                            },
                        }}
                    />
                </small>
            )}
        </Fragment>
    )
}
function FormError({ error, title }) {
    const intl = useIntl()
    const subject = intl.formatMessage({
        description: 'Layout min/Form',
        defaultMessage: 'Problem submitting report: ${title}',
        values: { title },
    })

    return (
        <Error as="details">
            <summary>
                <FormattedMessage
                    description="Layout min/Form"
                    defaultMessage="An error happened while submitting your report."
                />
            </summary>
            <p>
                <FormattedMessage
                    description="Layout min/Form"
                    defaultMessage="An error happened while submitting and saving your report to our servers. Do not hesitate to contact us to get more details so you can have your report submitted. Thanks for your understanding and cooperation!"
                />
                <br />
                <Mailto email={SUPPORT} subject={subject} />
            </p>
            <p>
                {error.name}: {error.message}
            </p>
        </Error>
    )
}
function FormSubmit({ isSubmitting }) {
    return (
        <Submit large disabled={isSubmitting}>
            {isSubmitting ? (
                <FormattedMessage
                    description="Layout min/Form"
                    defaultMessage="Submitting your report..."
                />
            ) : (
                <FormattedMessage
                    description="Layout min/Form"
                    defaultMessage="Submit your report"
                />
            )}
        </Submit>
    )
}
