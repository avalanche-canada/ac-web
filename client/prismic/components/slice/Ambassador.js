import React from 'react'
import PropTypes from 'prop-types'
import Ambassador from '~/components/ambassador'
import { StructuredText } from '~/prismic/components/base'
import { Br } from '~/components/markup'

function transform({ twitter, facebook, instagram, website, ...ambassador }) {
    return Object.assign(ambassador, {
        socials: [twitter, facebook, instagram, website]
            .filter(Boolean)
            .map(social => social.value.url),
    })
}

function createAmbassador(ambassador, index, ambassadors) {
    const { biography, ...props } = transform(ambassador)

    return (
        <div key={index}>
            <Ambassador {...props}>
                <StructuredText value={biography} />
            </Ambassador>
            {index + 1 < ambassadors.length && <Br />}
        </div>
    )
}

AmbassadorSet.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function AmbassadorSet({ value = [] }) {
    return <div>{value.map(createAmbassador)}</div>
}
