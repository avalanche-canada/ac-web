import React, {PropTypes} from 'react'
import {onlyUpdateForKeys} from 'recompose'
import Table from './Table'
import ChartSet from './ChartSet'
import {TabSet, Tab, LOOSE} from 'components/tab'
import {Loading} from 'components/misc'

function Station({measurements, columns, headers}) {
    return (
        <TabSet theme={LOOSE}>
            <Tab title='Table'>
                {measurements ?
                    <Table measurements={measurements} columns={columns} headers={headers} /> :
                    <Loading />
                }
            </Tab>
            <Tab title='Charts'>
                {measurements ?
                    <ChartSet measurements={measurements} /> :
                    <Loading />
                }
            </Tab>
        </TabSet>
    )
}

export default onlyUpdateForKeys(['measurements'])(Station)
