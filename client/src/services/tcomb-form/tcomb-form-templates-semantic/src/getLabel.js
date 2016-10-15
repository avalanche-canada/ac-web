import React from 'react'

export default function getLabel({label, htmlFor, id}) {
  if (label) {
    return (
      <label htmlFor={htmlFor} id={id}>{label}</label>
    )
  }
}
