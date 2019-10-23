import React, { Fragment, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Router, Link } from '@reach/router'
import debounce from 'lodash/debounce'
import escapeRegExp from 'lodash/escapeRegExp'
import { memo } from 'utils/react'
import { FragmentIdentifier } from 'router'
import Sidebar, {
    Item as SidebarItem,
    Header as SidebarHeader,
} from 'components/sidebar'
import { Main, Content, Aside, Headline } from 'components/page'
import { Loading } from 'components/text'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Search } from 'components/form'
import { glossary } from 'prismic/params'
import { useDocument, useDefinitions } from 'prismic/hooks'
import { StructuredText, SliceZone } from 'prismic/components/base'
import SliceComponents from 'prismic/components/slice/rework'
import styles from './Glossary.css'

export default function Layout() {
    return (
        <Content>
            <Main>
                <Router>
                    <Definition path="terms/:uid" />
                    <Glossary default />
                </Router>
            </Main>
            <Aside>
                <Router primary={false}>
                    <GlossarySidebar path="/" />
                </Router>
            </Aside>
        </Content>
    )
}

const GlossarySidebar = memo.static(function GlossarySidebar() {
    return (
        <Sidebar>
            <SidebarHeader>Related links</SidebarHeader>
            <SidebarItem>
                <a
                    href="http://www.alpine-rescue.org/xCMS5/WebObjects/nexus5.woa/wa/icar?menuid=1088"
                    target="ICAR">
                    ICAR Glossary
                </a>
            </SidebarItem>
            <SidebarItem>
                <a
                    href="//avalanche.ca/fxresources/AvalancheLexiqueLexicon.pdf"
                    target="LexiqueLexicon">
                    Lexique Avalanche - Avalanche Lexicon
                </a>
            </SidebarItem>
        </Sidebar>
    )
})

function Glossary({ location, navigate }) {
    // TODO Use "hooks/params"
    const params = new URLSearchParams(location.search)
    const [term, setTerm] = useState(params.has('q') ? params.get('q') : '')
    const [document, pending] = useDocument(glossary.glossary())

    useEffect(() => {
        const { hash } = location

        if (term) {
            params.set('q', term)

            navigate('?' + params.toString() + hash)
        } else {
            navigate(hash)
        }
    }, [term])

    if (pending) {
        return <Loading />
    }

    if (document) {
        return (
            <Fragment>
                <Headline>
                    <StructuredText value={document.data.headline} />
                </Headline>
                <Search
                    onChange={debounce(setTerm, 500)}
                    value={term}
                    placeholder="Search for a definition"
                />
                <GlossaryContent layout={document.data} term={term} />
            </Fragment>
        )
    }

    return null
}

Definition.propTypes = {
    uid: PropTypes.string.isRequired,
}
function Definition({ uid }) {
    const [document, pending] = useDocument(glossary.definition(uid))

    if (pending) {
        return <Loading />
    }

    if (document) {
        return <DefinitionLayout linkToExternal {...document} />
    }

    return null
}

// Util layouts
DefinitionLayout.propTypes = {
    linkToExternal: PropTypes.bool,
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
}

function DefinitionLayout({ uid, tags, data, linkToExternal }) {
    const { title } = data

    return (
        <article className={styles.Definition}>
            <h2>
                {linkToExternal ? (
                    title
                ) : (
                    <FragmentIdentifier hash={uid} title={title}>
                        {title}
                    </FragmentIdentifier>
                )}
            </h2>
            {tags.length > 0 && (
                <TagSet>
                    {tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </TagSet>
            )}
            <SliceZone
                components={SliceComponents}
                value={data.content.filter(isImage)}
                fullscreen
            />
            <SliceZone
                components={SliceComponents}
                value={data.content.filter(isNotImage)}
            />
            <Related linkToExternal={linkToExternal} items={data.related} />
        </article>
    )
}

Related.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    linkToExternal: PropTypes.bool,
}

