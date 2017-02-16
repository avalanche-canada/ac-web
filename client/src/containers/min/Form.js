import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {compose, onlyUpdateForKeys} from 'recompose'
import {onlyUpdateForKey} from 'compose'
import Immutable from 'immutable'
import t from 'services/tcomb-form'
import CSSModules from 'react-css-modules'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {MountainInformationNetworkSubmission} from 'api/schemas'
import {Tab, TabSet} from 'components/tab'
import {Page, Header, Main, Section, Content} from 'components/page'
import Button from 'components/button'
import styles from './Form.css'
import OPTIONS from './options'
import QUICK_REPORT from './quick.json'
import {Error, Mailto} from 'components/misc'
import debounce from 'lodash/debounce'
import {postMountainInformationNetworkSubmission} from 'actions/entities'
import {Submission} from './types'
import AuthService from 'services/auth'
import CancelError from 'utils/promise/CancelError'
import isNull from 'lodash/isNull'
import format from 'date-fns/format'

// const Keys = new Map([
//     [QUICK, 'quickReport'],
//     [AVALANCHE, 'avalancheReport'],
//     [SNOWPACK, 'snowpackReport'],
//     [WEATHER, 'weatherReport'],
//     [INCIDENT, 'incidentReport'],
// ])

// function ridingConditionsMerger(prev, next) {
//     if (prev.type === 'single') {
//         return {
//             ...prev,
//             selected: next
//         }
//     }
//
//     return {
//         ...prev,
//         options: next
//     }
// }

// Does not re-render on every change...we were losing the images
// const UploadsForm = onlyUpdateForKey('value')(t.form.Form)
const Base = t.form.Form

@withRouter
@connect(null, {
    post: postMountainInformationNetworkSubmission
})
@CSSModules(styles)
export default class Form extends Component {
    state = {
        value: {},
        options: OPTIONS,
        type: Submission,
        noObservations: null,
        isSubmitting: false,
        serverErrorReceived: false,
    }
    constructor(props) {
        super(props)

        this.auth = AuthService.create()
    }
    handleSubmit = event => {
        event.preventDefault()

        this.setState({
            isSubmitting: true,
            serverErrorReceived: false,
        }, this.validate)
    }
    handleChange = value => {
        this.setState({value})
    }
    validate = () => {
        const value = this.refs.submission.getValue()
        console.warn(this.refs.submission.validate())

        if (value) {
            this.submit(value)
        }
    }
    submit(value) {
        console.warn(value)
        // const required = values.get('required')
        // const {longitude, latitude} = required.latlng
        // let observations = values.get('observations')
        //
        // if (observations.has(QUICK)) {
        //     const quick = observations.get(QUICK)
        //     const ridingConditions = Immutable.Map(QUICK_REPORT.ridingConditions)
        //     .mergeWith(ridingConditionsMerger, Immutable.Map(quick.ridingConditions)).toJSON()
        //
        //     observations = observations.set(QUICK, {
        //         ...quick,
        //         ridingConditions,
        //     })
        // }
        //
        // if (observations.has(INCIDENT)) {
        //     const incident = observations.get(INCIDENT)
        //     const {
        //         numberFullyBuried = 0,
        //         numberPartlyBuriedImpairedBreathing = 0,
        //         numberPartlyBuriedAbleBreathing = 0,
        //         numberCaughtOnly = 0,
        //         numberPeopleInjured = 0,
        //     } = incident
        //     const numberInvolved = numberFullyBuried + numberPartlyBuriedImpairedBreathing + numberPartlyBuriedAbleBreathing + numberCaughtOnly + numberPeopleInjured
        //
        //     if (numberInvolved > 0) {
        //         incident.numberInvolved = numberInvolved
        //     }
        //
        //     observations = observations.set(INCIDENT, incident)
        // }
        //
        // if (observations.has(AVALANCHE)) {
        //     observations = observations.update(AVALANCHE, avalanche => {
        //         const {avalancheOccurrence} = avalanche
        //
        //         avalanche = {
        //             ...avalanche,
        //             avalancheOccurrenceEpoch: format(avalancheOccurrence, 'YYYY-MM-DD'),
        //             avalancheOccurrenceTime: format(avalancheOccurrence, 'hh:mm A'),
        //         }
        //
        //         delete avalanche.avalancheOccurrence
        //
        //         return avalanche
        //     })
        // }
        //
        // // TODO: List all files...have ot look at the issue in tcomb-form
        // const {files} = document.querySelector('input[name="files"]')
        //
        // // TODO: That transformation to FormData should be done in Axios!!!
        // const form = new FormData()
        // const data = {
        //     ...required,
        //     datetime: required.datetime.toISOString(),
        //     latlng: JSON.stringify([String(latitude), String(longitude)]),
        //     obs: JSON.stringify(observations.mapKeys(key => Keys.get(key)).toJSON())
        // }
        //
        // Object.keys(data).map(key =>
        //     form.append(key, data[key])
        // )
        //
        // // Files[Iterator] does not exist in Safari :(
        // for (let i = 0; i < files.length; i++) {
        //     form.append(`files${i+1}`, files[i])
        // }
        //
        // this.props.post(form).then(data => {
        //     const {key} = MountainInformationNetworkSubmission
        //     const id = MountainInformationNetworkSubmission.getId(data.value)
        //
        //     this.props.router.push({
        //         pathname: '/map',
        //         query: {
        //             panel: `${key}/${id}`
        //         }
        //     })
        // }, err => {
        //     this.setState({
        //         serverErrorReceived: true,
        //         isSubmitting: false,
        //     })
        // })
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
        const {options, type, value} = this.state
        const disabled = false
        const isSubmitting = false

        return (
            <Page>
                <Header title='Mountain Information Network — Create report' />
                <Content>
                    <Main>
                        <form onSubmit={this.handleSubmit} styleName='Form' noValidate>
                            <Base ref='submission' value={value} type={type} options={options} disabled={disabled} onChange={this.handleChange} />
                        </form>
                    </Main>
                </Content>
            </Page>
        )
    }
}
