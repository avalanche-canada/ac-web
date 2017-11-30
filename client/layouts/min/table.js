import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Page as Base, Header, Main, Content } from 'components/page'
import { Responsive } from 'components/table'
import { Br } from 'components/markup'
import Table, { Status, Metadata } from 'containers/min/Table'
import { withRouter } from 'react-router-dom'
import {
    valueHandlerFactory,
    arrayValueHandlerFactory,
    sortingHandlerFactory,
} from 'utils/router'

const DAYS = '7'
const TYPES = []

@withRouter
export class Page extends PureComponent {
    static propTypes = {
        days: PropTypes.number,
        types: PropTypes.arrayOf(PropTypes.string),
        sorting: PropTypes.string,
        onDaysChange: PropTypes.func.isRequired,
        onTypesChange: PropTypes.func.isRequired,
        onSortingChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        days: DAYS,
        types: TYPES,
    }
    handleDaysChange = valueHandlerFactory('days')
    handleTypesChange = arrayValueHandlerFactory('types')
    handleSortingChange = sortingHandlerFactory()
    render() {
        const { days, types, sorting } = this.props

        return (
            <Base>
                <Header title="Mountain Information Network submissions" />
                <Content>
                    <Main>
                        <Metadata
                            days={days}
                            types={types}
                            onDaysChange={this.handleDaysChange}
                            onTypesChange={this.handleTypesChange}
                        />
                        <Br />
                        <Responsive>
                            <Table
                                days={days}
                                types={types}
                                sorting={sorting}
                                onSortingChange={this.handleSortingChange}
                            />
                        </Responsive>
                        <Status days={days} types={types} />
                    </Main>
                </Content>
            </Base>
        )
    }
}
