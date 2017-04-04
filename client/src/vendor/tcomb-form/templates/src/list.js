import React from 'react'
import getAlert from './getAlert'
import renderFieldset from './renderFieldset'

function getButton(options) {
  return <button key={options.key} className={`ui basic button button-${options.type}`} onClick={options.click}>{options.label}</button>
}

function create(overrides = {}) {
  function list(locals) {
    let children = []

    if (locals.help) {
      children.push(list.renderHelp(locals))
    }

    if (locals.error && locals.hasError) {
      children.push(list.renderError(locals))
    }

    children = children.concat(locals.items.map((item) => {
      return item.buttons.length === 0 ?
        list.renderRowWithoutButtons(item, locals) :
        list.renderRow(item, locals)
    }))

    if (locals.add) {
      children.push(list.renderAddButton(locals))
    }

    return list.renderFieldset(children, locals)
  }

  list.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return getAlert('info', locals.help)
  }

  list.renderError = overrides.renderError || function renderError(locals) {
    return getAlert('error', locals.error)
  }

  list.renderRowWithoutButtons = overrides.renderRowWithoutButtons || function renderRowWithoutButtons(item /* , locals*/) {
    return (
      <div key={item.key} className="six wide column">
        <div className="six wide column">{item.input}</div>
      </div>
    )
  }

  list.renderRowButton = overrides.renderRowButton || function renderRowButton(button) {
    return getButton({
      click: button.click,
      key: button.type,
      type: button.type,
      label: button.label
    })
  }

  list.renderButtonGroup = overrides.renderButtonGroup || function renderButtonGroup(buttons /* , locals*/) {
    return <div className="ui basic buttons">{buttons.map(list.renderRowButton)}</div>
  }

  list.renderRow = overrides.renderRow || function renderRow(row, locals) {
    return (
      <div key={row.key} className="ui grid">
        <div className="eight wide column">{row.input}</div>
        <div className="four wide column">{list.renderButtonGroup(row.buttons, locals)}</div>
      </div>
    )
  }

  list.renderAddButton = overrides.renderAddButton || function renderAddButton(locals) {
    const style = {
      marginTop: '1em'
    }
    return <div style={style}>{getButton(locals.add)}</div>
  }

  list.renderFieldset = overrides.renderFieldset || renderFieldset

  list.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return list
}

export default create()
