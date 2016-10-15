import React from 'react'
import Overlay from 'react-overlays/lib/Overlay'
import {Close} from 'components/button'
import controls from 'components/controls/Controls.css'
import Callout, {BOTTOM} from 'components/callout'

const CONTAINER_STYLE = {
    position: 'relative',
}

function defaultFormat(value) {
    return value
}

function create(overrides = {}) {
    function template(locals) {
        return template.renderContainer(locals)
    }

    template.getFormat = overrides.getFormat || function getFormat(locals) {
        return locals.format || defaultFormat
    }

    template.renderContainer = overrides.renderContainer || function renderContainer(locals) {
        const {id} = locals.attrs

        return (
            <div id={`container-${id}`} style={CONTAINER_STYLE}>
                {template.renderDate(locals)}
                <Overlay
                    show={locals.isOpen}
                    onHide={locals.close}
                    onBackdropClick={locals.close}
                    onEscapeKeyUp={locals.close}
                    placement='bottom'
                    container={document.querySelector(`#container-${id}`)}
                    target={document.querySelector(`#container-${id} input`)}
                    rootClose
                    backdrop
                    shouldUpdatePosition>
                    <Callout placement='Bottom'>
                        {locals.isOpen && template.renderPicker(locals)}
                    </Callout>
                </Overlay>
            </div>
        )
    }

    template.renderResetButton = overrides.renderResetButton || function renderResetButton(locals) {
        if (!locals.value) {
            return null
        }

        return (
            <div className={controls['Addon--Right']}>
                <Close onClick={locals.onReset} />
            </div>
        )
    }

    template.renderDate = overrides.renderDate || function renderStatic(locals) {
        return locals.disabled ?
            template.renderDisabledInput(locals) :
            template.renderEnabledInput(locals)
    }

    template.renderEnabledInput = overrides.renderEnabledInput || function renderEnabledInput(locals) {
        const format = template.getFormat(locals)

        return (
            <div className={controls.Group}>
                <input
                    {...locals.attrs}
                    autoComplete='off'
                    onClick={() => locals.toggle()}
                    onChange={() => {}}
                    value={format(locals.value)} />
                {template.renderResetButton(locals)}
            </div>
        )
    }

    template.renderDisabledInput = overrides.renderDisabledInput || function renderDisabledInput(locals) {
        const format = template.getFormat(locals)

        return (
            <input
                {...locals.attrs}
                autoComplete='off'
                disabled
                onChange={() => {}}
                value={format(locals.value)} />
        )
    }

    template.renderPicker = overrides.renderPicker || function renderPicker() {
        throw new Error('renderPicker function needs to be provided')
    }

    template.clone = function clone(newOverrides = {}) {
        return create({...overrides, ...newOverrides})
    }

    return template
}

export default create()
