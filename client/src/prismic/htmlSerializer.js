import {history} from 'router'
import Url from 'url'
import {avalancheCanadaPathRegex, href} from 'utils/url'

function isLeftClickEvent(event) {
    return event.button === 0
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

// SHAME: Well, adding something to global is bad. It is working for now.
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

function createApplicationAnchor({href, content, title = content}) {
    return `<a href="${href}" data-path="${href}" title="${title}" onclick="onPrismicHyperlinkClick(this);">${content}</a>`
}

export default function htmlSerializer({type, ...props}, content) {
    switch (type) {
        case 'hyperlink': {
            const {url, data: {value, type: linkType}} = props

            switch (linkType) {
                case 'Link.document': {
                    const {type, uid} = value.document

                    return createApplicationAnchor({
                        href: url || `/pages/${type}/${uid}`,
                        content,
                    })
                }
                case 'Link.web':
                    if (avalancheCanadaPathRegex.test(url)) {
                        return createApplicationAnchor({
                            href: href(url),
                            content,
                        })
                    }
            }
        }
    }

    return null
}
