import React, {PropTypes} from 'react'
import {compose} from 'recompose'
import Table from './Table'
import Chart from './Chart'
import {TabSet, Tab, LOOSE} from 'components/tab'

export default function Station({measurements, columns, headers}) {
    return (
        <TabSet theme={LOOSE}>
            <Tab title='Table'>
                <Table measurements={measurements} columns={columns} headers={headers} />
            </Tab>
            <Tab title='Chart'>
                <Chart measurements={measurements} />
            </Tab>
        </TabSet>
    )
}
