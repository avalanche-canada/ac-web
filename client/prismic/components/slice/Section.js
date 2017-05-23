import React from 'react'
import { mapProps } from 'recompose'
import { Section } from '~/components/page'
import { StructuredText } from '~/prismic/components/base'
import { parseGroup } from '~/prismic/parsers'

export default mapProps(props => {
    const [{ content, ...group }] = parseGroup(props)

    return {
        ...group,
        children: <StructuredText value={content} />,
    }
})(Section)
