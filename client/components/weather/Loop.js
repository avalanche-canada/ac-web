import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import Base from '~/components/loop'
import {
    computeUrls,
    getNotes,
    isForecast,
    fetchMetadata,
} from '~/services/msc/loop'
import { Loading, Error } from '~/components/text'
import Alert, { WARNING } from '~/components/alert'

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
            <ul>{notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
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
        const { date, type, run } = this.props

        if (isAfter(date, new Date(2017, 6, 22))) {
            if (type.includes('HRDPS')) {
                return null
            }

            if (
                (run === 0 && isBefore(date, new Date(2017, 9, 4))) ||
                (run === 12 && isBefore(date, new Date(2017, 9, 3)))
            ) {
                return null
            }
        }

        const { isLoading, isError, notes } = this.state

        if (isLoading) {
            return <Loading>Creating the loop...</Loading>
        }

        if (isError) {
            return <Error>Sorry, we are not able to create the loop.</Error>
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

export function Warning() {
    return (
        <Alert type={WARNING}>
            <h2>
                We are currently experiencing some issues with HRDPS weather
                loops image generation!
            </h2>
            <h3>
                This product will be available as soon as we solve the issue.<br />Thanks
                for your patience!
            </h3>
        </Alert>
    )
}
