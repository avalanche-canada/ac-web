import React from 'react'
import { Provider } from './Context'

export { Provider, Consumer } from './Context'
export Metadata from './Metadata'
export Headline from './Headline'
export ArchiveWarning from './ArchiveWarning'
export TabSet from './TabSet'
export Footer from './Footer'
export Sidebar from './Sidebar'
export KananaskisSidebar from './KananaskisSidebar'

export function Forecast({ children, value }) {
    return <Provider value={value}>{children}</Provider>
}
