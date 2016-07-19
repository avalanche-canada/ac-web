import {history} from 'router'
import Url from 'url'

function isLeftClickEvent(event) {
    return event.button === 0
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

window.onPrismicHyperlinkClick = function onPrismicHyperlinkClick(element) {
    const {event} = window

    if (event.target === element) {
        if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return
        }

        event.preventDefault()
    }

    history.push(element.getAttribute('data-path'))
}

function appAnchor({href, title = content, content}) {
    return `<a href="${href}" data-path="${href}" title="${title}" onclick="onPrismicHyperlinkClick(this);">${content}</a>`
}

export default function htmlSerializer({type, ...props}, content) {
    switch (type) {
        case 'hyperlink': {
            const {url: href, data: {type: linkType}} = props

            if (linkType === 'Link.document') {
                return appAnchor({
                    href,
                    content,
                })
            }

            if (linkType === 'Link.web') {
                const {host, path} = Url.parse(href)

                if (host.includes('avalanche.ca')) {
                    return appAnchor({
                        href: path,
                        content,
                    })
                } else {
                    return null
                }
            }
        }
        default:
            return null
    }
}
