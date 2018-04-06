import React, { Fragment } from 'react'
import { Provider } from './Context'
import TabSet from './TabSet'
import Headline from './Headline'
import Footer from './Footer'
import ArchiveWarning from './ArchiveWarning'
import Metadata from './Metadata'

export Metadata from './Metadata'
export Headline from './Headline'
export ArchiveWarning from './ArchiveWarning'
export TabSet from './TabSet'
export Footer from './Footer'
export Sidebar from './Sidebar'
export KananaskisSidebar from './KananaskisSidebar'

export function Forecast({ children, value }) {
    return (
        <Provider value={value}>
            {children || (
                <Fragment>
                    <Metadata />
                    <ArchiveWarning />
                    <Headline />
                    <TabSet />
                    <Footer />
                </Fragment>
            )}
        </Provider>
    )
}
