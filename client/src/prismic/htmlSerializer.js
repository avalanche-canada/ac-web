import {history} from 'router'
import Url from 'url'
import {avalancheCanadaPathRegex, href} from 'utils/url'

function isLeftClickEvent(event) {
    return event.button === 0
}

function isModifiedEvent(event) {
    return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

// Polyfill for Element.matches()
// https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(selector) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(selector)
            let i = matches.length
            while (--i >= 0 && matches.item(i) !== this) {

            }
            return i > -1
        };
}

function handleBodyClick(event) {
    if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return
    }

    if (!event.target.matches('a[data-path]')) {
        return
    }

    event.preventDefault()

    history.push(event.target.getAttribute('data-path'))
}

document.querySelector('body').addEventListener('click', handleBodyClick)

function createApplicationAnchor({href, content, title = content}) {
    return `<a href="${href}" data-path="${href}" title="${title}">${content}</a>`
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
