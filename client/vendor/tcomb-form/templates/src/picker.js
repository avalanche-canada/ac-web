import React from 'react'
import { Close } from 'components/button'
import controls from 'components/controls/Controls.css'
import noop from 'lodash/noop'

function defaultFormat(value) {
    return value
}

function create(overrides = {}) {
    function template(locals) {
        return template.renderContainer(locals)
    }

    template.getFormat =
        overrides.getFormat ||
        function getFormat(locals) {
            return locals.format || defaultFormat
        }

    template.renderContainer =
        overrides.renderContainer ||
        function renderContainer(locals) {
            return template.renderContent(locals)
        }

    template.renderResetButton =
        overrides.renderResetButton ||
        function renderResetButton(locals) {
            if (!locals.value) {
                return null
            }

            return (
                <div className={controls['Addon--Right']}>
                    <Close onClick={locals.onReset} />
                </div>
            )
        }

    template.renderInput =
        overrides.renderInput ||
        function renderStatic(locals) {
            return locals.disabled
                ? template.renderDisabledInput(locals)
                : template.renderEnabledInput(locals)
        }

    template.renderEnabledInput =
        overrides.renderEnabledInput ||
        function renderEnabledInput(locals) {
            const { open, value, attrs } = locals
            const format = template.getFormat(locals)

            return (
                <div className={controls.Group}>
                    <input
                        {...attrs}
                        autoComplete="off"
                        onFocus={open}
                        onClick={open}
                        onChange={open}
                        value={format(value)}
                    />
                    {template.renderResetButton(locals)}
                </div>
            )
        }

    template.renderDisabledInput =
        overrides.renderDisabledInput ||
        function renderDisabledInput(locals) {
            const { attrs, value } = locals
            const format = template.getFormat(locals)

            return (
                <input
                    {...attrs}
                    autoComplete="off"
                    disabled
                    onChange={noop}
                    value={format(value)}
                />
            )
        }

    template.renderContent =
        overrides.renderContent ||
        function renderContent() {
            return null
        }

    template.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides })
    }

    return template
}

export default create()
