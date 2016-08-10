import React from 'react'
import {connect} from 'react-redux'
import {Header, Content, Body} from 'components/page/drawer'
import Forecast, {Metadata} from 'components/forecast'
import {compose, lifecycle} from 'recompose'
import getHotZoneReport from 'selectors/hotZoneReport'
import {loadHotZoneReport} from 'actions/entities'
import {Muted} from 'components/misc'

function Container({isLoading, report, params, title = 'Loading...'}) {
    return (
        <Content>
            <Header subject='Hot Zone Report'>
                <h1>{title}</h1>
                {report && <Metadata {...report} />}
            </Header>
            <Body>
                {isLoading ?
                    <Muted>
                        Loading hot zone report...
                    </Muted> :
                    <Muted>
                        Ready for {params.name}!!!
                    </Muted>
                }
            </Body>
        </Content>
    )
}

export default compose(
    connect(getHotZoneReport, {loadHotZoneReport}),
    lifecycle({
        componentDidMount() {
            const {loadHotZoneReport, params} = this.props

            loadHotZoneReport(params)
        },
        componentWillReceiveProps({params}) {
            this.props.loadHotZoneReport(params)
        },
    })
)(Container)
