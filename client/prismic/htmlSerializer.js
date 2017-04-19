import {history} from '~/router'
import {avalancheCanadaPathRegex, href} from '~/utils/url'
import '~/utils/polyfill'

function isLeftClickEvent(event) {
    return event.button === 0
}

function isModifiedEvent(event) {
    return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
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
    }}

    return null
}
