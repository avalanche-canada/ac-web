import React, { createElement, cloneElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import Embed from './Embed'
import WebLink from './WebLink'
import ImageLink from './ImageLink'
import FileLink from './FileLink'
import DocumentLink from './DocumentLink'
import { replaceLineFeed, swap } from 'utils/react'

const LABEL = 'label'
const HEADING1 = 'heading1'
const HEADING2 = 'heading2'
const HEADING3 = 'heading3'
const HEADING4 = 'heading4'
const HEADING5 = 'heading5'
const HEADING6 = 'heading6'
const PARAGRAPH = 'paragraph'
const PREFORMATTED = 'pre'
const STRONG = 'strong'
const EM = 'em'
const LIST_ITEM = 'list-item'
const ORDERED_LIST_ITEM = 'o-list-item'
const IMAGE = 'image'
const HYPERLINK = 'hyperlink'
const EMBED = 'embed'

const SpanComponents = new Map([
    [
        HYPERLINK,
        new Map([
            ['Link.web', WebLink],
            ['Link.document', DocumentLink],
            ['Link.image', ImageLink],
            ['Link.file', FileLink],
        ]),
    ],
    [EM, new Map([[undefined, 'em']])],
    [STRONG, new Map([[undefined, 'strong']])],
    [LABEL, new Map([[undefined, Label]])],
])

function addSpanSet(component) {
    return function SpanSet({ text, label, spans }) {
        let children = text

        if (spans.length > 0) {
            children = spans.reduce((children, span, index) => {
                const { type, start, end, data = {} } = span
                const element = createElement(
                    SpanComponents.get(type).get(data.type),
                    { ...data, key: index },
                    text.substring(start, end)
                )

                return swap(children, start, end, element)
            }, text)
        }

        return createElement(
            component,
            { className: label },
            <Fragment>{replaceLineFeed(children)}</Fragment>
        )
    }
}

const Components = new Map([
    [HEADING1, addSpanSet('h1')],
    [HEADING2, addSpanSet('h2')],
    [HEADING3, addSpanSet('h3')],
    [HEADING4, addSpanSet('h4')],
    [HEADING5, addSpanSet('h5')],
    [HEADING6, addSpanSet('h6')],
    [PARAGRAPH, addSpanSet('p')],
    [LIST_ITEM, addSpanSet('li')],
    [ORDERED_LIST_ITEM, addSpanSet('li')],
    [PREFORMATTED, addSpanSet('pre')],
    [STRONG, addSpanSet('strong')],
    [EM, addSpanSet('em')],
    [IMAGE, Image],
    [EMBED, Embed],
    [HYPERLINK, 'a'],
])

const GroupTypes = new Set([LIST_ITEM, ORDERED_LIST_ITEM])
const GroupComponents = new Map([[LIST_ITEM, 'ul'], [ORDERED_LIST_ITEM, 'ol']])

function childrenElementReducer(children, { type, ...props }, index, value) {
    props.key = index

    const element = createElement(Components.get(type), props)

    if (GroupTypes.has(type)) {
        const previous = value[index - 1]

        if (previous && GroupTypes.has(previous.type)) {
            const previousIndex = children.length - 1
            const group = children[previousIndex]

            group.props.children.push(element)

            children[previousIndex] = cloneElement(group, group.props)
        } else {
            const group = createElement(
                GroupComponents.get(type),
                { key: index },
                [element]
            )

            children.push(group)
        }
    } else {
        children.push(element)
    }

    return children
}

function Label({ label, children }) {
    return <span className={label}>{children}</span>
}

StructuredText.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(Array.from(Components.keys())).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
}

export default function StructuredText({ value = [] }) {
    return value.reduce(childrenElementReducer, [])
}
