import React from 'react'
import Drawer, {Header} from 'components/page/drawer'

export default function PrimaryDrawer({children}) {
    return (
        <Drawer>
            {children}
        </Drawer>
    )
}
