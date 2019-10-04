import { createElement } from 'react'
import WebLink from './WebLink'
import DocumentLink from './DocumentLink'
import ImageLink from './ImageLink'
import FileLink from './FileLink'

export default function Hyperlink({ link_type, children, ...props }) {
    return HyperlinkComponents.has(link_type)
        ? createElement(HyperlinkComponents.get(link_type), props, children)
        : null
}

const HyperlinkComponents = new Map([
    ['Web', WebLink],
    ['Document', DocumentLink],
    ['Image', ImageLink],
    ['File', FileLink],
    ['Media', FileLink],
    ['Any', ({ children }) => children],
])
