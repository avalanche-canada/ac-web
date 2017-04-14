import React from 'react'

export default function getError({hasError, error}) {
  if (hasError && error) {
    return <span className="ui pointing label visible red">{error}</span>
  }
}
