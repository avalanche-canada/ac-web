import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForKey } from 'compose'
import Table from './Table'
import ChartSet from './ChartSet'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Loading, Muted } from 'components/text'
import styles from './Station.css'

Station.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.object).isRequired,
    // TODO: Create column PropTypes
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    // TODO: Create header PropTypes
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function Station({ measurements, columns, headers }) {
    //TODO(karl): Ensure we always get an empty measurements object
    if (typeof measurements === 'undefined' || measurements.size === 0) {
        return (
            <div className={styles.UnavaliableMessage}>
                <Muted>This station currently has no data avaliable</Muted>
            </div>
        )
    }

    return (
        <Tabs theme="LOOSE">
            <HeaderSet>
                <Header>Table</Header>
                <Header>Charts</Header>
            </HeaderSet>
            <PanelSet>
                <Panel title="Table">
                    {measurements ? (
                        <Table
                            measurements={measurements}
                            columns={columns}
                            headers={headers}
                        />
                    ) : (
                        <Loading />
                    )}
                </Panel>
                <Panel title="Charts">
                    {measurements ? (
                        <ChartSet measurements={measurements} />
                    ) : (
                        <Loading />
                    )}
                </Panel>
            </PanelSet>
        </Tabs>
    )
}

export default onlyUpdateForKey('measurements')(Station)
