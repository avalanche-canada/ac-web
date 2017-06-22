import { createElement } from 'react'
import WebLink from './WebLink'
import DocumentLink from './DocumentLink'

export Image, { OpenInNewTab as OpenImageInNewTab } from './Image'
export Slice from './Slice'
export SliceZone from './SliceZone'
export StructuredText from './StructuredText'
export WebLink from './WebLink'
export DocumentLink from './DocumentLink'

const LinkComponents = new Map([
    ['Link.web', WebLink],
    ['Link.document', DocumentLink],
])

export function Link({ type, value, children }) {
    return createElement(LinkComponents.get(type), { value }, children)
}
