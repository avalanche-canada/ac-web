import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/controls'
import { Place, Close, Spinner } from 'components/icons'
import { findPlaces } from 'services/mapbox/api'
import { OptionSet, Option, Dropdown } from 'components/controls/options'
import Button, { INCOGNITO } from 'components/button'
import { PRIMARY } from 'constants/colors'
import styles from './Geocoder.css'

export default class Geocoder extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    }
    static defaultProps = {
        onChange() {},
        placeholder: 'Search',
    }
    state = {
        places: [],
        isFetching: false,
        isActive: false,
        error: null,
        value: this.props.value || '',
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
            () => {
                findPlaces(value).then(this.handleLoad, this.handleError)
            }
        )
    }
    handleLoad = ({ features }) => {
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
            <div className={styles.Container}>
                <Place color={PRIMARY} />
                <Input
                    type="text"
                    placeholder={placeholder}
                    className={styles.Input}
                    value={value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {showClear && (
                    <Button onClick={this.handleClearClick} kind={INCOGNITO}>
                        <Close />
                    </Button>
                )}
                {isFetching && <Spinner />}
                {isActive && (
                    <Dropdown>
                        <OptionSet onChange={this.handleOptionClick}>
                            {places.map(place => (
                                <Option key={place.id} value={place}>
                                    {place.place_name}
                                </Option>
                            ))}
                        </OptionSet>
                    </Dropdown>
                )}
            </div>
        )
    }
}
