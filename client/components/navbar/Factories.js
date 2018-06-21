import React, { createElement } from 'react'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import ColumnSet from './ColumnSet'
import Headline from './Headline'

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
        ? typeof rest.to === 'string' ? HeaderLink : Header
        : Link
    const props = {
        ...rest,
        key: index,
    }

    return createElement(Component, props, label)
}

const MAX_NUMBER_OF_LINKS_PER_COLUMN = 7

function createSection({ label, headline, children = [], ...props }, index) {
    const column = Math.floor(children.length / MAX_NUMBER_OF_LINKS_PER_COLUMN)

    return (
        <Section key={index}>
            {label && createLink({ headline, label, ...props })}
            {headline && <Headline>{headline}</Headline>}
            {Array.isArray(children) ? (
                <ColumnSet count={column}>{children.map(createLink)}</ColumnSet>
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

export function createItem({ id, label, noWrap, children, to }, index) {
    const key = `${id}-${index}`

    return (
        <Item key={key} title={label} noWrap={noWrap} to={to}>
            {children && (
                <Menu>{sectionsReducer(children).map(createSection)}</Menu>
            )}
        </Item>
    )
}
