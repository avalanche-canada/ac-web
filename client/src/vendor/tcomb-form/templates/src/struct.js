import React from 'react'
import getAlert from './getAlert'
import renderFieldset from './renderFieldset'

function create(overrides = {}) {
  function struct(locals) {
    let children = []

    if (locals.help) {
      children.push(struct.renderHelp(locals))
    }

    if (locals.error && locals.hasError) {
      children.push(struct.renderError(locals))
    }

    children.push(
        struct.renderFieldsetFields(
            locals.order.map(name => locals.inputs[name]),
            locals
        )
    )

    return struct.renderFieldset(children, locals)
  }

  struct.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getAlert('info', locals.help)
  }

  struct.renderError = overrides.renderError || function renderError(locals) {
    return getAlert('error', locals.error)
  }

  struct.renderFieldset = overrides.renderFieldset || renderFieldset

  struct.renderFieldsetFields = overrides.renderFieldsetFields || function renderFieldsetFields(children, locals) {
        return (
            <div className='fieldset-content'>
                {children}
            </div>
        )
  }

  struct.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return struct
}

export default create()
