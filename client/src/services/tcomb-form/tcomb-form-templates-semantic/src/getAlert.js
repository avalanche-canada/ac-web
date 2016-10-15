import React from 'react'

export default function getAlert(type, message) {
  return <div className={`ui message ${type}`}>{message}</div>
}
