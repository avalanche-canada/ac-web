import React from 'react'
import PropTypes from 'prop-types'
import {onlyUpdateForKey} from 'compose'
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

export default onlyUpdateForKey('measurements')(Station)
