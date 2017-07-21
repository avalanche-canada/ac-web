import React from 'react'
import { Sponsor as Base } from '~/components/misc'
import { sponsor } from '~/containers/connectors'
import { parse } from '~/prismic'

function Sponsor({ value }) {
    if (!value) {
        return null
    }

    const { data } = parse(value)

    return <Base {...data} />
}

export default sponsor(Sponsor)
