import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Ambassador from 'components/ambassador'
import { StructuredText } from 'prismic/components/base'
import { Br } from 'components/markup'

AmbassadorSet.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function AmbassadorSet({ value = [] }) {
    return <Fragment>{value.map(createAmbassador)}</Fragment>
}

// Utils
function createAmbassador(ambassador, index, ambassadors) {
    const { biography, ...props } = transform(ambassador)

    return (
        <Fragment key={index}>
            <Ambassador {...props}>
                <StructuredText value={biography} />
            </Ambassador>
            {index + 1 < ambassadors.length && <Br />}
        </Fragment>
    )
}
function transform({ twitter, facebook, instagram, website, ...ambassador }) {
    return Object.assign(ambassador, {
        socials: [facebook, instagram, twitter, website]
            .filter(Boolean)
            .map(social => social.value.url),
    })
}
