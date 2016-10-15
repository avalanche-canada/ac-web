import React from 'react'
import classnames from 'classnames'
import getLabel from './getLabel'
import getError from './getError'
import getHelp from './getHelp'

function create(overrides = {}) {
  function radio(locals) {
    return radio.renderVertical(locals)
  }

  radio.renderRadios = overrides.renderRadios || function renderRadios(locals) {
    const id = locals.attrs.id
    const onChange = evt => locals.onChange(evt.target.value)

    return locals.options.map((option, i) => {
      const attrs = {...locals.attrs}
      attrs.type = 'radio'
      attrs.checked = (option.value === locals.value)
      attrs.disabled = locals.disabled
      attrs.value = option.value
      attrs.autoFocus = attrs.autoFocus && (i === 0)
      attrs.id = `${id}_${i}`
      attrs['aria-describedby'] = attrs['aria-describedby'] || (locals.label ? id : null)
      attrs.onChange = onChange

      return (
        <div key={option.value} className="field">
          <div className="ui radio checkbox">
            <input {...attrs} />
            <label onClick={() => document.getElementById(attrs.id).click()}>{option.text}</label>
          </div>
        </div>
      )
    })
  }

  radio.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return getLabel({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    })
  }

  radio.renderError = overrides.renderError || function renderError(locals) {
    return getError(locals)
  }

  radio.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getHelp(locals)
  }

  radio.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    const className = {
      field: true,
      error: locals.hasError,
      disabled: locals.disabled,
      [`field-depth-${locals.path.length}`]: true,
      [`field-${locals.path.join('-')}`]: locals.path.length > 0
    }
    return (
      <div className={classnames(className)}>
        {radio.renderLabel(locals)}
        {radio.renderRadios(locals)}
        {radio.renderError(locals)}
        {radio.renderHelp(locals)}
      </div>
    )
  }

  radio.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return radio
}

export default create()
