import React, {PropTypes} from 'react'
import {onlyUpdateForKeys} from 'recompose'
import Table from './Table'
import ChartSet from './ChartSet'
import {TabSet, Tab, LOOSE} from 'components/tab'

function Station({measurements, columns, headers}) {
    return (
        <TabSet theme={LOOSE}>
            <Tab title='Table'>
                <Table measurements={measurements} columns={columns} headers={headers} />
            </Tab>
            <Tab title='Charts'>
                <ChartSet measurements={measurements} />
            </Tab>
        </TabSet>
    )
}

export default onlyUpdateForKeys(['measurements'])(Station)