function Related({ items, linkToExternal }) {
    items = items.filter(isDefinition)
    return items.length === 0 ? null : (
        <div>
            <Muted>See also: </Muted>
            <ul>
                {items.filter(isNotBroken).map(({ definition }) => {
                    const { uid } = definition
                    const { title } = definition.data

                    return (
                        <li key={uid}>
                            {linkToExternal ? (
                                <Link to={`../${uid}`} title={title}>
                                    {title}
                                </Link>
                            ) : (
                                <a href={`#${uid}`} title={title}>
                                    {title}
                                </a>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

LetterTag.propTypes = {
    letter: PropTypes.string.isRequired,
}

function LetterTag({ letter }) {
    return (
        <Tag key={letter}>
            <a href={'#' + letter}>
                <b>{letter.toUpperCase()}</b>
            </a>
        </Tag>
    )
}

function useDefaultSections(layout = {}) {
    const [definitions = [], pending] = useDefinitions()
    const definitionsByUID = useMemo(() => {
        return Array.isArray(definitions)
            ? definitions.reduce(
                  (all, definition) =>
                      all.set(definition.uid, createDefinition(definition)),
                  new Map()
              )
            : new Map()
    }, [definitions])
    const sections = useMemo(() => {
        return Object.entries(layout).reduce(
            (layout, [letter, definitions]) => {
                if (
                    !LETTERS.has(letter) ||
                    definitions.filter(isDefinition).length === 0
                ) {
                    return layout
                }

                return layout.set(
                    letter,
                    definitions
                        .filter(isDefinition)
                        .map(({ definition }) =>
                            definitionsByUID.get(definition.uid)
                        )
                        .filter(Boolean)
                )
            },
            new Map()
        )
    }, [layout, definitionsByUID])

    return [sections, pending]
}

function GlossaryContent({ layout, term }) {
    const [sections, loading] = useDefaultSections(layout)
    const sectionsToRender = useMemo(() => {
        if (!term) {
            return sections
        }

        const regexp = new RegExp(escapeRegExp(term), 'gi')
        function predicate(definition) {
            return regexp.test(definition.searchable)
        }

        return Array.from(sections.entries()).reduce(
            (filteredSections, [letter, definitions]) => {
                const filteredDefinitions = definitions.filter(predicate)

                if (filteredDefinitions.length > 0) {
                    filteredSections.set(letter, filteredDefinitions)
                }

                return filteredSections
            },
            new Map()
        )
    }, [sections, term])

    if (loading) {
        return <Loading>Loading definitions...</Loading>
    }

    if (sectionsToRender.size === 0) {
        return <Muted>No definition matches your criteria.</Muted>
    }

    return (
        <Fragment>
            <TagSet>
                {Array.from(sectionsToRender.keys()).map(letter => (
                    <LetterTag key={letter} letter={letter} />
                ))}
            </TagSet>
            {Array.from(sectionsToRender.entries()).map(
                ([letter, definitions]) => (
                    <Section
                        key={letter}
                        letter={letter}
                        definitions={definitions}
                    />
                )
            )}
        </Fragment>
    )
}

Section.propTypes = {
    letter: PropTypes.string.isRequired,
    definitions: PropTypes.array.isRequired,
}

function Section({ letter, definitions }) {
    return (
        <section className={styles.Section}>
            <h1>
                <FragmentIdentifier hash={letter}>
                    {letter.toUpperCase()}
                </FragmentIdentifier>
            </h1>
            {definitions.map(definition => (
                <DefinitionLayout key={definition.uid} {...definition} />
            ))}
        </section>
    )
}

// Constants
const LETTERS = new Set('abcdefghijklmnopqrstuvwxyz')

// Utils
function isDefinition({ definition }) {
    return (
        Boolean(definition) &&
        definition.type === 'definition' &&
        Boolean(definition.id)
    )
}
function isNotBroken({ definition }) {
    return definition.isBroken === false
}
function isText({ slice_type }) {
    return slice_type === 'text'
}
function isImage({ slice_type }) {
    return slice_type === 'image'
}
function isNotImage({ slice_type }) {
    return slice_type !== 'image'
}
function createDefinition(definition) {
    const { data, tags } = definition

    const images = data.content.filter(isImage)
    const related = data.related.filter(isNotBroken).filter(isDefinition)
    const texts = data.content.filter(isText)
    const searchables = [
        data.title,
        related.map(({ definition }) => definition.data.title),
        texts.map(({ primary }) => primary.content.map(({ text }) => text)),
        images.map(({ primary }) => [
            primary.credit,
            primary.caption.map(({ text }) => text),
        ]),
        tags,
    ].flat(2)

    return {
        ...definition,
        searchable: searchables.filter(Boolean).join(' '),
    }
}
