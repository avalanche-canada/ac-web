import React from 'react'
import { MemoryRouter } from 'react-router-dom'

export default function withRouter(func) {
    return <MemoryRouter>{func()}</MemoryRouter>
}
