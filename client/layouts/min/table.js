import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { Page as Base, Header, Main, Content } from '~/components/page'
import { Responsive } from '~/components/table'
import { Br } from '~/components/markup'
import Table, { Status, Metadata } from '~/containers/min/Table'
import { withRouter } from 'react-router-dom'
import {
    valueHandlerFactory,
    arrayValueHandlerFactory,
    sortingHandlerFactory,
} from '~/utils/router'

const DAYS = '7'
const TYPES = []

PageLayout.propTypes = {
    days: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    sorting: PropTypes.string,
    onDaysChange: PropTypes.func.isRequired,
    onTypesChange: PropTypes.func.isRequired,
    onSortingChange: PropTypes.func.isRequired,
}

function PageLayout({
    days = DAYS,
    types = TYPES,
    sorting,
    onDaysChange,
    onTypesChange,
    onSortingChange,
}) {
    return (
        <Base>
            <Header title="Mountain Information Network submissions" />
            <Content>
                <Main>
                    <Metadata
                        days={days}
                        types={types}
                        onDaysChange={onDaysChange}
                        onTypesChange={onTypesChange}
                    />
                    <Br />
                    <Responsive>
                        <Table
                            days={days}
                            types={types}
                            sorting={sorting}
                            onSortingChange={onSortingChange}
                        />
                    </Responsive>
                    <Status days={days} types={types} />
                </Main>
            </Content>
        </Base>
    )
}

export const Page = compose(
    withRouter,
    withHandlers({
        onDaysChange: valueHandlerFactory('days'),
        onTypesChange: arrayValueHandlerFactory('types'),
        onSortingChange: sortingHandlerFactory(),
    })
)(PageLayout)
