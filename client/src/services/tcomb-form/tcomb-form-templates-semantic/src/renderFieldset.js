import React from 'react'
import classnames from 'classnames'

function getClassName(locals) {
  const len = locals.path.length
  return classnames({
    ui: true,
    form: true,
    segment: locals.path.length > 0,
    error: locals.hasError,
    'fieldset': true,
    [`fieldset-depth-${len}`]: true,
    [`fieldset-${locals.path.join('-')}`]: len > 0,
    [locals.className]: !!locals.className
  })
}

export default function renderFieldset(children, locals) {
  const legend = locals.label ? <h4 className="ui dividing header">{locals.label}</h4> : null
  const style = locals.path.length === 0 ? {
    border: 0,
    margin: 0,
    padding: 0
  } : null
  const props = {
    className: getClassName(locals),
    disabled: locals.disabled,
    style: style
  }
  return React.createElement.apply(null, [
    'fieldset',
    props,
    legend
  ].concat(children))
}