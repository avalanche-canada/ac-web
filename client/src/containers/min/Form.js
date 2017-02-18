import React, {Component} from 'react'
import t from 'services/tcomb-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import CSSModules from 'react-css-modules'
import {MountainInformationNetworkSubmission} from 'api/schemas'
import {Page, Header, Main, Content} from 'components/page'
import OPTIONS from './options'
import {postMountainInformationNetworkSubmission} from 'actions/entities'
import {Submission} from './types'
import AuthService from 'services/auth'
import CancelError from 'utils/promise/CancelError'
import {Submit} from 'components/button'
import styles from './Form.css'

const {Form} = t.form

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
    }
    handleChange = value => {
        this.setState({value})
    }
    handleSubmit = event => {
        event.preventDefault()

        const result = this.refs.submission.validate()

        if (result.isValid()) {
            this.submit()
        } else {
            // console.warn(result.errors)
            window.scrollTo(0, 0)
        }
    }
    submit() {
        this.setState({
            isSubmitting: true,
        }, () => {
            const value = this.refs.submission.getValue()

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
                        </form>
                    </Main>
                </Content>
            </Page>
        )
    }
}
