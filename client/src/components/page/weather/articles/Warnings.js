import React from 'react'
import {Article} from 'components/page'
import {Launch} from 'components/icons'

export default function Warnings() {
    return (
        <Article title='Warnings'>
            <h3>
                <a href='http://weather.gc.ca/warnings/index_e.html?prov=bc' target='_blank'>
                    Warnings on weather.gc.ca <Launch height={14} width={14} />
                </a>
            </h3>
        </Article>
    )
}
