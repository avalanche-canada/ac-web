import React from 'react'
import { mapProps } from 'recompose'
import { Section } from '~/components/page'
import { StructuredText } from '~/prismic/components/base'

export default mapProps(({ value }) => {
    const [{ content, ...group }] = value

    return {
        ...group,
        children: <StructuredText value={content} />,
    }
})(Section)
