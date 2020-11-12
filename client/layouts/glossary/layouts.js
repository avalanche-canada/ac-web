import React, { Fragment, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Router, Link } from '@reach/router'
import debounce from 'lodash/debounce'
import escapeRegExp from 'lodash/escapeRegExp'
import * as Sidebar from 'components/sidebar'
import { Main, Content, Aside, Headline, Heading } from 'components/page'
import { Loading } from 'components/text'
import { TagSet, Tag } from 'components/tag'
import { Muted } from 'components/text'
import { Search } from 'components/form'
import { glossary } from 'prismic/params'
import { useDocument, useDefinitions } from 'prismic/hooks'
import { StructuredText, SliceZone } from 'prismic/components/base'
import SliceComponents from 'prismic/components/slice/rework'
import styles from './Glossary.css'
import { FormattedMessage, useIntl } from 'react-intl'

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
                <GlossarySidebar />
            </Aside>
        </Content>
    )
}

function GlossarySidebar() {
    return (
        <Sidebar.default>
            <Sidebar.Header>
                <FormattedMessage
                    description="Layout glossary/layouts"
                    defaultMessage="Related links"
                />
            </Sidebar.Header>
            <Sidebar.Item>
                <a
                    href="https://www.alpine-rescue.org/xCMS5/WebObjects/nexus5.woa/wa/icar?menuid=1088"
                    target="ICAR">
                    <FormattedMessage
                        description="Layout glossary/layouts"
                        defaultMessage="ICAR Glossary"
                    />
                </a>
            </Sidebar.Item>
            <Sidebar.Item>
                <a
                    href="https://avalanche.ca/fxresources/AvalancheLexiqueLexicon.pdf"
                    target="LexiqueLexicon">
                    <FormattedMessage
                        description="Layout glossary/layouts"
                        defaultMessage="Lexique Avalanche—Avalanche Lexicon"
                    />
                </a>
            </Sidebar.Item>
        </Sidebar.default>
    )
}

export function Glossary({ location, navigate, uid }) {
    const params = new URLSearchParams(location.search)
    const [term, setTerm] = useState(params.has('q') ? params.get('q') : '')
    const [document, pending] = useDocument(glossary.glossary(uid))
    const intl = useIntl()

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
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Search for a definition',
                        description: 'Layout glossary/layouts',
                    })}
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
        <Fragment>
            <Heading hash={linkToExternal ? null : uid}>{title}</Heading>
            {tags.length > 0 && (
                <TagSet>
                    {tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </TagSet>
            )}
            <article className={styles.Definition}>
                <SliceZone
                    components={SliceComponents}
                    value={data.content.filter(isMedia)}
                    fullscreen
                />
                <SliceZone
                    components={SliceComponents}
                    value={data.content.filter(isNotMedia)}
                />
                <Related linkToExternal={linkToExternal} items={data.related} />
            </article>
        </Fragment>
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
            <Muted>
                <FormattedMessage
                    description="Layout glossary/layouts"
                    defaultMessage="See also: "
                />
            </Muted>
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
        return (
            <Loading>
                <FormattedMessage
                    description="Layout glossary/layouts"
                    defaultMessage="Loading definitions..."
                />
            </Loading>
        )
    }

    if (sectionsToRender.size === 0) {
        return (
            <Muted>
                <FormattedMessage
                    description="Layout glossary/layouts"
                    defaultMessage="No definition matches your criteria."
                />
            </Muted>
        )
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
        <Fragment>
            <Heading as="h1" hash={letter}>
                {letter.toUpperCase()}
            </Heading>
            <section className={styles.Section}>
                {definitions.map(definition => (
                    <DefinitionLayout key={definition.uid} {...definition} />
                ))}
            </section>
        </Fragment>
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
function isMedia({ slice_type }) {
    return slice_type === 'image' || slice_type === 'video'
}
function isNotMedia(props) {
    return !isMedia(props)
}
function createDefinition(definition) {
    const { data, tags } = definition

    const images = data.content.filter(isMedia)
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
