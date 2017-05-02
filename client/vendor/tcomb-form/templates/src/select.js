import React from 'react'
import classnames from 'classnames'
import getLabel from './getLabel'
import getError from './getError'
import getHelp from './getHelp'

function getOption(opts) {
    return (
        <option key={opts.value} disabled={opts.disabled} value={opts.value}>
            {opts.text}
        </option>
    )
}

function getOptGroup(opts) {
    return (
        <optgroup key={opts.label} disabled={opts.disabled} label={opts.label}>
            {opts.options.map(getOption)}
        </optgroup>
    )
}

function create(overrides = {}) {
    function select(locals) {
        locals.attrs = select.getAttrs(locals)

        return select.renderVertical(locals)
    }

    select.getAttrs =
        overrides.getAttrs ||
        function getAttrs(locals) {
            const attrs = { ...locals.attrs }
            attrs.className = classnames(attrs.className)
            attrs.multiple = locals.isMultiple
            attrs.disabled = locals.disabled
            attrs.value = locals.value
            attrs.onChange = evt => {
                const value = locals.isMultiple
                    ? Array.prototype.slice
                          .call(evt.target.options)
                          .filter(option => option.selected)
                          .map(option => option.value)
                    : evt.target.value

                locals.onChange(value)
            }
            if (locals.help) {
                attrs['aria-describedby'] =
                    attrs['aria-describedby'] || attrs.id + '-tip'
            }
            return attrs
        }

    select.renderOptions =
        overrides.renderOptions ||
        function renderOptions(locals) {
            return locals.options.map(
                x => (x.label ? getOptGroup(x) : getOption(x))
            )
        }

    select.renderSelect =
        overrides.renderSelect ||
        function renderSelect(locals) {
            return (
                <select {...locals.attrs}>
                    {select.renderOptions(locals)}
                </select>
            )
        }

    select.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            })
        }

    select.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals)
        }

    select.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals)
        }

    select.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            const className = {
                field: true,
                error: locals.hasError,
                disabled: locals.disabled,
                [`field-depth-${locals.path.length}`]: true,
                [`field-${locals.path.join('-')}`]: locals.path.length > 0,
            }

            return (
                <div className={classnames(className)}>
                    {select.renderLabel(locals)}
                    {select.renderSelect(locals)}
                    {select.renderError(locals)}
                    {select.renderHelp(locals)}
                </div>
            )
        }

    select.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides })
    }

    return select
}

export default create()
