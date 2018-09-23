import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import * as Icons from 'components/icons'
import { Close } from 'components/button'
import { Control } from 'components/form'
import { GRAY_LIGHT } from 'constants/colors'

export default class Search extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string,
    }
    static defaultProps = {
        placeholder: 'Search...',
    }
    input = createRef()
    handleReset = () => {
        const value = ''

        this.focus()
        this.props.onChange(value)
    }
    focus = () => {
        this.input.current.focus()
    }
    handleChange = event => {
        const { value } = event.target

        this.props.onChange(value)
    }
    render() {
        const { value } = this.props

        return (
            <Control horizontal bordered>
                <i style={SEARCH_ICON_STYLE} onClick={this.focus}>
                    <Icons.Search color={GRAY_LIGHT} />
                </i>
                <input
                    ref={this.input}
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
