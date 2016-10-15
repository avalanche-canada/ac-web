import React from 'react'
import classnames from 'classnames'
import getLabel from './getLabel'
import getError from './getError'
import getHelp from './getHelp'

function create(overrides = {}) {
  function checkbox(locals) {
    locals.attrs = checkbox.getAttrs(locals)
    return checkbox.renderVertical(locals)
  }

  checkbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    const attrs = {...locals.attrs}
    attrs.type = 'checkbox'
    attrs.disabled = locals.disabled
    attrs.checked = locals.value
    attrs.onChange = evt => locals.onChange(evt.target.checked)
    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || (attrs.id + '-tip')
    }
    return attrs
  }

  checkbox.renderCheckbox = overrides.renderCheckbox || function renderCheckbox(locals) {
    return <input {...locals.attrs} />
  }

  checkbox.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return getLabel({
      label: locals.label,
      htmlFor: locals.attrs.id
    })
  }

  checkbox.renderError = overrides.renderError || function renderError(locals) {
    return getError(locals)
  }

  checkbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getHelp(locals)
  }

  checkbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    const className = {
      inline: true,
      field: true,
      error: locals.hasError,
      disabled: locals.disabled,
      [`field-depth-${locals.path.length}`]: true,
      [`field-${locals.path.join('-')}`]: locals.path.length > 0
    }
    return (
      <div className={classnames(className)}>
        <div className="ui checkbox">
          {checkbox.renderCheckbox(locals)}
          {checkbox.renderLabel(locals)}
          {checkbox.renderError(locals)}
          {checkbox.renderHelp(locals)}
        </div>
      </div>
    )
  }

  checkbox.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return checkbox
}

export default create()
