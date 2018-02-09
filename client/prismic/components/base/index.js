import { createElement } from 'react'
import WebLink from './WebLink'
import DocumentLink from './DocumentLink'
import ImageLink from './ImageLink'
import FileLink from './FileLink'

export Image, { OpenInNewTab as OpenImageInNewTab } from './Image'
export SliceZone from './SliceZone'
export StructuredText from './StructuredText'
export WebLink from './WebLink'
export DocumentLink from './DocumentLink'
export ImageLink from './ImageLink'

const LinkComponents = new Map([
    ['Link.web', WebLink],
    ['Link.document', DocumentLink],
    ['Link.image', ImageLink],
    ['Link.file', FileLink],
])

export function Link({ type, children, value }) {
    return createElement(LinkComponents.get(type), { value }, children)
}
