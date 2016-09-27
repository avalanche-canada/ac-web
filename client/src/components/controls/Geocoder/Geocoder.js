import React, {PropTypes, Component} from 'react'
import CSSModules from 'react-css-modules'
import {compose, withHandlers} from 'recompose'
import {accessToken} from 'services/mapbox/config.json'
import {DropdownFromOptions, Input} from 'components/controls'
import {Place, Close, Home, Spinner} from 'components/icons'
import styles from './Geocoder.css'
import queryString from 'query-string'
import {OptionSet, Option} from 'components/controls/options'
import Button, {INCOGNITO} from 'components/button'

function K() {}
// TODO: Move that code to services/mapbox
const BASEURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const PARAMS = {
    country: ['ca', 'us', 'au', 'jp'].join(','),
    types: ['locality', 'place'].join(','),
    autocomplete: true,
    access_token: accessToken,
}

@CSSModules(styles)
export default class Geocoder extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        //placeholder: PropTypes.string,
    }
    static defaultProps = {
        onChange: K,
        placeholder: 'Search',
    }
    state = {
        places: [],
        isFetching: false,
        isActive: false,
        error: null,
        value: '',
    }
    constructor({value, props}) {
        super(props)

        this.state.value = value
    }
    get isActive() {
        return this.state.isActive
    }
    set isActive(isActive) {
        this.setState({isActive})
    }
    componentWillMount() {
        this.request = new XMLHttpRequest()
    }
    handleChange = event => {
        const {value} = event.target
        const {request} = this

        this.setState({
            value,
            isActive: !!value,
        })

        if (value === '') {
            return
        }

        request.abort()

        this.setState({
            isFetching: true,
        }, function() {
            const url = `${BASEURL}/${encodeURIComponent(value.trim())}.json?${queryString.stringify(PARAMS)}`

            request.open('GET', url, true)
            request.onload = this.handleLoad
            request.onerror = this.handleError
            request.send()
        })
    }
    handleLoad = () => {
        const {status, responseText} = this.request

        if (status >= 200 && status < 400) {
            const {features} = JSON.parse(responseText)

            this.setState({
                places: features,
                isFetching: false,
                isActive: features.length > 0,
                error: null,
            })
        } else {
            this.handleError()
        }
    }
    handleError = () => {
        const {responseText} = this.request

        this.setState({
            isActive: false,
            isFetching: false,
            places: [],
            error: JSON.parse(responseText).message
        })
    }
    handleFocus = event => {
        this.isActive = true
    }
    handleBlur = event => {
        this.isActive = false
    }
    handleOptionClick = place => {
        this.setState({
            isActive: false,
            value: place.text,
            places: [place]
        }, () => {
            this.props.onChange(place)
        })
    }
    handleClearClick = event => {
        this.setState({
            isActive: false,
            value: '',
            places: [],
        }, () => {
            this.props.onChange(null)
        })
    }
    render() {
        const {isFetching, isActive, places = [], value} = this.state
        const {placeholder} = this.props
        const showClear = !isFetching && value

        return (
            <div styleName='Container'>
                <Place />
                <Input type='text' placeholder={placeholder} styleName='Input' value={value} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                {/* {isFetching && <Home />} */}
                {showClear && <Button styleName='Clear' icon={<Close />} onClick={this.handleClearClick} kind={INCOGNITO} />}
                {isFetching && <Spinner styleName='Spinner' />}
                <OptionSet show={isActive} onOptionClick={this.handleOptionClick}>
                    {places.map(place => (
                        <Option value={place}>
                            {place.place_name}
                        </Option>
                    ))}
                </OptionSet>
            </div>
        )
    }
}
