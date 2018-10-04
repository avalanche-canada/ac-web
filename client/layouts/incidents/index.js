import React from 'react'
import { Router } from '@reach/router'
import { Page, Main, Content, Header } from 'components/page'
import { Loading } from 'components/text'
import Bundle from 'components/Bundle'
import load from 'bundle-loader?lazy!./layouts'

export default function Incidents() {
    return (
        <Page>
            <Header title="Historical Incidents" />
            <Content>
                <Main>
                    <Bundle load={load}>
                        {module =>
                            module ? (
                                <Router>
                                    <module.IncidentsList path="/" />
                                    <module.IncidentDetails path=":id" />
                                </Router>
                            ) : (
                                <Loading />
                            )
                        }
                    </Bundle>
                </Main>
            </Content>
        </Page>
    )
}
