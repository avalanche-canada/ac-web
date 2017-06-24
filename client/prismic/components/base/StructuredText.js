import React, { createElement, cloneElement, DOM } from 'react'
import { compose, setPropTypes, mapProps } from 'recompose'
import PropTypes from 'prop-types'
import Image from './Image'
import Embed from './Embed'
import WebLink from './WebLink'
import ImageLink from './ImageLink'
import DocumentLink from './DocumentLink'
import { replaceLineFeed, swap } from '~/utils/react'

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
        ]),
    ],
    [EM, new Map([[undefined, 'em']])],
    [STRONG, new Map([[undefined, 'strong']])],
])

const addSpans = compose(
    setPropTypes({
        text: PropTypes.string.isRequired,
        label: PropTypes.string,
        spans: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.oneOf([HYPERLINK, STRONG, EM]).isRequired,
                start: PropTypes.number.isRequired,
                end: PropTypes.number.isRequired,
                data: PropTypes.object,
            })
        ),
    }),
    mapProps(({ text, label, spans }) => {
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

        return {
            children: replaceLineFeed(children),
            className: label,
        }
    })
)

const Components = new Map([
    [HEADING1, addSpans(DOM.h1)],
    [HEADING2, addSpans(DOM.h2)],
    [HEADING3, addSpans(DOM.h3)],
    [HEADING4, addSpans(DOM.h4)],
    [HEADING5, addSpans(DOM.h5)],
    [HEADING6, addSpans(DOM.h6)],
    [PARAGRAPH, addSpans(DOM.p)],
    [LIST_ITEM, addSpans(DOM.li)],
    [ORDERED_LIST_ITEM, addSpans(DOM.li)],
    [PREFORMATTED, addSpans(DOM.pre)],
    [STRONG, addSpans(DOM.strong)],
    [EM, addSpans(DOM.em)],
    [IMAGE, Image],
    [EMBED, Embed],
    [HYPERLINK, DOM.a],
])

const GroupTypes = new Set([LIST_ITEM, ORDERED_LIST_ITEM])
// FIXME: Tried to use DOM.ul & DOM.ol instead of string and it does not work?!?
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

StructuredText.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(Array.from(Components.keys())).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
}

export default function StructuredText({ value = [], className }) {
    return (
        <div className={className}>
            {value.reduce(childrenElementReducer, [])}
        </div>
    )
}
