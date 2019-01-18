import React, { Component, createRef } from 'react'
import { navigate } from '@reach/router'
import t from 'vendor/tcomb-form'
import { Page, Header, Main, Content } from 'components/page'
import * as links from 'components/links'
import OPTIONS from './options'
import Submission from './types'
import AuthContext from 'contexts/auth'
import { Submit } from 'components/button'
import { TYPES } from 'constants/min'
import ObservationSetError from './ObservationSetError'
import { scrollIntoView } from 'utils/dom'
import transform from './transform'
import { status } from 'services/fetch/utils'
import * as min from 'api/requests/min'
import { CACHE } from './index'
import { SessionStorage } from 'services/storage'
import styles from './Form.css'

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
        }
    }
    async componentDidMount() {
        if (!this.context.isAuthenticated) {
            try {
                await this.context.login()
            } catch (error) {
                navigate('/')
            }
        }

        try {
            this.store = new FormStore()
            await this.store.open()
            const value = await this.store.get()

            this.setState({
                value: value || null,
            })
        } catch (error) {}
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

        try {
            this.store.set(value)
        } catch (e) {}
    }
    validate = () => {
        const result = this.form.current.validate()

        this.showErrorState(result)

        return result
    }
    handleSubmit = async event => {
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
                            const { subid } = data

                            // FIXME: Huge side effect hack, but it working for now
                            CACHE.reset()

                            try {
                                this.store.reset()
                            } catch (e) {}

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

        return (
            <Page>
                <Header title="Mountain Information Network — Create report" />
                <Content>
                    <Main>
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

// Utils
function isObservationError(error) {
    return error.path[0] === 'observations'
}

//
class FormStore {
    storage = new SessionStorage.create({ keyPrefix: 'min:form' })
    constructor() {
        const key = this.storage.get('key', String(Math.random() * 1e16))

        this.storage.set('key', key)
    }
    get key() {
        return this.storage.get('key')
    }
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

            const request = indexedDB.open('avcan', 1)

            request.onupgradeneeded = event => {
                this.db = event.target.result

                if (this.db.objectStoreNames.contains('min')) {
                    resolve()
                } else {
                    this.db.createObjectStore('min')

                    event.target.transaction.oncomplete = () => {
                        resolve()
                    }
                }
            }

            request.onsuccess = () => {
                this.db = request.result

                resolve()
            }

            request.onerror = event => {
                reject(event.error)
            }
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
            const get = object.get(this.key)

            get.onsuccess = () => {
                resolve(get.result)
            }
            get.onerror = () => {
                reject(event.error)
            }
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
            const get = object.get(this.key)

            get.onsuccess = () => {
                if (get.result) {
                    Object.assign(get.result, value)

                    const update = object.put(value, this.key)

                    update.onsuccess = () => {
                        resolve()
                    }
                    update.onerror = event => {
                        reject(event.error)
                    }
                } else {
                    const add = object.add(value, this.key)

                    add.onsuccess = () => {
                        resolve()
                    }
                    add.onerror = event => {
                        reject(event.error)
                    }
                }
            }

            get.onerror = event => {
                reject(event.error)
            }
        })
    }
    async reset() {
        return new Promise(resolve => {
            const transaction = this.db.transaction('min', 'readwrite')
            const object = transaction.objectStore('min')

            object.openCursor().onsuccess = event => {
                const cursor = event.target.result

                if (cursor) {
                    object.delete(cursor.key).onsuccess = () => {
                        cursor.continue()
                    }
                } else {
                    resolve()
                }
            }
        })
    }
}
