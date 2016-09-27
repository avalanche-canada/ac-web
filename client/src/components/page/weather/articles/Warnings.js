import React from 'react'
import {Article} from 'components/page'
import {Image} from 'components/weather'
import {Launch} from 'components/icons'
import {url} from 'assets'

export default function Warnings() {
    return (
        <Article title='Warnings'>
            <h3>
                <a href='http://weather.gc.ca/warnings/index_e.html?prov=bc' target='_blank'>
                    Warnings on weather.gc.ca <Launch height={14} width={14} />
                </a>
            </h3>
            <Image src={url('images/weather/warnings.png')} />
        </Article>
    )
}
