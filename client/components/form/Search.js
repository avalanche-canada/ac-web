import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { Close } from 'components/button'
import { Control } from 'components/form'

export default class Search extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        search: PropTypes.string,
        placeholder: PropTypes.string,
    }
    static defaultProps = {
        placeholder: 'Search...',
    }
    state = {
        value: this.props.search || '',
    }
    setRef = input => (this.input = input)
    sendChange = debounce(() => {
        this.props.onChange(this.state.value)
    }, 350)
    handleReset = () => {
        const value = ''

        this.setState({ value }, () => {
            this.input.focus()
            this.props.onChange(value)
        })
    }
    handleChange = event => {
        const { value } = event.target

        this.setState({ value }, this.sendChange)
    }
    render() {
        const { value } = this.state

        return (
            <Control horizontal bordered>
                <input
                    ref={this.setRef}
                    name="search"
                    type="search"
                    placeholder="Search for a definition"
                    value={value}
                    onChange={this.handleChange}
                />
                {value && <Close onClick={this.handleReset} />}
            </Control>
        )
    }
}
