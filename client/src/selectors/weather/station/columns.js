import React from 'react'
import moment from 'moment'
import {HeaderCellOrders} from 'components/table'

const {ASC, DESC, NONE} = HeaderCellOrders

export const dateRanges = {
    name: 'name',
    title: 'Name',
    property({timestamp}) {
        return (
            <DateElement value={timestamp} />
        )
    },
    sorting: NONE,
}

export const level = {
    name: 'level',
    title: 'Level',
    property: 'level',
}
