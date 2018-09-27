import React from 'react'
import { Document } from 'prismic/containers'
import { tutorial } from 'prismic/params'
import { Loading } from 'components/text'
import Bundle from 'components/Bundle'
import load from 'bundle-loader?lazy!./layout'
import * as Page from 'components/page'
import { FR, EN } from 'constants/locale'

export default function Tutorial(props) {
    const locale = props.path === '/tutoriel' ? FR : EN

    return (
        <Bundle load={load}>
            {Component => (
                <Document {...tutorial.home()} locale={locale}>
                    {({ document }) => {
                        const loaded = document && Component

                        return loaded ? (
                            <Component {...props} />
                        ) : (
                            <Page.Page>
                                <Page.Content>
                                    <h1>
                                        <Loading />
                                    </h1>
                                </Page.Content>
                            </Page.Page>
                        )
                    }}
                </Document>
            )}
        </Bundle>
    )
}
