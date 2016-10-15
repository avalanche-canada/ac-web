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

    children = children.concat(locals.order.map(name => locals.inputs[name]))

    return struct.renderFieldset(children, locals)
  }

  struct.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getAlert('info', locals.help)
  }

  struct.renderError = overrides.renderError || function renderError(locals) {
    return getAlert('error', locals.error)
  }

  struct.renderFieldset = overrides.renderFieldset || renderFieldset

  struct.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return struct
}

export default create()
