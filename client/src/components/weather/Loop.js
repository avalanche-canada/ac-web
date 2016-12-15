import React, {PropTypes, PureComponent} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Loop from 'components/loop'
import {computeUrls} from 'services/msc/loop/url'
import {Forecast, CurrentConditions} from 'services/msc/loop/Metadata'
import {Loading, Error} from 'components/misc'

export default class extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        run: PropTypes.number,
        from: PropTypes.number,
        to: PropTypes.number,
        amount: PropTypes.number,
        interval: PropTypes.number,
    }
    state = {
        urls: null,
        isLoading: true,
        isError: false,
    }
    componentDidMount() {
        this.computeUrls(this.props)

        const {type} = this.props

        if (CurrentConditions.has(type)) {
            const {frequency} = CurrentConditions.get(type)

            this.intervalId = window.setInterval(
                this.computeUrls,
                frequency * 60 * 1000
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
    computeUrls = (props = this.props) => {
        this.setState({
            isLoading: true
        }, () => {
            computeUrls(props).then(this.handleFulfilled, this.handleRejected)
        })
    }
    handleFulfilled = urls => {
        if (CurrentConditions.has(this.props.type)) {
            // start and end image are the same...
            // First image is the latest one ;)
            // urls = [urls[urls.length - 1], ...urls]
        }

        this.setState({
            isLoading: false,
            isError: false,
            urls,
        })
    }
    handleRejected = reason => {
        this.setState({
            isLoading: false,
            isError: true,
        })
    }
    render() {
        const {isLoading, isError} = this.state

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
            <Loop
                urls={this.state.urls}
                openImageInNewTab
                interval={this.props.interval} />
        )
    }
}
