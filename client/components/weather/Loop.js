import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import Base from 'components/loop'
import { computeUrls, getNotes, isForecast } from 'services/msc/loop'
import metadata from 'services/msc/loop/metadata.json'
import { Loading, Error } from 'components/text'

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
    }
    componentDidMount() {
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
                computeUrls(props).then(
                    this.handleFulfilled,
                    this.handleRejected
                )
            }
        )
    }
    handleFulfilled = urls => {
        const { type, withNotes } = this.props
        let startAt

        if (metadata.hasOwnProperty(type)) {
            // runs means it a forecast product, not real time
            startAt = 'runs' in metadata[type] ? 0 : urls.length - 1
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
