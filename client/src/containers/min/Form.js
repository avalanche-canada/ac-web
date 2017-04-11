import React, {Component} from 'react'
import t from '/vendor/tcomb-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import CSSModules from 'react-css-modules'
import {MountainInformationNetworkSubmission} from '/api/schemas'
import {Page, Header, Main, Content} from '/components/page'
import OPTIONS from './options'
import {postMountainInformationNetworkSubmission} from '/actions/entities'
import Submission from './types'
import AuthService from '/services/auth'
import CancelError from '/utils/promise/CancelError'
import Button, {Submit} from '/components/button'
import styles from './Form.css'
import set from 'lodash/set'
import get from 'lodash/get'
import {TYPES} from '/constants/min'
import ObservationSetError from './ObservationSetError'

const {Form} = t.form

function isObservationError(error) {
    return error.path[0] === 'observations'
}

@withRouter
@connect(null, {
    post: postMountainInformationNetworkSubmission
})
@CSSModules(styles)
export default class SubmissionForm extends Component {
    state = {
        value: null,
        options: OPTIONS,
        type: Submission,
        isSubmitting: false,
    }
    constructor(props) {
        super(props)

        this.auth = AuthService.create()

        Object.assign(this.state.options.fields.observations.config, {
            onReportRemove: this.handleReportRemove,
            onTabActivate: this.handleTabActivate,
        })
    }
    setActiveTab(activeIndex) {
        if (typeof activeIndex === 'string') {
            activeIndex = TYPES.indexOf(activeIndex)
        }

        if (typeof activeIndex !== 'number') {
            return
        }

        this.patchOptions({
            fields: {
                observations: {
                    config: {
                        activeIndex: {
                            '$set': activeIndex
                        }
                    }
                }
            }
        })
    }
    setObservationErrors(errors) {
        if (errors.length === 0) {
            return
        }

        const [{path: [root, type]}] = errors
        const patch = {
            fields: {
                observations: {
                    error: {
                        '$set': <ObservationSetError errors={errors} onErrorClick={this.handleErrorClick} />
                    }
                }
            }
        }

        this.patchOptions(patch, this.setActiveTab.bind(this, type))
    }
    patchOptions(patch, callback) {
        this.setState({
            options: t.update(this.state.options, patch)
        }, callback)
    }
    handleReportRemove = type => {
        setTimeout(this.validate)
    }
    handleTabActivate = activeIndex => {
        this.setActiveTab(activeIndex)
    }
    handleErrorClick = (type, event) => {
        event.preventDefault()
        this.setActiveTab(type)
    }
    handleChange = value => {
        this.setState({value})
    }
    validate = () => {
        const result = this.refs.submission.validate()

        this.showErrorState(result)

        return result
    }
    handlePreviewClick = event => {
        const result = this.validate()

        if (result.isValid()) {
            console.warn('showPreview')
        }
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

        const {path: [root]} = result.firstError()
        const element = document.querySelector(`.fieldset-${root}`)

        this.setObservationErrors(result.errors.filter(isObservationError))
        element.scrollIntoView(true)
        document.body.scrollTop -= 85 // Magic number ;)
    }
    submit(value) {
        this.setState({
            isSubmitting: true,
        }, () => {
            this.props.post(value).then(data => {
                const {key} = MountainInformationNetworkSubmission
                const id = MountainInformationNetworkSubmission.getId(data.value)

                this.props.router.push({
                    pathname: '/map',
                    query: {
                        panel: `${key}/${id}`
                    }
                })
            }, err => {
                this.setState({
                    isSubmitting: false,
                })

                throw err
            })
        })
    }
    componentDidUpdate() {
        if (!this.auth.isAuthenticated()) {
            this.auth.login().catch(err => {
                if (err instanceof CancelError) {
                    this.props.router.replace('')
                }
            })
        }
    }
    render() {
        const {options, type, value, isSubmitting} = this.state
        const disabled = isSubmitting

        return (
            <Page>
                <Header title='Mountain Information Network — Create report' />
                <Content>
                    <Main>
                        <form onSubmit={this.handleSubmit} noValidate styleName='Container'>
                            <Form ref='submission' value={value} type={type} options={options} disabled={disabled} onChange={this.handleChange} />
                            <Submit large disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting your report...' : 'Submit your report'}
                            </Submit>
                            {/* <Button type='button' large onClick={this.handlePreviewClick}>
                                Preview
                            </Button> */}
                        </form>
                    </Main>
                </Content>
            </Page>
        )
    }
}
