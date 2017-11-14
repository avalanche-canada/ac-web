import React from 'react'
import Renderer from 'react-test-renderer'
import { Metadata, Entry, ShareEntry } from './'
import { DateTime } from 'components/time'

test('metadata component', () => {
    const metadata = Renderer.create(
        <Metadata>
            <Entry term="Date issued">
                <DateTime value={new Date(2017, 1, 1)} />
            </Entry>
            <Entry term="Valid until">
                <DateTime value={new Date(2017, 1, 2)} />
            </Entry>
            <Entry term="Forecaster">James Floyer</Entry>
            <ShareEntry />
        </Metadata>
    )

    expect(metadata).toMatchSnapshot()
})
