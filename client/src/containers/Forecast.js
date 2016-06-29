import React from 'react'
import Drawer, {Header} from 'components/page/drawer'

export default function Forecast({forecast}) {
    const header = (
        <Header>
            <h1>
                Cariboos
            </h1>
        </Header>
    )

    return (
        <Drawer open header={header}>
            Content...
        </Drawer>
    )
}
