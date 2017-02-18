import React, {Component, cloneElement} from 'react'
import CSSModules from 'react-css-modules'
import t from 'services/tcomb-form'
import {Tab, TabSet} from 'components/tab'
import {Reset} from 'components/button'
import styles from 'containers/min/Form.css'
import {ObservationTypes} from 'containers/min/types'
import {Options} from 'containers/min/options'
import {NAMES, TYPES, COLORS} from 'constants/min'
import get from 'lodash/get'
import has from 'lodash/has'

const {Struct, List} = t.form

@CSSModules(styles)
export default class ObservationSet extends List {
    constructor(props) {
        super(props)

        this.state.activeIndex = 0
    }
    set activeIndex(activeIndex) {
        this.setState({activeIndex})
    }
    handleTabActivate = activeIndex => {
        this.activeIndex = activeIndex
    }
    createItem(type, initial) {
        const item = {type, ...initial}
        const value = this.state.value.concat(item)
        const keys = this.state.keys.concat(this.props.ctx.uidGenerator.next())
        this.onChange(value, keys, this.props.ctx.path.concat(value.length - 1), 'add')
    }
    validate(...args) {
        const result = super.validate(...args)

        if (!result.isValid()) {
            const error = result.errors.find(error => error.path[0] === 'observations')

            if (error) {
                const index = error.path[1]
                const {type} = this.props.value[index]
                const Type = ObservationTypes.get(type)
                const Types = Array.from(ObservationTypes.values())

                this.activeIndex = Types.indexOf(Type)
            }
        }

        return result
    }
    shouldComponentUpdate(nextProps, nextState) {
        return super.shouldComponentUpdate(nextProps, nextState) ||
            this.state.activeIndex !== nextState.activeIndex
    }
    handleReset(index) {
        this.removeItem(index)
        this.validate()
    }
    renderEmptyStruct(type) {
        const {disabled, ctx} = this.props
        const props = {
            disabled,
            ctx,
            onChange: this.createItem.bind(this, type),
            options: Options.get(type),
            type: ObservationTypes.get(type),
        }

        return <Struct {...props} />
    }
    cloneInput({input}) {
        return cloneElement(input, {
            options: Options.get(input.props.value.type),
        })
    }
    createTab(type, items) {
        const {disabled} = this.props
        const item = items.find(item => item.input.props.value.type === type)
        const index = items.indexOf(item)
        const hasInput = has(item, 'input')
        const color = item ? COLORS.get(type) : null
        const label = NAMES.get(type)
        const handleReset = this.handleReset.bind(this, index)

        return (
            <Tab key={type} title={label} color={color}>
                {hasInput ? this.cloneInput(item) : this.renderEmptyStruct(type)}
                <Reset disabled={disabled || !hasInput} onClick={handleReset}>
                    Reset {label} report
                </Reset>
            </Tab>
        )
    }
    render() {
        const {activeIndex} = this.state
        const items = this.getItems()
        const template = this.getTemplate()
        const locals = this.getLocals()

        // TODO: Create a template for rendering
        const children = []

        if (locals.help) {
          children.push(template.renderHelp(locals))
        }

        if (locals.error && locals.hasError) {
          children.push(template.renderError(locals))
        }

        children.push(
            <TabSet lazy={false} activeIndex={activeIndex} onActivate={this.handleTabActivate} arrow>
                {TYPES.map(type => this.createTab(type, items))}
            </TabSet>
        )

        return template.renderFieldset(children, locals)
    }
}
