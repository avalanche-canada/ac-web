import React from 'react'
import Overlay from 'react-overlays/lib/Overlay'
import {Close} from 'components/button'
import controls from 'components/controls/Controls.css'
import Callout, {BOTTOM} from 'components/callout'
import {TimePicker} from 'components/controls'
import {DayPicker, DateUtils} from 'components/misc'
import Button from 'components/button'
import styles from './Picker.css'

const CONTAINER_STYLE = {
    position: 'relative',
}
function noop() {}
function defaultFormat(value) {
    return value
}

function stopImmediatePropagation({nativeEvent}) {
    nativeEvent.stopImmediatePropagation()
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
        const {isOpen, close} = locals

        return (
            <div id={`container-${id}`} style={CONTAINER_STYLE} onClick={isOpen ? stopImmediatePropagation : noop}>
                {template.renderInput(locals)}
                <Overlay
                    show={isOpen}
                    onHide={close}
                    onEscapeKeyUp={close}
                    placement='bottom'
                    container={document.querySelector(`#container-${id}`)}
                    target={document.querySelector(`#container-${id} input`)}
                    rootClose
                    shouldUpdatePosition>
                    <Callout placement='Bottom'>
                        <div className={styles.Container}>
                            {template.renderContent(locals)}
                            {template.renderButton(locals)}
                        </div>
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

    template.renderInput = overrides.renderInput || function renderStatic(locals) {
        return locals.disabled ?
            template.renderDisabledInput(locals) :
            template.renderEnabledInput(locals)
    }

    template.renderEnabledInput = overrides.renderEnabledInput || function renderEnabledInput(locals) {
        const {open, value, attrs} = locals
        const format = template.getFormat(locals)

        return (
            <div className={controls.Group}>
                <input {...attrs}
                    autoComplete='off'
                    onFocus={open}
                    onClick={open}
                    onChange={open}
                    value={format(value)} />
                {template.renderResetButton(locals)}
            </div>
        )
    }

    template.renderDisabledInput = overrides.renderDisabledInput || function renderDisabledInput(locals) {
        const {attrs, value} = locals
        const format = template.getFormat(locals)

        return (
            <input {...attrs}
                autoComplete='off'
                disabled
                onChange={noop}
                value={format(value)} />
        )
    }

    template.renderButton = overrides.renderButton || function renderButton(locals) {
        const {value, close, onChange} = locals
        function handleClick() {
            // TODO: Send the default value
            onChange(value)
            close()
        }

        return (
            <Button className={styles.Button} onClick={handleClick}>
                Done
            </Button>
        )
    }

    template.renderContent = overrides.renderContent || function renderContent(locals) {
        return null
    }

    template.clone = function clone(newOverrides = {}) {
        return create({...overrides, ...newOverrides})
    }

    return template
}

export default create()
