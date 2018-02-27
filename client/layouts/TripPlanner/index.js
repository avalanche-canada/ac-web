import React from 'react'
import supported from '@mapbox/mapbox-gl-supported'
import Bundle from 'components/Bundle'
import { Loading } from 'components/text'
import { Page, Content } from 'components/page'
import Unsupported from './Unsupported'
import loadLayout from 'bundle-loader?lazy!./Layout'

export default function TripPlanner() {
    return supported() ? (
        <Bundle load={loadLayout}>
            {Component =>
                Component ? (
                    <Component />
                ) : (
                    <Page>
                        <Content>
                            <h1>
                                <Loading />
                            </h1>
                        </Content>
                    </Page>
                )
            }
        </Bundle>
    ) : (
        <Unsupported />
    )
}
