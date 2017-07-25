import React from 'react'
import PropTypes from 'prop-types'
import { Sponsor as Base } from '~/components/misc'
import { sponsor } from '~/containers/connectors'
import { parse } from '~/prismic'

Sponsor.propTypes = {
    value: PropTypes.object,
    label: PropTypes.string,
}

function Sponsor({ value, label }) {
    if (!value) {
        return null
    }

    const { data } = parse(value)

    return <Base label={label} {...data} />
}

export default sponsor(Sponsor)
