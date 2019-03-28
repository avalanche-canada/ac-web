import React, { cloneElement, isValidElement } from 'react'
import flatten from 'lodash/flatten'

const LINE_FEED_REGEX = /(\n)/
function br(string, index) {
    return <br key={index} />
}

// Copied and modified from https://github.com/iansinnott/react-string-replace

function replaceString(string, match, fn) {
    if (string === '') {
        return string
    }

    const result = string.split(match)
    let curCharStart = 0
    let curCharLen = 0

    // Apply fn to all odd elements
    for (let i = 1, length = result.length; i < length; i += 2) {
        curCharLen = result[i].length
        curCharStart += result[i - 1].length
        result[i] = fn(result[i], i, curCharStart)
        curCharStart += curCharLen
    }

    return result
}

function replace(source, match, fn) {
    if (!Array.isArray(source)) {
        source = [source]
    }

    return flatten(
        source.map(source => {
            if (typeof source === 'string') {
                return replaceString(source, match, fn)
            }

            if (isValidElement(source)) {
                return cloneElement(
                    source,
                    null,
                    replace(source.props.children, match, fn)
                )
            }

            return source
        })
    )
        .filter(Boolean)
        .map(addKey)
}

export function replaceLineFeed(source) {
    return replace(source, LINE_FEED_REGEX, br)
}

function swapString(source, start, end, element) {
    const { length } = source

    if (start >= 0 && end <= length) {
        const before = source.slice(0, start)
        const after = source.slice(end)

        return [before, element, after].filter(Boolean)
    }

    return source
}

export function swap(source, start, end, element) {
    if (!Array.isArray(source)) {
        source = [source]
    }

    return flatten(
        source.map(source => {
            if (typeof source === 'string') {
                source = swapString(source, start, end, element)
                start = start - source.length
                end = end - source.length
            } else if (isValidElement(source)) {
                const { children } = source.props

                if (typeof children === 'string') {
                    source = cloneElement(
                        source,
                        null,
                        swapString(children, start, end, element)
                    )
                    start = start - children.length
                    end = end - children.length
                }
            }

            return source
        })
    )
}

export const memo = {
    static(component) {
        return React.memo(component, t)
    },
    // props(component) {
    //     return React.memo(component, arePropsEqual)
    // },
}

// Utils
function addKey(child, index) {
    return isValidElement(child) ? cloneElement(child, { key: index }) : child
}
function t() {
    return true
}
