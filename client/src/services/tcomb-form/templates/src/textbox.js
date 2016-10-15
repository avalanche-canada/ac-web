import React from 'react'
import classnames from 'classnames'
import getLabel from './getLabel'
import getError from './getError'
import getHelp from './getHelp'

function create(overrides = {}) {
  function textbox(locals) {
    locals.attrs = textbox.getAttrs(locals)

    if (locals.type === 'hidden') {
      return textbox.renderHiddenTextbox(locals)
    }

    return textbox.renderVertical(locals)
  }

  textbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    const attrs = {...locals.attrs}
    attrs.className = classnames(attrs.className)
    attrs.type = locals.type
    attrs.disabled = locals.disabled
    if (locals.type !== 'file') {
      attrs.value = locals.value
    }
    attrs.onChange = locals.type === 'file' ?
      evt => locals.onChange(evt.target.files[0]) :
      evt => locals.onChange(evt.target.value)

    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || attrs.id + '-tip'
    }
    return attrs
  }

  textbox.renderHiddenTextbox = overrides.renderHiddenTextbox || function renderHiddenTextbox(locals) {
    return <input type="hidden" value={locals.value} name={locals.attrs.name} />
  }

  textbox.renderStatic = overrides.renderStatic || function renderStatic(locals) {
    return locals.value
  }

  textbox.renderTextbox = overrides.renderTextbox || function renderTextbox(locals) {
    if (locals.type === 'static') {
      return textbox.renderStatic(locals)
    }
    return locals.type !== 'textarea' ?
      textbox.renderInput(locals) :
      textbox.renderTextarea(locals)
  }

  textbox.renderInput = overrides.renderInput || function renderInput(locals) {
    return <input {...locals.attrs} />
  }

  textbox.renderTextarea = overrides.renderTextarea || function renderTextarea(locals) {
    return <textarea {...locals.attrs} />
  }

  textbox.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return getLabel({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    })
  }

  textbox.renderError = overrides.renderError || function renderError(locals) {
    return getError(locals)
  }

  textbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getHelp(locals)
  }

  textbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    const className = {
      field: true,
      error: locals.hasError,
      disabled: locals.disabled,
      [`field-depth-${locals.path.length}`]: true,
      [`field-${locals.path.join('-')}`]: locals.path.length > 0
    }
    return (
      <div className={classnames(className)}>
        {textbox.renderLabel(locals)}
        {textbox.renderTextbox(locals)}
        {textbox.renderError(locals)}
        {textbox.renderHelp(locals)}
      </div>
    )
  }

  textbox.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return textbox
}

export default create()
