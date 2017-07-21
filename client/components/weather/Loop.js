import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base from '~/components/loop'
import {
    computeUrls,
    getNotes,
    isForecast,
    fetchMetadata,
} from '~/services/msc/loop'
import isAfter from 'date-fns/is_after'
import { Loading, Error } from '~/components/misc'

NoteSet.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

function NoteSet({ notes = [] }) {
    if (!Array.isArray(notes) || notes.length === 0) {
        return null
    }

    return (
        <div>
            <p>Please note:</p>
            <ul>
                {notes.map((note, index) =>
                    <li key={index}>
                        {note}
                    </li>
                )}
            </ul>
        </div>
    )
}

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
        withNotes: false,
    }
    state = {
        urls: [],
        notes: null,
        startAt: undefined,
        isLoading: false,
        isError: false,
        metadata: null,
    }
    fetchMetadata = () => {
        return new Promise(resolve => {
            this.setState({ isLoading: true }, () => {
                fetchMetadata().then(metadata => {
                    this.setState({ metadata, isLoading: false }, resolve)
                })
            })
        })
    }
    componentDidMount() {
        this.fetchMetadata().then(() => {
            const { metadata } = this.state
            const { type } = this.props

            this.computeUrls(this.props)

            // Autorefresh the urls for current conditions!
            if (metadata.hasOwnProperty(type) && !isForecast(metadata[type])) {
                this.intervalId = window.setInterval(
                    this.computeUrls,
                    5 * 60 * 1000, // every 5 minutes!
                    undefined,
                    true
                )
            }
        })
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
        this.setState(
            {
                isLoading: silent ? false : true,
            },
            () => {
                computeUrls(this.state.metadata, props).then(
                    this.handleFulfilled,
                    this.handleRejected
                )
            }
        )
    }
    handleFulfilled = urls => {
        const { type, withNotes } = this.props
        const { metadata } = this.state
        let startAt

        if (this.state.metadata.hasOwnProperty(type)) {
            startAt = urls.length - 1
        }

        this.setState({
            isLoading: false,
            isError: false,
            urls,
            notes: withNotes ? getNotes(metadata, type) : null,
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
        if (isAfter(this.props.date, new Date('2017-07-22'))) {
            return null
        }

        const { isLoading, isError, notes } = this.state

        if (isLoading) {
            return <Loading>Creating the loop...</Loading>
        }

        if (isError) {
            return <Error>Sorry, we are not able to create your loop.</Error>
        }

        return (
            <div>
                <Base
                    urls={this.state.urls}
                    startAt={this.state.startAt}
                    openImageInNewTab
                    interval={this.props.interval}
                />
                <NoteSet notes={notes} />
            </div>
        )
    }
}
