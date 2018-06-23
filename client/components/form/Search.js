import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import * as Icons from 'components/icons'
import { Close } from 'components/button'
import { Control } from 'components/form'
import { GRAY_LIGHT } from 'constants/colors'

export default class Search extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        delay: PropTypes.number,
    }
    static defaultProps = {
        placeholder: 'Search...',
        delay: 150,
    }
    state = {
        value: this.props.value || '',
    }
    componentWillReceiveProps({ value }) {
        if (value !== this.state.value) {
            this.setState({ value })
        }
    }
    setRef = input => (this.input = input)
    sendChange = debounce(() => {
        this.props.onChange(this.state.value)
    }, this.props.delay)
    handleReset = () => {
        const value = ''

        this.setState({ value }, () => {
            this.focus()
            this.props.onChange(value)
        })
    }
    focus = () => {
        this.input.focus()
    }
    handleChange = event => {
        const { value } = event.target

        this.setState({ value }, this.sendChange)
    }
    render() {
        const { value } = this.state

        return (
            <Control horizontal bordered>
                <i style={SEARCH_ICON_STYLE} onClick={this.focus}>
                    <Icons.Search color={GRAY_LIGHT} />
                </i>
                <input
                    ref={this.setRef}
                    name="search"
                    type="search"
                    placeholder={this.props.placeholder}
                    value={value}
                    onChange={this.handleChange}
                />
                {value && <Close onClick={this.handleReset} />}
            </Control>
        )
    }
}

// Constants
const SEARCH_ICON_STYLE = {
    marginLeft: 10,
}
