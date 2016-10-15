import React from 'react'
import classnames from 'classnames'
import getLabel from './getLabel'
import getError from './getError'
import getHelp from './getHelp'

function range(n) {
  const result = []
  for (let i = 1; i <= n; i++) { result.push(i) }
  return result
}

function padLeft(x, len) {
  let str = String(x)
  const times = len - str.length
  for (let i = 0; i < times; i++ ) { str = '0' + str }
  return str
}

function toOption(value, text) {
  return <option key={value} value={value + ''}>{text}</option>
}

const nullOption = [toOption('', '-')]

const days = nullOption.concat(range(31).map((i) => toOption(i, padLeft(i, 2))))

const months = nullOption.concat(range(12).map((i) => toOption(i - 1, padLeft(i, 2))))

function create(overrides = {}) {
  function date(locals) {
    locals.attrs = date.getAttrs(locals)
    return date.renderVertical(locals)
  }

  date.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    return {...locals.attrs}
  }

  date.renderDate = overrides.renderDate || function renderCheckbox(locals) {
    const value = locals.value.map(x => x || '')

    function onDayChange(evt) {
      value[2] = evt.target.value === '-' ? null : evt.target.value
      locals.onChange(value)
    }

    function onMonthChange(evt) {
      value[1] = evt.target.value === '-' ? null : evt.target.value
      locals.onChange(value)
    }

    function onYearChange(evt) {
      value[0] = evt.target.value.trim() === '' ? null : evt.target.value.trim()
      locals.onChange(value)
    }

    const parts = {
      D: (
        <div key="D" className="field">
          <select disabled={locals.disabled} value={value[2]} onChange={onDayChange}>{days}</select>
        </div>
      ),
      M: (
        <div key="M" className="field">
          <select disabled={locals.disabled} value={value[1]} onChange={onMonthChange}>{months}</select>
        </div>
      ),
      YY: (
        <div key="YY" className="field">
          <input disabled={locals.disabled} type="text" size={5} value={value[0]} onChange={onYearChange} />
        </div>
      )
    }

    return <div className="inline fields">{locals.order.map((id) => parts[id])}</div>
  }

  date.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return getLabel({
      label: locals.label,
      htmlFor: locals.attrs.id
    })
  }

  date.renderError = overrides.renderError || function renderError(locals) {
    return getError(locals)
  }

  date.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getHelp(locals)
  }

  date.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    const className = {
      field: true,
      error: locals.hasError,
      disabled: locals.disabled,
      [`field-depth-${locals.path.length}`]: true,
      [`field-${locals.path.join('-')}`]: locals.path.length > 0
    }
    return (
      <div className={classnames(className)}>
        {date.renderLabel(locals)}
        {date.renderDate(locals)}
        {date.renderError(locals)}
        {date.renderHelp(locals)}
      </div>
    )
  }

  date.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return date
}

export default create()
