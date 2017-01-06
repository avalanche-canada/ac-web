import React from 'react'
import {compose, withHandlers} from 'recompose'
import {Page as Base, Header, Main, Content} from 'components/page'
import {Responsive} from 'components/table'
import {Br} from 'components/misc'
import Table, {Status, Metadata} from 'containers/min/Table'
import {withRouter} from 'react-router'
import {push} from 'utils/router'

const DAYS = '7'
const TYPES = []

function PageLayout({location, handleDaysChange, handleTypesChange}) {
    let {days = DAYS, types = TYPES} = location.query

    days = Number(days)
    types = typeof types === 'string' ? new Set([types]) : new Set(types)

    return (
        <Base>
            <Header title='Mountain Information Network submissions' />
            <Content>
                <Main>
                    <Metadata days={days} types={types}
                        onDaysChange={handleDaysChange}
                        onTypesChange={handleTypesChange} />
                    <Br />
                    <Responsive>
                        <Table days={days} types={types} />
                    </Responsive>
                    <Status days={days} types={types} />
                </Main>
            </Content>
        </Base>
    )
}

function Drawer({days = DAYS, types = TYPES}) {
    return (
        <Table days={days} types={new Set(types)} />
    )
}

export const Page = compose(
    withRouter,
    withHandlers({
        handleDaysChange: props => days => {
            push({
                query: {
                    days
                }
            }, props)
        },
        handleTypesChange: props => types => {
            types = typeof types === 'string' ? new Set([types]) : types

            push({
                query: {
                    types: Array.from(types)
                }
            }, props)
        },
    }),
)(PageLayout)
