import React, {createElement} from 'react'
import {nest} from 'recompose'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import ColumnSet from './ColumnSet'
import Headline from './Headline'

const HeaderLink = nest(Header, Link)

function createLink({label, header, headline, ...rest}, index) {
    const hasHeader = header === true || typeof headline === 'string'
    const component = hasHeader ? typeof rest.to === 'string' ? HeaderLink : Header : Link
    const props = {
        ...rest,
        key: index
    }

    return createElement(component, props, label)
}

function createSection({label, headline, children = [], ...props}, index) {
    const column = Math.floor(children.length / 7)

    return (
        <Section key={index}>
            {label && createLink({headline, label, ...props})}
            {headline && <Headline>{headline}</Headline>}
            <ColumnSet count={column}>
                {children.map(createLink)}
            </ColumnSet>
        </Section>
    )
}

function isBreakpoint({headline, children}) {
    return headline !== undefined || children !== undefined
}

function sectionsReducer(children) {
    return children.reduce((sections, child, index, children) => {
        if (isBreakpoint(child)) {
            sections.push(child)
        } else if (sections.length === 0) {
            sections.push({
                children: [child]
            })
        } else {
            const last = sections[sections.length - 1]

            if (isBreakpoint(children[index - 1])) {
                sections.push({
                    children: [child]
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

export function createItem({id, label, noWrap, children}, index) {
    const key = `${id}-${index}`

    return (
        <Item key={key} title={label} noWrap={noWrap}>
            {children &&
                <Menu>
                    {sectionsReducer(children).map(createSection)}
                </Menu>
            }
        </Item>
    )
}
