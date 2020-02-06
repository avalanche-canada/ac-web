import React, { createElement } from 'react'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import Headline from './Headline'

export function createItem({ id, label, children, to }) {
    return (
        <Item key={id} id={id} title={label} to={to}>
            {children && (
                <Menu>{sectionsReducer(children).map(createSection)}</Menu>
            )}
        </Item>
    )
}

// Utils
function HeaderLink(props) {
    return (
        <Header {...props}>
            <Link {...props} />
        </Header>
    )
}

function createLink({ label, header, headline, ...rest }, index) {
    const hasHeader = header === true || typeof headline === 'string'
    const Component = hasHeader
        ? typeof rest.to === 'string'
            ? HeaderLink
            : Header
        : Link
    const props = {
        ...rest,
        key: index,
    }

    return createElement(Component, props, label)
}

function createSection({ label, headline, children = [], ...props }, index) {
    return (
        <Section key={index}>
            {label && createLink({ headline, label, ...props })}
            {headline && <Headline>{headline}</Headline>}
            {Array.isArray(children) ? (
                <div>{children.map(createLink)}</div>
            ) : (
                createElement(children, props)
            )}
        </Section>
    )
}

function isBreakpoint({ headline, children }) {
    return headline !== undefined || children !== undefined
}

function sectionsReducer(children) {
    return children.reduce((sections, child, index, children) => {
        if (isBreakpoint(child)) {
            sections.push(child)
        } else if (sections.length === 0) {
            sections.push({
                children: [child],
            })
        } else {
            const last = sections[sections.length - 1]

            if (isBreakpoint(children[index - 1])) {
                sections.push({
                    children: [child],
                })
            } else {
                if (Array.isArray(last.children)) {
                    last.children.push(child)
                } else {
                    last.children = [child]
                }
            }
        }

        return sections
    }, [])
}
