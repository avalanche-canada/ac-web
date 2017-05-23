import React from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from '~/components/misc'

Embed.propTypes = {
    label: PropTypes.string,
    oembed: PropTypes.shape({
        embed_url: PropTypes.string.isRequired,
        provider_name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
    }).isRequired,
}

export default function Embed({
    label,
    oembed: { type, provider_name, embed_url, html },
}) {
    return (
        <div
            className={label}
            data-oembed={embed_url}
            data-oembed-provider={provider_name}
            data-oembed-type={type}>
            <InnerHTML>
                {html}
            </InnerHTML>
        </div>
    )
}
