import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Base from '~/components/loop'
import {computeUrls, getNotes} from '~/services/msc/loop/url'
import {CurrentConditions} from '~/services/msc/loop/Metadata'
import {Loading, Error} from '~/components/misc'

export default class Loop extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        run: PropTypes.number,
        from: PropTypes.number,
        to: PropTypes.number,
        amount: PropTypes.number,
        moveDay: PropTypes.bool,
        interval: PropTypes.number,
        withNotes: PropTypes.bool,
    }
    static defaultProps = {
        withNotes: false
    }
    state = {
        urls: null,
        notes: null,
        startAt: undefined,
        isLoading: true,
        isError: false,
    }
    componentDidMount() {
        this.computeUrls(this.props)

        // Autorefresh the urls for current conditions!
        if (CurrentConditions.has(this.props.type)) {
            this.intervalId = window.setInterval(
                this.computeUrls,
                5 * 60 * 1000, // every 5 minutes!
                undefined,
                true,
            )
        }
    }
    componentWillUnmount() {
        if (this.intervalId) {
            window.clearInterval(this.intervalId)
        }
    }
    componentWillReceiveProps(props) {
        this.computeUrls(props)
    }
    computeUrls = (props = this.props, silent = false) => {
        this.setState({
            isLoading: silent ? false : true,
        }, () => {
            computeUrls(props).then(this.handleFulfilled, this.handleRejected)
        })
    }
    handleFulfilled = urls => {
        const {type, withNotes} = this.props
        let startAt

        if (CurrentConditions.has(type)) {
            startAt = urls.length - 1
        }

        this.setState({
            isLoading: false,
            isError: false,
            urls,
            notes: withNotes ? getNotes(type) : null,
            startAt,
        })
    }
    handleRejected = () => {
        this.setState({
            isLoading: false,
            isError: true,
        })
    }
    render() {
        const {isLoading, isError, notes} = this.state

        if (isLoading) {
            return (
                <Loading>
                    Creating the loop...
                </Loading>
            )
        }

        if (isError) {
            return (
                <Error>
                    Sorry, we are not able to create your loop.
                </Error>
            )
        }

        return (
            <div>
                <Base
                    urls={this.state.urls}
                    startAt={this.state.startAt}
                    openImageInNewTab
                    interval={this.props.interval} />
                {(Array.isArray(notes) && notes.length > 0) &&
                    <div>
                        <p>Please note:</p>
                        <ul>
                            {notes.map(note => <li>{note}</li>)}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}
