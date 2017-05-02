import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CancelToken } from 'axios'
import CSSModules from 'react-css-modules'
import noop from 'lodash/noop'
import { Input } from '~/components/controls'
import { Place, Close, Spinner } from '~/components/icons'
import { findPlaces } from '~/services/mapbox/api'
import { OptionSet, Option } from '~/components/controls/options'
import Button, { INCOGNITO } from '~/components/button'
import styles from './Geocoder.css'

@CSSModules(styles)
export default class Geocoder extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    }
    static defaultProps = {
        onChange: noop,
        placeholder: 'Search',
    }
    state = {
        places: [],
        isFetching: false,
        isActive: false,
        error: null,
        value: '',
    }
    constructor(props) {
        super(props)

        /* eslint-disable react/no-direct-mutation-state */
        this.state.value = props.value
        /* eslint-disable react/no-direct-mutation-state */
    }
    get isActive() {
        return this.state.isActive
    }
    set isActive(isActive) {
        this.setState({ isActive })
    }
    handleChange = event => {
        const { value } = event.target

        this.setState({
            value,
            isActive: !!value,
        })

        if (value === '') {
            return
        }

        this.setState(
            {
                isFetching: true,
            },
            this.findPlaces.bind(this, value)
        )
    }
    findPlaces(value) {
        if (this.source) {
            this.source.cancel()
        }

        const source = (this.source = CancelToken.source())
        const options = {
            cancelToken: source.token,
        }

        findPlaces(value, options).then(this.handleLoad, this.handleError)
    }
    handleLoad = ({ data: { features } }) => {
        this.setState({
            places: features,
            isFetching: false,
            isActive: features.length > 0,
            error: null,
        })
    }
    handleError = error => {
        this.setState({
            isActive: false,
            isFetching: false,
            places: [],
            error,
        })
    }
    handleFocus = () => {
        this.isActive = true
    }
    handleBlur = () => {
        this.isActive = false
    }
    handleOptionClick = place => {
        this.setState(
            {
                isActive: false,
                value: place.text,
                places: [place],
            },
            () => {
                this.props.onChange(place)
            }
        )
    }
    handleClearClick = () => {
        this.setState(
            {
                isActive: false,
                value: '',
                places: [],
            },
            () => {
                this.props.onChange(null)
            }
        )
    }
    render() {
        const { isFetching, isActive, places = [], value } = this.state
        const { placeholder } = this.props
        const showClear = !isFetching && value

        return (
            <div styleName="Container">
                <Place />
                <Input
                    type="text"
                    placeholder={placeholder}
                    styleName="Input"
                    value={value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {showClear &&
                    <Button
                        styleName="Clear"
                        icon={<Close />}
                        onClick={this.handleClearClick}
                        kind={INCOGNITO}
                    />}
                {isFetching && <Spinner styleName="Spinner" />}
                <OptionSet
                    show={isActive}
                    onOptionClick={this.handleOptionClick}>
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
