import {history} from 'router'
import Url from 'url'

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

function appAnchor({href, content, title = content}) {
    return `<a href="${href}" data-path="${href}" title="${title}" onclick="onPrismicHyperlinkClick(this);">${content}</a>`
}

export default function htmlSerializer({type, ...props}, content) {
    switch (type) {
        case 'hyperlink': {
            const {url: href, data: {value, type: linkType}} = props

            switch (linkType) {
                case 'Link.document':
                    return appAnchor({
                        href: href || `/pages/${value.document.uid}`,
                        content,
                    })
                case 'Link.web':
                    const {host, path, protocol} = Url.parse(href)

                    if ((protocol === 'http:' || protocol === 'https:') && host.includes('avalanche.ca')) {
                        return appAnchor({
                            href: path,
                            content,
                        })
                    }
            }
        }
    }

    return null
}
