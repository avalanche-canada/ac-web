import React, {PropTypes, Component} from 'react'
import {DayPicker, DateUtils} from 'components/misc'
import classnames from 'classnames'

function defaultFormat(value) {
    return value ? value.toISOString().substring(0, 10) : ''
}

function create(overrides = {}) {
    function template(locals) {
        return template.renderContainer(locals)
    }

    template.getFormat = overrides.getFormat || function getFormat(locals) {
        return locals.format || defaultFormat
    }

    template.renderContainer = overrides.renderContainer || function renderContainer(locals) {
        return (
            <div style={{maxWidth: '300px'}}>
                {template.renderDate(locals)}
                {locals.isOpen && template.renderDayPicker(locals)}
            </div>
        )
    }

    template.renderResetButtonLabel = overrides.renderResetButtonLabel || function renderResetButtonLabel() {
        return <span>x</span>
    }

    template.renderResetButton = overrides.renderResetButton || function renderResetButton(locals) {
        return (
            <div className='input-group-addon' style={{cursor: 'pointer'}} onClick={locals.onReset}>
                {template.renderResetButtonLabel(locals)}
            </div>
        )
    }

    template.renderDate = overrides.renderDate || function renderStatic(locals) {
        return locals.disabled ?
            template.renderDisabledDate(locals) :
            template.renderEnabledDate(locals)
    }

    template.renderEnabledDate = overrides.renderEnabledDate || function renderEnabledDate(locals) {
        const format = template.getFormat(locals)

        return (
            <div className='input-group'>
                <input
                {...locals.attrs}
                onClick={() => locals.toggle()}
                onChange={() => {}}
                value={format(locals.value)}
                />
                {template.renderResetButton(locals)}
            </div>
        )
    }

    template.renderDisabledDate = overrides.renderDisabledDate || function renderDisabledDate(locals) {
        const format = template.getFormat(locals)

        return (
            <input
                {...locals.attrs}
                disabled
                onChange={() => {}}
                value={format(locals.value)}
            />
        )
    }

    template.renderDayPicker = overrides.renderDayPicker || function renderDayPicker(locals) {
        const value = locals.value
        const props = {
            initialMonth: value || undefined, // DayPicker wants undefined, not null
            modifiers: { selected: date => DateUtils.isSameDay(value, date) },
            onDayClick: locals.onSelect,
            value,
            localeUtils: locals.localeUtils,
            locale: locals.locale,
            renderDay: locals.renderDay
        }

        return <DayPicker {...props} />
    }

    template.clone = function clone(newOverrides = {}) {
        return create({...overrides, ...newOverrides})
    }

    return template
}

export default class Wrapper extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        template: PropTypes.func
    }
    static template = create()
    state = {
        isOpen: false
    }
    get locals() {
        return {
            isOpen: this.state.isOpen,
            open: this.open,
            close: this.close,
            toggle: this.toggle,
            onReset: this.onReset,
            onSelect: this.onSelect,
            ...this.props
        }
    }
    get template() {
        return this.props.template || this.constructor.template
    }
    open = () => {
        this.setState({ isOpen: true })
    }
    close = () => {
        this.setState({ isOpen: false })
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    onReset = () => {
        this.setState({isOpen: false}, () => {
            this.props.onChange(null)
        })
    }
    onSelect = (event, value) => {
        this.setState({isOpen: false}, () => {
            this.props.onChange(value)
        })
    }
    render() {
        return this.template(this.locals)
    }
}
