import React, { Component } from 'react'
import { navigate } from '@reach/router'
import t from 'vendor/tcomb-form'
import { Page, Header, Main, Content } from 'components/page'
import * as links from 'components/links'
import OPTIONS from './options'
import Submission from './types'
import { Consumer as Auth } from 'contexts/auth'
import { Submit } from 'components/button'
import { Warning } from 'components/text'
import { TYPES } from 'constants/min'
import ObservationSetError from './ObservationSetError'
import { scrollIntoView } from 'utils/dom'
import transform from './transform'
import { status } from 'services/fetch/utils'
import * as min from 'api/requests/min'
import { CACHE } from './index'
import styles from './Form.css'

export default class SubmissionForm extends Component {
    state = {
        value: null,
        options: OPTIONS,
        type: Submission,
        isSubmitting: false,
    }
    async componentDidMount() {
        Object.assign(this.state.options.fields.observations.config, {
            onReportRemove: this.handleReportRemove,
            onTabActivate: this.handleTabActivate,
        })

        this.store = new FormStore()
        await this.store.open()
        const form = await this.store.get()

        this.setState({
            value: form || null,
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
        this.store.set(value)
    }
    validate = () => {
        const result = this.form.validate()

        this.showErrorState(result)

        return result
    }
    handleSubmit = async event => {
        event.preventDefault()

        const result = this.validate()

        if (result.isValid()) {
            if (!this.isAuthenticated) {
                await this.login()
            }

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
                            const { subid } = data

                            // FIXME: Huge side effect hack, but it working for now
                            CACHE.reset()
                            this.store.reset()

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
    renderForm = ({ isAuthenticated, login }) => {
        const { options, type, value, isSubmitting } = this.state
        const disabled = isSubmitting

        this.login = login
        this.isAuthenticated = isAuthenticated

        return (
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
                {isAuthenticated || (
                    <Warning>
                        Posting your observations to the Mountain Information
                        Network (MIN) requires you to be signed in, you wil be
                        asked to enter your credetials once you click the submit
                        button below. Thanks for posting your observations to
                        the MIN!
                    </Warning>
                )}
                <Submit large disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Submitting your report...'
                        : 'Submit your report'}
                </Submit>
            </form>
        )
    }
    render() {
        return (
            <Page>
                <Header title="Mountain Information Network — Create report" />
                <Content>
                    <Main>
                        <Auth>{this.renderForm}</Auth>
                    </Main>
                </Content>
            </Page>
        )
    }
}

// Utils
const { Form } = t.form

function isObservationError(error) {
    return error.path[0] === 'observations'
}

class FormStore {
    open() {
        if (this.db) {
            return Promise.resolve()
        }

        return new Promise((resolve, reject) => {
            const indexedDB =
                window.indexedDB ||
                window.mozIndexedDB ||
                window.webkitIndexedDB ||
                window.msIndexedDB

            if (!indexedDB) {
                reject(new Error('indexedDB not supported'))
                return
            }

            Object.assign(indexedDB.open('avcan', 1), {
                onupgradeneeded(event) {
                    this.db = event.target.result

                    if (this.db.objectStoreNames.contains('min')) {
                        resolve()
                    } else {
                        this.db.createObjectStore('min')

                        Object.assign(event.target.transaction, {
                            oncomplete() {
                                resolve()
                            },
                        })
                    }
                },
                onsuccess(event) {
                    this.db = event.target.result

                    resolve()
                },
                onerror(event) {
                    reject(event.error)
                },
            })
        })
    }
    async get() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('indexedDB not opened')
                return
            }

            const transaction = this.db.transaction('min', 'readonly')
            const object = transaction.objectStore('min')
            const get = object.get('form')

            Object.assign(get, {
                onsuccess() {
                    resolve(get.result)
                },
                onerror(event) {
                    reject(event.error)
                },
            })
        })
    }
    async set(value) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('indexedDB not opened')
                return
            }

            const transaction = this.db.transaction('min', 'readwrite')
            const object = transaction.objectStore('min')
            const get = object.get('form')

            Object.assign(get, {
                onsuccess() {
                    if (get.result) {
                        Object.assign(get.result, value)

                        const update = object.put(value, 'form')

                        Object.assign(update, {
                            onsuccess() {
                                resolve()
                            },
                            onerror(event) {
                                reject(event.error)
                            },
                        })
                    } else {
                        const add = object.add(value, 'form')

                        Object.assign(add, {
                            onsuccess() {
                                resolve()
                            },
                            onerror(event) {
                                reject(event.error)
                            },
                        })
                    }
                },
                onerror(event) {
                    reject(event.error)
                },
            })
        })
    }
    async reset() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('indexedDB not opened')
                return
            }

            const transaction = this.db.transaction('min', 'readwrite')
            const object = transaction.objectStore('min')

            Object.assign(object.delete('form'), {
                onsuccess() {
                    resolve()
                },
                onerror(event) {
                    reject(event.error)
                },
            })
        })
    }
}
